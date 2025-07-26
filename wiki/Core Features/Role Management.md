<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [config/roles.json](https://github.com/agattani123/access-control-service/blob/main/config/roles.json)
- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
</details>

# Role Management

## Introduction

The Role Management feature within this project provides a way to define and manage user roles and their associated permissions. It allows for the creation of roles with specific sets of permissions, and the assignment of these roles to individual users. This feature is crucial for implementing access control and ensuring that users have the appropriate level of access to various parts of the system based on their roles.

Sources: [config/roles.json](), [src/models.js]()

## Role Definition

Roles are defined in a configuration file (`config/roles.json`), where each role is represented as a key-value pair. The key represents the role name, and the value is an array of permission strings.

```json
{
  "admin": ["view_users", "create_role", "view_permissions"],
  "engineer": ["view_users", "view_permissions"],
  "analyst": ["view_users"]
}
```

This configuration defines three roles: `admin`, `engineer`, and `analyst`. The `admin` role has permissions to view users, create roles, and view permissions. The `engineer` role can view users and permissions, while the `analyst` role can only view users.

Sources: [config/roles.json]()

## Data Models

The project defines two data models related to role management: `User` and `Role`.

### User Model

The `User` model represents a user in the system and has the following fields:

| Field  | Type    | Description |
|--------|---------|-------------|
| `email`| `string`| The user's email address |
| `role` | `string`| The name of the role assigned to the user |
| `phone`| `string`| The user's phone number |

```javascript
export const User = {
  email: 'string',
  role: 'string',
  phone: 'string'
};
```

Sources: [src/models.js]()

### Role Model

The `Role` model represents a role in the system and has the following fields:

| Field       | Type      | Description |
|-------------|-----------|-------------|
| `name`      | `string`  | The name of the role |
| `email`     | `string`  | The email associated with the role (optional) |
| `permissions`| `string[]`| An array of permission strings granted to the role |

```javascript
export const Role = {
  name: 'string',
  email: 'string',
  permissions: ['string']
};
```

Sources: [src/models.js]()

## Role Assignment

Users are assigned roles based on their `role` field in the `User` model. The value of this field should match one of the role names defined in the `config/roles.json` file.

```javascript
const user = {
  email: 'john@example.com',
  role: 'admin', // Assigns the 'admin' role to this user
  phone: '123456789'
};
```

Once a user is assigned a role, they inherit the permissions associated with that role, as defined in the `config/roles.json` file.

Sources: [src/models.js](), [config/roles.json]()

## Permission Checks

To check if a user has a specific permission, the application should first retrieve the user's role from the `User` model, then look up the permissions associated with that role in the `config/roles.json` file. If the required permission is present in the role's permissions array, the user is granted access; otherwise, access is denied.

```javascript
const userRole = user.role; // e.g., 'admin'
const rolePermissions = roles[userRole]; // ['view_users', 'create_role', 'view_permissions']

if (rolePermissions.includes('create_role')) {
  // Allow the user to create a new role
} else {
  // Deny access to create a new role
}
```

Sources: [src/models.js](), [config/roles.json]()

## Conclusion

The Role Management feature in this project provides a flexible and extensible way to define roles, assign permissions to those roles, and associate users with specific roles. By leveraging the `config/roles.json` file and the `User` and `Role` data models, the application can effectively manage access control and ensure that users have the appropriate level of access based on their assigned roles.