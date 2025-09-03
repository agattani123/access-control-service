<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/index.js](https://github.com/agattani123/access-control-service/blob/main/src/index.js)
- [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)
- [src/authMiddleware.js](https://github.com/agattani123/access-control-service/blob/main/src/authMiddleware.js) (assumed to exist based on import)
- [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js) (assumed to exist based on import)

</details>

# Architecture Overview

The Access Control Service is a Node.js application built with Express.js that provides role-based access control (RBAC) functionality. It allows managing users, roles, permissions, and authentication tokens within the system.

## Application Setup

The application entry point is `src/index.js`, which sets up the Express server and imports the routes defined in `src/routes.js`. The server listens on the configured `PORT` environment variable or defaults to port 8080.

```mermaid
graph TD
    A[index.js] -->|imports| B[express]
    A -->|imports| C[dotenv]
    A -->|imports| D[routes.js]
    A -->|uses| E[app.use/json]
    A -->|uses| F[app.use/routes]
    A -->|listens on| G[PORT]
```

Sources: [src/index.js](https://github.com/agattani123/access-control-service/blob/main/src/index.js)

## Routing and Middleware

The `src/routes.js` file defines the API routes and middleware for the Access Control Service. It imports the `checkPermission` middleware from `src/authMiddleware.js` and the `db` module from `src/db.js`.

```mermaid
graph TD
    A[routes.js] -->|imports| B[express]
    A -->|imports| C[authMiddleware.js]
    A -->|imports| D[db.js]
    A -->|defines| E[GET /api/users]
    A -->|defines| F[POST /api/roles]
    A -->|defines| G[GET /api/permissions]
    A -->|defines| H[POST /api/tokens]
    E -->|uses| C
    F -->|uses| C
    G -->|uses| C
```

Sources: [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)

### User Management

The `/api/users` route retrieves a list of all users and their associated roles from the `db.users` object. It is protected by the `checkPermission('view_users')` middleware.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant AuthMiddleware
    participant Database

    Client->>Server: GET /api/users
    Server->>AuthMiddleware: checkPermission('view_users')
    alt has permission
        AuthMiddleware-->>Server: next()
        Server->>Database: Get users
        Database-->>Server: users
        Server-->>Client: 200 OK [{ email, role }]
    else no permission
        AuthMiddleware-->>Server: 403 Forbidden
        Server-->>Client: 403 Forbidden
    end
```

Sources: [src/routes.js:5-8](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L5-L8)

### Role Management

The `/api/roles` route allows creating a new role by providing a `name` and an array of `permissions`. It is protected by the `checkPermission('create_role')` middleware.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant AuthMiddleware
    participant Database

    Client->>Server: POST /api/roles { name, permissions }
    Server->>AuthMiddleware: checkPermission('create_role')
    alt has permission
        AuthMiddleware-->>Server: next()
        Server->>Database: Add role
        Database-->>Server: success
        Server-->>Client: 201 Created { role, permissions }
    else no permission
        AuthMiddleware-->>Server: 403 Forbidden
        Server-->>Client: 403 Forbidden
    end
```

Sources: [src/routes.js:11-18](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L11-L18)

The `/api/permissions` route retrieves a list of all roles and their associated permissions from the `db.roles` object. It is protected by the `checkPermission('view_permissions')` middleware.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant AuthMiddleware
    participant Database

    Client->>Server: GET /api/permissions
    Server->>AuthMiddleware: checkPermission('view_permissions')
    alt has permission
        AuthMiddleware-->>Server: next()
        Server->>Database: Get roles
        Database-->>Server: roles
        Server-->>Client: 200 OK roles
    else no permission
        AuthMiddleware-->>Server: 403 Forbidden
        Server-->>Client: 403 Forbidden
    end
```

Sources: [src/routes.js:20-23](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L20-L23)

### Token Management

The `/api/tokens` route allows creating a new authentication token by providing a `user` and a `role`. It updates the `db.users` object with the new user-role mapping.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Database

    Client->>Server: POST /api/tokens { user, role }
    Server->>Database: Add user-role mapping
    Database-->>Server: success
    Server-->>Client: 201 Created { user, role }
```

Sources: [src/routes.js:25-30](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L25-L30)

## Data Storage

The application uses an in-memory data store (`db.js`) to store user-role mappings and role-permission mappings. In a production environment, this would likely be replaced with a persistent database.

```mermaid
classDiagram
    class Database {
        -users: Object
        -roles: Object
    }
    Database : +getUsers() Object
    Database : +getRoles() Object
    Database : +addUser(user, role) void
    Database : +addRole(name, permissions) void
```

Sources: [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js) (based on usage of `db.users` and `db.roles`)

## Authentication Middleware

The `checkPermission` middleware (imported from `src/authMiddleware.js`) is responsible for verifying if a user has the required permission to access a protected route. Its implementation is not provided in the given source files.

```mermaid
sequenceDiagram
    participant Server
    participant AuthMiddleware
    participant Database

    Server->>AuthMiddleware: checkPermission(requiredPermission)
    AuthMiddleware->>Database: Get user role
    Database-->>AuthMiddleware: user role
    AuthMiddleware->>Database: Get role permissions
    Database-->>AuthMiddleware: role permissions
    alt has permission
        AuthMiddleware-->>Server: next()
    else no permission
        AuthMiddleware-->>Server: 403 Forbidden
    end
```

Sources: [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js) (based on usage of `checkPermission` middleware)

## Summary

The Access Control Service provides a RESTful API for managing users, roles, permissions, and authentication tokens within a system. It implements role-based access control (RBAC) by associating users with roles and roles with permissions. The application uses an in-memory data store for storing user-role and role-permission mappings, and employs middleware to enforce access control on protected routes.

While the provided source files cover the core functionality of the service, additional components like authentication, authorization, and persistent data storage would be required for a production-ready implementation.