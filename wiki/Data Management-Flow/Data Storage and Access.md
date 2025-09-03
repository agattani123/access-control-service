<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js)
- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
</details>

# Data Storage and Access

## Introduction

The "Data Storage and Access" component within this project is responsible for managing user data and role-based access control. It defines the data models for users and roles, and provides a simple in-memory data store for storing and retrieving this information.

Sources: [src/db.js](), [src/models.js]()

## Data Models

### User Model

The `User` model represents a user entity within the system. It consists of the following fields:

| Field | Type    | Description                  |
|-------|---------|------------------------------|
| email | string  | The user's email address     |
| role  | string  | The user's assigned role     |
| phone | string  | The user's phone number      |

Sources: [src/models.js:1-4]()

### Role Model

The `Role` model defines the structure of a role within the access control system. It includes the following fields:

| Field       | Type     | Description                                |
|-------------|----------|-------------------------------------------|
| name        | string   | The name of the role                      |
| email       | string   | The email associated with the role        |
| permissions | string[] | An array of permissions granted to the role |

Sources: [src/models.js:6-9]()

## Data Storage

The project currently uses an in-memory data store (`db`) to store user and role information. This data store is initialized with some predefined users and roles loaded from a configuration file (`roles.json`).

```javascript
import roles from '../config/roles.json' assert { type: 'json' };

const db = {
  users: {
    'admin@internal.company': 'admin',
    'analyst@internal.company': 'analyst',
  },
  roles: roles
};

export default db;
```

Sources: [src/db.js:1-10]()

### Mermaid Diagram: Data Storage Structure

```mermaid
graph TD
    subgraph Data Storage
        Users[Users] --> |key-value| UserData[{"admin@internal.company": "admin", <br/>"analyst@internal.company": "analyst"}]
        Roles[Roles] --> |key-value| RoleData["Loaded from <br/>config/roles.json"]
    end
```

The `db` object contains two main properties:

- `users`: A key-value object that maps user emails to their assigned roles.
- `roles`: An object loaded from the `roles.json` configuration file, containing the defined roles and their associated permissions.

Sources: [src/db.js:3-8]()

## Access Control and Permissions

While the provided source files do not explicitly implement access control or permission checking mechanisms, the `Role` model suggests that the system is designed to support role-based access control (RBAC). Each role has an associated set of permissions, which could be used to grant or deny access to certain features or resources within the application.

Sources: [src/models.js:6-9]()

## Conclusion

The "Data Storage and Access" component in this project defines the data models for users and roles, and provides a simple in-memory data store for storing and retrieving this information. While the current implementation is basic, it lays the foundation for a role-based access control system, where users are assigned roles with specific permissions. Future development could involve integrating this component with other parts of the application to enforce access control rules and manage user authentication and authorization.

Sources: [src/db.js](), [src/models.js]()