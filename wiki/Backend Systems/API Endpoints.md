<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)
- [docs/api.html](https://github.com/agattani123/access-control-service/blob/main/docs/api.html)
</details>

# API Endpoints

## Introduction

The Access Control Service provides a set of API endpoints for managing user roles, permissions, and access control within the application. These endpoints allow authorized users to view and assign roles, define role-based permissions, and retrieve information about the current role-permission mappings.

The service follows a role-based access control (RBAC) model, where users are assigned roles, and roles are associated with specific permissions. The API endpoints facilitate the management of this access control system, enabling administrators to configure and maintain the appropriate access levels for different user roles.

## Role Management

### Defining Roles and Permissions

The `/api/roles` endpoint allows authorized users to define new roles and their associated permissions. This endpoint is protected by the `create_role` permission.

#### POST /api/roles

**Description:** Defines a new role and its associated permissions.

**Required Permission:** `create_role`

**Request Body:**
```json
{
  "name": "support",
  "permissions": ["view_users"]
}
```

**Response:**
```json
{
  "role": "support",
  "permissions": ["view_users"]
}
```

Sources: [src/routes.js:10-16]()

### Viewing Permissions

The `/api/permissions` and `/api/permission` endpoints provide a way to retrieve the current role-permission mappings. These endpoints are protected by the `view_permissions` permission.

#### GET /api/permissions

**Description:** Lists all current role-permission mappings.

**Required Permission:** `view_permissions`

**Response:**
```json
{
  "admin": ["view_users", "create_role", "view_permissions", "assign_user"],
  "engineer": ["view_users", "view_permissions"],
  "analyst": ["view_users"]
}
```

Sources: [src/routes.js:18-21](), [docs/api.html:28-35]()

## User Management

### Assigning Roles to Users

The `/api/tokens` endpoint is used to assign roles to users, typically during the user onboarding process. This endpoint requires the `assign_user` permission.

#### POST /api/tokens

**Description:** Assigns a role to a user. Used for bootstrapping new users.

**Required Permission:** `assign_user`

**Request Body:**
```json
{
  "user": "newuser@internal.company",
  "role": "analyst"
}
```

**Response:**
```json
{
  "user": "newuser@internal.company",
  "role": "analyst"
}
```

Sources: [src/routes.js:24-31](), [docs/api.html:38-50]()

### Viewing Users and Roles

The `/api/users` endpoint allows authorized users with the `view_users` permission to retrieve a list of all users and their assigned roles.

#### GET /api/users

**Description:** Returns a list of all users and their roles.

**Required Permission:** `view_users`

**Response:**
```json
[
  { "email": "admin@internal.company", "role": "admin" },
  { "email": "analyst@internal.company", "role": "analyst" }
]
```

Sources: [src/routes.js:5-8](), [docs/api.html:10-17]()

## Access Control Middleware

The Access Control Service utilizes middleware to enforce role-based access control for the API endpoints. The `checkPermission` middleware function is used to verify if the requesting user has the required permission for a specific endpoint.

```javascript
import { checkPermission } from './authMiddleware.js';

router.get('/users', checkPermission('view_users'), (req, res) => {
  // Route handler code
});
```

The `checkPermission` middleware likely retrieves the user's role from the request headers or session data, looks up the associated permissions, and verifies if the requested permission is granted. If the user lacks the required permission, the middleware would likely return an appropriate error response (e.g., 403 Forbidden).

Sources: [src/routes.js:5]()

## Error Handling

The API endpoints handle various error scenarios and return appropriate error responses with HTTP status codes and error messages.

```html
<table>
<thead>
<tr>
  <th>Code</th>
  <th>Message</th>
</tr>
</thead>
<tbody>
<tr><td>400</td><td>Invalid or missing request body</td></tr>
<tr><td>401</td><td>Unknown user</td></tr>
<tr><td>403</td><td>Missing required permission</td></tr>
</tbody>
</table>
```

Sources: [docs/api.html:56-64]()

## Conclusion

The Access Control Service provides a comprehensive set of API endpoints for managing user roles, permissions, and access control within the application. These endpoints enable authorized users to define roles, assign permissions, manage user-role mappings, and retrieve information about the current access control configuration. The service follows a role-based access control model, ensuring that only authorized users can perform specific actions based on their assigned roles and permissions.