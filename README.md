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
<td>/user/login</td>
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
<td>/admin/login</td>
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
<td>/admin/create</td>
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
<td>/user/update</td>
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
<td>/admin/update</td>
<td>Allows an admin to edit their name</td>
<td>Admin</td>
<td>same as above</td>
<td>same as above</td>
</tr>
</table>

- #### The admin name will be automaticallly set to the name associated to the email if not explicitly provided
- #### An admin can be created on the server side using the npm add-admin script

## More Endpoints
