# Backend Documentation

## Running It 🏃

1. Either install postgres or [setup the postgresql docker container](https://hevodata.com/learn/docker-postgresql/)(this is what I do)

1. Create a DB by accessing the `psql` shell. The default postgres user is `postgres`.

1. Replicate the `.env.example` file as `.env`. Edit `PG_USERNAME`, `PG_PASSWORD` and `DB_NAME` with what you created.

1. You can specify `MEDIA_DIR` (where the media will be stored)

1. Then the usual drill. `npm install` and then `npm run dev` to start a dev instance

## Profile Endpoints

<table>
<tr>
<th>Endpoint</th>
<th>Description</th>
<th>Auth</th>
<th>Body</th>
<th>Response</th>
</tr>
<tr>
<td>POST /user/login</td>
<td>Logins a user or creates user if not existing</td>
<td>No</td>
<td>

```js
{
  idToken: "googleauthidtoken";
}
```

</td>
<td>

```js
{
firstLogin: true,
jwt: "jwthere"
}

```

</td>
</tr>
<tr>
<td>POST /admin/login</td>
<td>Logins an existing admin</td>
<td>No</td>
<td>

```js
{
  idToken: "googleauthidtoken";
}
```

</td>
<td>

```js
{
  jwt: "jwthere";
}
```

</td>
</tr>
<tr>
<td>POST /admin/create</td>
<td>Allows an existing admin to add another admin</td>
<td>Admin</td>
<td>

```js
{
email: "somebody@gmail.com",
name: "optional name parameter"
}
```

</td>
<td>

```js
{
  ok: true;
}
```

</td>
</tr>

<tr>
<td>PUT /user/update</td>
<td>Allows a user to edit their details</td>
<td>User</td>
<td>

```js
{
  name: "some name",
  "age": 10,
  "gender": "male/female/other",
  "phoneNumber": "string",
  "location": "string",
}
all parameters are optional
```

</td>
<td>

```js
{
  ok: true;
}
```

</td>
</tr>
<tr>
<td>PUT /admin/update</td>
<td>Allows an admin to edit their name</td>
<td>Admin</td>
<td>same as above</td>
<td>same as above</td>
</tr>
</table>

- #### The admin name will be automaticallly set to the name associated to the email if not explicitly provided. The profile picture will be automatically taken from the google account profile pic.
- #### An admin can be created on the server side using the npm add-admin script

## Query Endpoint

<table>
<tr>
<th>Endpoint</th>
<th>Description</th>
<th>Auth</th>
<th>Body</th>
<th>Response</th>
</tr>
<tr>
<td>POST /create</td>
<td>user posts a query</td>
<td>User</td>
<td>

**NOTE**: The body here is `form/multipart`, not json

```js
{
  title: "string <= 50chars", //~10 words
  content: "string <= 1250 characters", //~ 250 words
  files: [all the files that need to be uploaded]
}
```

</td>
<td>ok:true</td>
</tr>
<tr>
<td>GET /query/:id</td>
<td>get all the details about a query including responses(sorted in order) and media</td>
<td>User</td>
<td>NA</td>
<td>

```json
{
  "id": 3,
  "title": "Bruhtacular the second",
  "content": "i like mayo",
  "closed": false,
  "timestamp": "2022-12-12T08:30:57.834Z",
  "user": {
    "name": "Doubtful Baby",
    "avatar": "https://lh3.googleusercontent.com/a/AEdFTp41ujok5WxbmKFWDZOWpmbb9xcXcL_4ixUD8pbfnQ=s96-c"
  },
  "media": [
    {
      "url": "/media/1670490412464.png"
    }
  ],
  "responses": [
    {
      "content": "have you tried turning it on and off?",
      "timestamp": "2022-12-12T08:30:57.834Z",
      "admin": {
        "name": "Cliford Joshy",
        "avatar": "https://lh3.googleusercontent.com/a/AEdFTp41ujok5WxbmKFWDZOWpmbb9xcXcL_4ixUD8pbfnQ=s96-c"
      }
    },
    {
      "content": "i did try that",
      "timestamp": "2022-12-12T08:30:57.834Z"
    }
  ]
}
```

**the admin responses will have the admin field**

</td>
</tr>
<tr>
<td>GET query/:id/admin</td>
<td>same as above but with admin auth</td>
<td>Admin</td>
<td>none</td>
<td>same as above</td>
</tr>
<tr>
<td>GET /admin/pending</td>
<td>get overview of all open queries sorted by most recent first</td>
<td>Admin</td>
<td>NA</td>
<td>

```json
[
  {
    "id": 5,
    "title": "Bruhtacular the second",
    "timestamp": "2022-12-12T08:30:57.834Z",
    "user": {
      "name": "Cliford Joshy",
      "avatar": "https://lh3.googleusercontent.com/a/AEdFTp41ujok5WxbmKFWDZOWpmbb9xcXcL_4ixUD8pbfnQ=s96-c"
    }
  }
]
```

</td>
</tr>
<tr>
<td>GET /user/me</td>
<td>get all the details about a user including queries</td>
<td>User</td>
<td>NA</td>
<td>

```json
{
  "id": "109761649576168914913",
  "name": "Cliford Joshy",
  "email": "clifordjo@gmail.com",
  "profilePicture": "https://lh3.googleusercontent.com/a/AEdFTp41ujok5WxbmKFWDZOWpmbb9xcXcL_4ixUD8pbfnQ=s96-c",
  "age": null,
  "gender": null,
  "phoneNumber": null,
  "location": null,
  "queries": [
    {
      "id": 1,
      "title": "Test Query",
      "content": "lorem ipsum dolor set amet",
      "closed": false,
      "timestamp": "2022-12-12T08:30:57.834Z",
      "responseCount": 0
    }
  ]
}
```

</td>
</tr>
<tr>
<td>POST query/admin/close/:id</td>
<td>An admin can close an open query</td>
<td>Admin</td>
<td>Nothing</td>
<td>ok:true</td>
</tr>

<tr>
<td>POST /respond/:queryId/admin</td>
<td>An admin can respond to an open query</td>
<td>Admin</td>
<td>

```json
{
  "content": "do you even?"
}
```

</td>
<td>ok:true</td>
</tr>

<tr>
<td>POST /respond/:queryId/user</td>
<td>A user can respond to an open query</td>
<td>User</td>
<td>same as above</td>
<td>

```js
{
  ok: false/true,
  warning: "warning message if ok is false (when notifying the user fails)"
}
```

</td>
</tr>
</table>

## Fetching Media

- /media/filename with userToken
- /media/filename/admin with adminToken

## Notification Endpoints

<table>
<tr>
<th>Endpoint</th>
<th>Description</th>
<th>Auth</th>
<th>Body</th>
<th>Response</th>
</tr>
<tr>
<td>POST /fcm-token/save/admin</td>
<td>Saves the fcm token for an admin</td>
<td>Admin</td>
<td>

```js
{
  fcmToken: "fcmTokenHere";
}
```

</td>
<td>ok: true</td>
</tr>
<tr>
<td>POST /fcm-token/save/user</td>
<td>Saves the fcm token for a user</td>
<td>User</td>
<td>

```js
{
  fcmToken: "fcmTokenHere";
}
```

</td>
<td>ok: true</td>
</tr>
