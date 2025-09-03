<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js)
- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
- [config/roles.json](https://github.com/agattani123/access-control-service/blob/main/config/roles.json) (Inferred from `src/db.js`)

</details>

# Data Storage and Access

## Introduction

The "Data Storage and Access" component within this project handles the management and retrieval of user and role information. It serves as a centralized data layer, providing a simple in-memory data store for user accounts, their associated roles, and the permissions granted to each role.

This component is crucial for implementing access control mechanisms and ensuring that users can only perform actions permitted by their assigned roles.

## Data Models

### User Model

The `User` model represents a user account within the system. It consists of the following fields:

```javascript
export const User = {
  email: 'string',
  role: 'string'
};
```

- `email` (string): The unique email address associated with the user account.
- `role` (string): The name of the role assigned to the user, which determines their permissions.

Sources: [src/models.js:1-4]()

### Role Model

The `Role` model defines the permissions and capabilities associated with a particular role within the system:

```javascript
export const Role = {
  name: 'string',
  permissions: ['string']
};
```

- `name` (string): The unique name of the role.
- `permissions` (array of strings): A list of permissions granted to users with this role.

Sources: [src/models.js:6-9]()

## Data Storage

The project uses an in-memory data store implemented as a JavaScript object called `db`. This data store holds two main collections:

1. `users`: An object that maps user email addresses to their respective roles.
2. `roles`: An object that maps role names to their associated permissions.

```javascript
const db = {
  users: {
    'admin@internal.company': 'admin',
    'analyst@internal.company': 'analyst',
  },
  roles: roles
};
```

The `roles` object is imported from a JSON configuration file (`config/roles.json`), allowing for easy management and modification of role definitions.

Sources: [src/db.js:1-10]()

## Data Access

The `db` object serves as the single source of truth for user and role information within the application. Other components can import and interact with this data store to perform various access control operations, such as:

- Authenticating users by checking if their email and role exist in the `users` collection.
- Retrieving the permissions associated with a user's role from the `roles` collection.
- Verifying if a user has the necessary permissions to perform a specific action based on their role's permissions.
- Adding, modifying, or removing user accounts and role definitions within the `db` object.

While this implementation uses a simple in-memory data store, in a production environment, it would likely be replaced with a more robust and persistent data storage solution, such as a relational database or a NoSQL database.

Sources: [src/db.js](), [src/models.js]()

## Conclusion

The "Data Storage and Access" component provides a straightforward and centralized way to manage user accounts, roles, and permissions within the application. By defining clear data models and utilizing a simple in-memory data store, it lays the foundation for implementing access control mechanisms and ensuring that users can only perform actions permitted by their assigned roles.