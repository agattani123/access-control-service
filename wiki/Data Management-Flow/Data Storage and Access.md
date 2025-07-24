<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js)
- [src/models.js](https://github.com/agattani123/access-control-service/blob/main/src/models.js)
</details>

# Data Storage and Access

## Introduction

The "Data Storage and Access" component within this project is responsible for managing user data, roles, and permissions. It defines the data models and provides a centralized data store for the application. This component serves as the foundation for implementing access control and authorization mechanisms.

## Data Models

### User Model

The `User` model represents a user entity within the system. It consists of the following properties:

```javascript
export const User = {
  email: 'string', // User's email address
  role: 'string', // User's assigned role
  phone: 'string' // User's phone number
};
```

Sources: [src/models.js:1-4]()

### Role Model

The `Role` model defines the structure of a role within the system. It includes the following properties:

```javascript
export const Role = {
  name: 'string', // Name of the role
  email: 'string', // Email associated with the role (optional)
  permissions: ['string'] // Array of permissions granted to the role
};
```

Sources: [src/models.js:6-10]()

## Data Storage

The project currently uses an in-memory data store (`db`) to store user and role information. This data store is defined in the `src/db.js` file.

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

The `db` object contains two properties:

- `users`: An object that maps user email addresses to their respective roles.
- `roles`: An object containing the roles and their associated permissions (imported from a JSON file).

### User Data

The `users` object in the `db` stores user information in a key-value format, where the key is the user's email address, and the value is the user's role.

```javascript
users: {
  'admin@internal.company': 'admin',
  'analyst@internal.company': 'analyst',
}
```

Sources: [src/db.js:5-8]()

### Role Data

The `roles` object in the `db` is imported from a JSON file (`../config/roles.json`). This file likely contains the definitions of various roles and their associated permissions, following the `Role` model structure.

```javascript
roles: roles // Imported from '../config/roles.json'
```

Sources: [src/db.js:9]()

## Data Access

The project currently does not provide any explicit data access mechanisms or APIs. However, the `db` object can be imported and used directly within other parts of the application to retrieve user and role information.

```javascript
import db from './db.js';

// Access user data
const userRole = db.users['admin@internal.company']; // 'admin'

// Access role data
const adminPermissions = db.roles.admin.permissions;
```

Sources: [src/db.js](), [src/models.js]()

## Limitations and Future Improvements

The current implementation of "Data Storage and Access" has the following limitations:

1. **In-Memory Data Store**: The data store is an in-memory object, which means that data will be lost upon application restart or server restart. A persistent data storage solution, such as a database, should be implemented for production environments.

2. **Limited Data Access**: There is no dedicated API or service layer for accessing and manipulating user and role data. Implementing a dedicated service layer with well-defined APIs would improve code organization, maintainability, and extensibility.

3. **Lack of Data Validation**: The current implementation does not perform any data validation or sanitization. Implementing input validation and data sanitization mechanisms would enhance data integrity and security.

4. **Lack of Authentication and Authorization**: The project does not currently include any authentication or authorization mechanisms. Implementing these features would be necessary for a production-ready access control system.

5. **Hardcoded Data**: The user data is currently hardcoded in the `db.js` file. A more flexible approach would be to load user data from an external source (e.g., a database or a configuration file) or provide mechanisms for managing user data dynamically.

6. **Limited Role Management**: The role data is imported from a JSON file, but there is no mechanism for dynamically managing roles or their associated permissions. Implementing role management functionality would enhance the flexibility and maintainability of the access control system.

Sources: [src/db.js](), [src/models.js]()

## Conclusion

The "Data Storage and Access" component in this project provides a basic foundation for managing user and role data. However, it lacks several essential features and best practices required for a production-ready access control system. Addressing the limitations mentioned above, such as implementing a persistent data store, dedicated service layer, data validation, authentication, and authorization mechanisms, as well as dynamic role management, would significantly enhance the functionality and robustness of this component.