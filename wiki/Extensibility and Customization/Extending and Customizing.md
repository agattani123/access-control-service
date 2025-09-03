<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
- [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)
</details>

# Extending and Customizing

## Introduction

This wiki page covers the "Extending and Customizing" functionality within the access control service project. The project provides a set of routes and middleware for managing users, roles, and permissions. It allows administrators to create new roles with specific permissions, assign roles to users, and retrieve information about users, roles, and permissions.

The key components involved in extending and customizing the access control service are the `User`, `Role`, and `checkPermission` middleware. These components are defined in the `src/models.js` and `src/routes.js` files, respectively.

## Data Models

The project defines two data models: `User` and `Role`. These models are represented as objects with specific properties.

### User Model

The `User` model has the following properties:

```javascript
export const User = {
  email: 'string',
  role: 'string'
};
```

- `email`: A string representing the user's email address.
- `role`: A string representing the name of the role assigned to the user.

Sources: [src/models.js:1-4]()

### Role Model

The `Role` model has the following properties:

```javascript
export const Role = {
  name: 'string',
  permissions: ['string']
};
```

- `name`: A string representing the name of the role.
- `permissions`: An array of strings representing the permissions associated with the role.

Sources: [src/models.js:6-9]()

## API Routes

The project exposes several API routes for managing users, roles, and permissions. These routes are defined in the `src/routes.js` file.

### Get Users

```javascript
router.get('/users', checkPermission('view_users'), (req, res) => {
  res.json(Object.entries(db.users).map(([email, role]) => ({ email, role })));
});
```

This route retrieves a list of all users and their assigned roles. It requires the `view_users` permission to access.

Sources: [src/routes.js:7-10]()

### Create Role

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

This route allows creating a new role with a specified name and list of permissions. It requires the `create_role` permission to access. The request body should contain a `name` property (string) and a `permissions` property (array of strings).

Sources: [src/routes.js:12-19]()

### Get Permissions

```javascript
router.get('/permissions', checkPermission('view_permissions'), (req, res) => {
  res.json(db.roles);
});
```

This route retrieves a list of all roles and their associated permissions. It requires the `view_permissions` permission to access.

Sources: [src/routes.js:21-24]()

### Create Token

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

This route allows assigning a role to a user. The request body should contain a `user` property (string) and a `role` property (string). It does not require any specific permission to access.

Sources: [src/routes.js:26-33]()

## Authentication Middleware

The project includes an `authMiddleware.js` file (not provided in the source files) that likely contains the implementation of the `checkPermission` middleware function. This middleware is used to protect certain routes and ensure that only users with the required permissions can access them.

```javascript
import { checkPermission } from './authMiddleware.js';
```

The `checkPermission` middleware is used in the following routes:

- `GET /users`: Requires the `view_users` permission.
- `POST /roles`: Requires the `create_role` permission.
- `GET /permissions`: Requires the `view_permissions` permission.

Sources: [src/routes.js:3](), [src/routes.js:7](), [src/routes.js:12](), [src/routes.js:21]()

## Extending and Customizing

The access control service can be extended and customized in several ways:

1. **Adding New Permissions**: To add new permissions, you can modify the `Role` model in `src/models.js` to include additional permission strings in the `permissions` array.

2. **Creating New Roles**: To create new roles, you can use the `POST /roles` route and provide a unique `name` and a list of `permissions` for the new role.

3. **Assigning Roles to Users**: To assign roles to users, you can use the `POST /tokens` route and provide a `user` (email) and a `role` (name) in the request body.

4. **Implementing Custom Authentication and Authorization**: While the provided source files do not include the implementation of the `checkPermission` middleware, you can extend or replace it with your own custom authentication and authorization logic.

5. **Adding New Routes**: You can add new routes to the `src/routes.js` file and protect them with the `checkPermission` middleware or implement your own custom authorization logic.

6. **Integrating with a Database**: The provided source files use an in-memory data store (`db.js`). To integrate with a database, you would need to modify the code to interact with the database instead of the in-memory store.

7. **Extending Data Models**: You can extend the `User` and `Role` models in `src/models.js` to include additional properties or nested data structures as needed for your specific use case.

## Conclusion

The access control service project provides a basic framework for managing users, roles, and permissions. It can be extended and customized by adding new permissions, creating new roles, assigning roles to users, implementing custom authentication and authorization logic, adding new routes, integrating with a database, and extending the data models.

Sources: [src/models.js](), [src/routes.js]()