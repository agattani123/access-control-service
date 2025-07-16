<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js)
- [config/roles.json](https://github.com/agattani123/access-control-service/blob/main/config/roles.json)

</details>

# Data Storage and Management

## Introduction

The project utilizes a simple in-memory data store to manage user accounts and role-based access control (RBAC) permissions. The data store is implemented as a JavaScript object, providing a straightforward way to store and retrieve user and role information. This wiki page covers the architecture, components, and data structures involved in the data storage and management aspect of the project.

## Data Store Implementation

The data store is defined in the `src/db.js` file as a JavaScript object named `db`. It consists of two main properties: `users` and `roles`.

```javascript
const db = {
  users: {
    'admin@internal.company': 'admin',
    'analyst@internal.company': 'analyst',
  },
  roles: roles
};
```

Sources: [src/db.js:3-8]()

### User Data

The `users` property is an object that stores user accounts. Each key in the object represents a user's email address, and the corresponding value represents the user's role. Currently, the data store contains two predefined user accounts: `admin@internal.company` with the `admin` role and `analyst@internal.company` with the `analyst` role.

```javascript
users: {
  'admin@internal.company': 'admin',
  'analyst@internal.company': 'analyst',
}
```

Sources: [src/db.js:4-6]()

### Role Data

The `roles` property is an object that defines the role-based access control (RBAC) permissions. This object is imported from a JSON file located at `config/roles.json`. The structure and contents of the `roles` object are determined by the JSON file.

```javascript
import roles from '../config/roles.json' assert { type: 'json' };

const db = {
  // ...
  roles: roles
};
```

Sources: [src/db.js:1,8]()

The `roles.json` file is not provided in the given source files, so its structure and contents cannot be accurately described in this wiki page.

## Data Flow

The data store is a simple in-memory object, and there are no specific data flow operations or logic defined in the provided source files. It is likely that other parts of the project interact with the `db` object to retrieve user and role information, but the details of these interactions are not available in the given files.

## Potential Improvements

While the current implementation provides a basic data store, it has several limitations:

1. **Persistence**: The data store is in-memory, meaning that any changes or additions to user accounts or roles will be lost when the application restarts.
2. **Scalability**: As the number of users and roles grows, an in-memory data store may become inefficient and potentially cause performance issues.
3. **Security**: Storing user credentials (even hashed) in plain text within the codebase is generally considered a security risk.

To address these limitations, the project could consider integrating a more robust and secure data storage solution, such as a relational database management system (RDBMS) or a NoSQL database, depending on the project's requirements and scalability needs.

## Conclusion

The data storage and management aspect of the project is currently implemented using a simple in-memory JavaScript object. It stores user accounts and role-based access control permissions. While this approach provides a basic solution, it may not be suitable for larger-scale or production-ready applications due to limitations in persistence, scalability, and security. Integrating a more robust and secure data storage solution could be a potential future enhancement for the project.