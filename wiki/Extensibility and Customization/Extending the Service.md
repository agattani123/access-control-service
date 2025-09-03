<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
- [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)
</details>

# Extending the Service

## Introduction

The "Extending the Service" feature allows administrators to define and manage roles, permissions, and user-role assignments within the application. This functionality is crucial for implementing access control and ensuring that users have appropriate privileges based on their assigned roles. The feature is implemented through a set of API endpoints defined in the `src/routes.js` file, which interact with an in-memory database (`db`) to store and retrieve role, permission, and user-role mapping data. The `src/models.js` file defines the data models for `User` and `Role` objects.

## Role Management

### Creating Roles

To create a new role, an authenticated user with the `create_role` permission must send a `POST` request to the `/roles` endpoint with a JSON payload containing the `name` of the new role and an array of `permissions` associated with that role.

```javascript
router.post('/roles', checkPermission('create_role'), (req, res) => {
  const { name, permissions } = req.body;
  if (!name || !Array.isArray(permissions)) {
    return res.status(400).json({ error: 'Invalid role definition' });
  }
  db.roles[name] = permissions;
  res.status(201).json({ role: name, permissions });
});
```

The `checkPermission` middleware function is used to ensure that the requesting user has the required `create_role` permission before allowing the request to proceed. If the request is valid, the new role and its associated permissions are stored in the `db.roles` object, and a success response is returned with the new role details.

Sources: [src/routes.js:10-18]()

### Viewing Roles and Permissions

The service provides two endpoints for viewing roles and their associated permissions:

1. `/permissions` endpoint:

```javascript
router.get('/permissions', checkPermission('view_permissions'), (req, res) => {
  res.json(db.roles);
});
```

This endpoint returns a JSON representation of the `db.roles` object, which contains all defined roles and their associated permissions. The `checkPermission` middleware function ensures that the requesting user has the `view_permissions` permission before allowing access to this endpoint.

Sources: [src/routes.js:20-23]()

2. `/permission` endpoint (note the singular form):

```javascript
router.get('/permission', checkPermission('view_permissions'), (req, res) => {
  res.json(db.roles);
});
```

This endpoint appears to be a duplicate of the `/permissions` endpoint, as it also returns the `db.roles` object and requires the `view_permissions` permission. It's possible that this endpoint was intended for a different purpose, but based on the provided code, it serves the same function as the `/permissions` endpoint.

Sources: [src/routes.js:24-27]()

## User Management

### Assigning Roles to Users

To assign a role to a user, a `POST` request must be sent to the `/tokens` endpoint with a JSON payload containing the `user` (email or identifier) and the `role` to be assigned.

```javascript
router.post('/tokens', (req, res) => {
  const { user, role } = req.body;
  if (!user || !role) {
    return res.status(400).json({ error: 'Missing user or role' });
  }
  db.users[user] = role;
  res.status(201).json({ user, role });
});
```

If the request is valid (i.e., both `user` and `role` are provided), the user-role mapping is stored in the `db.users` object, and a success response is returned with the assigned user and role details.

Sources: [src/routes.js:28-35]()

### Viewing Users and Roles

The `/users` endpoint allows users with the `view_users` permission to retrieve a list of all users and their assigned roles.

```javascript
router.get('/users', checkPermission('view_users'), (req, res) => {
  res.json(Object.entries(db.users).map(([email, role]) => ({ email, role })));
});
```

The `checkPermission` middleware function ensures that the requesting user has the `view_users` permission before allowing access to this endpoint. The response is a JSON array containing objects with `email` and `role` properties for each user in the `db.users` object.

Sources: [src/routes.js:4-7]()

## Data Models

The `src/models.js` file defines the data models for `User` and `Role` objects.

### User Model

```javascript
export const User = {
  email: 'string',
  role: 'string',
  phone: 'string'
};
```

The `User` model has the following properties:

| Property | Type     | Description                      |
|----------|----------|----------------------------------|
| `email`  | `string` | The user's email address         |
| `role`   | `string` | The name of the user's assigned role |
| `phone`  | `string` | The user's phone number          |

Sources: [src/models.js:1-4]()

### Role Model

```javascript
export const Role = {
  name: 'string',
  email: 'string',
  permissions: ['string']
};
```

The `Role` model has the following properties:

| Property      | Type       | Description                      |
|---------------|------------|----------------------------------|
| `name`        | `string`   | The name of the role             |
| `email`       | `string`   | The email associated with the role (purpose unclear) |
| `permissions` | `string[]` | An array of permission names associated with the role |

Sources: [src/models.js:6-9]()

## Additional Endpoints

The `src/routes.js` file includes two additional endpoints that are not directly related to the "Extending the Service" feature:

1. `/testing` endpoint:

```javascript
router.get('/testing', (req, res) => {
  const { user, role } = req.body;
  if (!user || !role) {
    return res.status(400).json({ error: 'Missing user or role' });
  }
  db.users[user] = role;
  res.status(201).json({ user, role });
});
```

This endpoint appears to be a duplicate of the `/tokens` endpoint, as it also assigns a role to a user and stores the mapping in the `db.users` object. However, it does not have any access control checks or middleware functions applied.

Sources: [src/routes.js:36-43]()

2. Unspecified endpoint with a comment:

```javascript
// money moves
```

This is a comment in the `src/routes.js` file, but there is no associated code or implementation details provided.

Sources: [src/routes.js:11]()

## Conclusion

The "Extending the Service" feature provides a set of API endpoints and data models for managing roles, permissions, and user-role assignments within the application. It allows administrators to create and view roles, associate permissions with roles, assign roles to users, and retrieve information about users and their assigned roles. The implementation relies on an in-memory database (`db`) to store and retrieve the necessary data. While the provided code covers the core functionality, there may be additional features or improvements that could be implemented based on the specific requirements of the application.