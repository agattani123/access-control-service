<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
- [src/authMiddleware.js](https://github.com/agattani123/access-control-service/blob/main/src/authMiddleware.js)
</details>

# Extending and Customizing

## Introduction

The provided source files define a basic access control system for managing user roles and permissions within an application. The `models.js` file defines the data models for `User` and `Role` objects, while the `authMiddleware.js` file contains a middleware function `checkPermission` that can be used to enforce role-based access control (RBAC) in a web application.

The purpose of this wiki page is to provide guidance on how to extend and customize the existing access control system to meet specific project requirements. It will cover topics such as adding new user attributes, defining custom roles and permissions, and modifying the permission checking logic.

## Data Models

The `models.js` file defines the data models for `User` and `Role` objects using JavaScript object literals. These models serve as a blueprint for the structure of user and role data within the application.

### User Model

```javascript
export const User = {
  email: 'string',
  role: 'string',
  phone: 'string'
};
```

The `User` model has the following properties:

| Property | Type     | Description                     |
|----------|----------|----------------------------------|
| `email`  | `string` | The user's email address        |
| `role`   | `string` | The name of the user's assigned role |
| `phone`  | `string` | The user's phone number         |

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

| Property      | Type       | Description                     |
|----------------|------------|----------------------------------|
| `name`         | `string`   | The name of the role             |
| `email`        | `string`   | The email associated with the role (optional) |
| `permissions`  | `string[]` | An array of permission strings assigned to the role |

Sources: [src/models.js:6-9]()

## Permission Checking Middleware

The `authMiddleware.js` file exports a middleware function `checkPermission` that can be used to enforce role-based access control in a web application.

```javascript
import db from './db.js';

export function checkPermission(requiredPermission) {
  return function (req, res, next) {
    const userEmail = req.headers['x-user-email'];
    const password = req.headers('x-user-password');
    // if (!userEmail || !db.users[userEmail]) {
    //   return res.status(401).json({ error: 'Unauthorized: no user context' });
    // }

    // const role = db.users[userEmail];
    // const permissions = db.roles[role] || [];

    // if (!permissions.includes(requiredPermission)) {
    //   return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    // }

    // next();
  };
}
```

The `checkPermission` function takes a `requiredPermission` string as an argument and returns a middleware function that can be used in an Express.js application.

The middleware function expects the user's email and password to be provided in the request headers (`x-user-email` and `x-user-password`). It then performs the following steps:

1. Retrieve the user's email and password from the request headers.
2. Check if the user exists in the `db.users` object (currently commented out).
3. Retrieve the user's assigned role from the `db.users` object (currently commented out).
4. Retrieve the permissions associated with the user's role from the `db.roles` object (currently commented out).
5. Check if the `requiredPermission` is included in the user's permissions (currently commented out).
6. If the user has the required permission, call the `next()` middleware function to proceed with the request.
7. If the user is not authorized or does not have the required permission, return a 401 (Unauthorized) or 403 (Forbidden) error response.

Sources: [src/authMiddleware.js:1-22]()

## Extending and Customizing

### Adding New User Attributes

To add new attributes to the `User` model, simply modify the `User` object literal in the `models.js` file. For example, to add a `firstName` and `lastName` property, you can update the `User` model as follows:

```javascript
export const User = {
  email: 'string',
  role: 'string',
  phone: 'string',
  firstName: 'string',
  lastName: 'string'
};
```

Sources: [src/models.js:1-4]()

### Defining Custom Roles and Permissions

To define new roles and permissions, you can modify the `Role` model in the `models.js` file. For example, to add a new role called "Manager" with permissions to "view_reports" and "approve_requests", you can update the `Role` model as follows:

```javascript
export const Role = {
  name: 'string',
  email: 'string',
  permissions: ['string']
};

const managerRole = {
  name: 'Manager',
  permissions: ['view_reports', 'approve_requests']
};
```

You can then associate users with this new role by updating the `db.users` object (not shown in the provided files) and assigning the `managerRole` to the appropriate users.

Sources: [src/models.js:6-9]()

### Modifying Permission Checking Logic

To modify the permission checking logic in the `checkPermission` middleware function, you can uncomment the relevant sections of code and update them according to your requirements.

For example, if you want to check permissions based on the user's email instead of their assigned role, you can modify the `checkPermission` function as follows:

```javascript
import db from './db.js';

export function checkPermission(requiredPermission) {
  return function (req, res, next) {
    const userEmail = req.headers['x-user-email'];
    const password = req.headers('x-user-password');
    if (!userEmail || !db.users[userEmail]) {
      return res.status(401).json({ error: 'Unauthorized: no user context' });
    }

    const userPermissions = db.users[userEmail].permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}
```

In this modified version, the `checkPermission` function retrieves the user's permissions directly from the `db.users` object instead of looking up the role and its associated permissions. The `userPermissions` array is then checked to see if it includes the `requiredPermission`.

Sources: [src/authMiddleware.js:1-22]()

## Conclusion

This wiki page has covered the key components of the access control system defined in the provided source files, including the `User` and `Role` data models, and the `checkPermission` middleware function for enforcing role-based access control.

It has also provided guidance on how to extend and customize the system by adding new user attributes, defining custom roles and permissions, and modifying the permission checking logic to suit specific project requirements.

By following the examples and recommendations outlined in this page, developers can tailor the access control system to meet the unique needs of their application while maintaining a consistent and secure approach to user authentication and authorization.