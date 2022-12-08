# Backend Documentation

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
<td>Allows a user to edit their name</td>
<td>User</td>
<td>

```js
{
  name: "some name";
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
<td>GET /:id</td>
<td>get all the details about a query including responses and media</td>
<td>User</td>
<td>NA</td>
<td>TODO</td>
</tr>
<tr>
<td>GET /:id/admin</td>
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
    "timestamp": 1670490498120,
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
<td>POST /admin/close/:id</td>
<td>An admin can close an open query</td>
<td>Admin</td>
<td>Nothing</td>
<td>ok:true</td>
</tr>
</table>
