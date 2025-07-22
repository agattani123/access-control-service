<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/index.js](https://github.com/agattani123/access-control-service/blob/main/src/index.js)
- [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)
- [src/authMiddleware.js](https://github.com/agattani123/access-control-service/blob/main/src/authMiddleware.js) (assumed to exist based on import in routes.js)
- [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js) (assumed to exist based on import in routes.js)

</details>

# Architecture Overview

This wiki page provides an overview of the architecture and components of the Access Control Service, a Node.js application built with Express.js. The service manages user roles, permissions, and authentication tokens within a system.

## Application Structure

The application follows a typical Express.js structure, with the main entry point defined in `src/index.js`. This file sets up the Express application, configures middleware, and mounts the API routes defined in `src/routes.js`.

```mermaid
graph TD
    A[index.js] -->|imports| B[express]
    A -->|imports| C[dotenv]
    A -->|imports| D[routes.js]
    A -->|uses| E[express.json() middleware]
    A -->|mounts| F[/api routes]
    A -->|listens on| G[configured port]
```

Sources: [src/index.js](https://github.com/agattani123/access-control-service/blob/main/src/index.js)

## API Routes

The `src/routes.js` file defines the API routes and their corresponding handlers. It imports the `checkPermission` middleware from `src/authMiddleware.js` and the `db` module from `src/db.js`.

```mermaid
graph TD
    A[routes.js] -->|imports| B[express]
    A -->|imports| C[authMiddleware.js]
    A -->|imports| D[db.js]
    A -->|defines| E[/users GET route]
    A -->|defines| F[/roles POST route]
    A -->|defines| G[/permissions GET route]
    A -->|defines| H[/tokens POST route]
    E -->|uses| C
    F -->|uses| C
    G -->|uses| C
```

Sources: [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js)

### User Management

The `/users` GET route retrieves a list of users and their associated roles from the `db.users` object. It requires the `view_users` permission, which is checked by the `checkPermission` middleware.

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant routes.js
    participant authMiddleware.js
    participant db.js

    Client->>Express: GET /api/users
    Express->>routes.js: Route handler
    routes.js->>authMiddleware.js: checkPermission('view_users')
    authMiddleware.js-->>routes.js: Permission granted
    routes.js->>db.js: Access db.users
    db.js-->>routes.js: User data
    routes.js-->>Express: Response with user data
    Express-->>Client: Response with user data
```

Sources: [src/routes.js:5-8](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L5-L8)

### Role Management

The `/roles` POST route allows creating a new role by providing a name and an array of associated permissions. It requires the `create_role` permission.

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant routes.js
    participant authMiddleware.js
    participant db.js

    Client->>Express: POST /api/roles
    Express->>routes.js: Route handler
    routes.js->>authMiddleware.js: checkPermission('create_role')
    authMiddleware.js-->>routes.js: Permission granted
    routes.js->>db.js: Add role to db.roles
    db.js-->>routes.js: Success
    routes.js-->>Express: Response with role data
    Express-->>Client: Response with role data
```

Sources: [src/routes.js:11-17](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L11-L17)

The `/permissions` GET route retrieves the list of roles and their associated permissions from the `db.roles` object. It requires the `view_permissions` permission.

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant routes.js
    participant authMiddleware.js
    participant db.js

    Client->>Express: GET /api/permissions
    Express->>routes.js: Route handler
    routes.js->>authMiddleware.js: checkPermission('view_permissions')
    authMiddleware.js-->>routes.js: Permission granted
    routes.js->>db.js: Access db.roles
    db.js-->>routes.js: Role data
    routes.js-->>Express: Response with role data
    Express-->>Client: Response with role data
```

Sources: [src/routes.js:19-22](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L19-L22)

### Token Management

The `/tokens` POST route associates a user with a role by adding an entry to the `db.users` object. It does not require any specific permission.

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant routes.js
    participant db.js

    Client->>Express: POST /api/tokens
    Express->>routes.js: Route handler
    routes.js->>db.js: Add user-role mapping to db.users
    db.js-->>routes.js: Success
    routes.js-->>Express: Response with user-role data
    Express-->>Client: Response with user-role data
```

Sources: [src/routes.js:24-29](https://github.com/agattani123/access-control-service/blob/main/src/routes.js#L24-L29)

## Data Storage

The application uses an in-memory data store defined in `src/db.js` to store user roles, permissions, and user-role mappings. This is likely a simplified implementation for demonstration purposes and would need to be replaced with a persistent data store in a production environment.

```mermaid
classDiagram
    class Database {
        -users: Object
        -roles: Object
    }
```

Sources: [src/db.js](https://github.com/agattani123/access-control-service/blob/main/src/db.js) (assumed file based on import in routes.js)

## Authentication Middleware

The `src/authMiddleware.js` file (assumed to exist based on the import in `src/routes.js`) likely contains the implementation of the `checkPermission` middleware function used to verify user permissions for certain routes.

```mermaid
sequenceDiagram
    participant Express
    participant routes.js
    participant authMiddleware.js
    participant db.js

    Express->>routes.js: Route handler
    routes.js->>authMiddleware.js: checkPermission(requiredPermission)
    authMiddleware.js->>db.js: Get user role
    db.js-->>authMiddleware.js: User role
    authMiddleware.js->>authMiddleware.js: Check if role has requiredPermission
    alt Role has permission
        authMiddleware.js-->>routes.js: Next()
    else Role lacks permission
        authMiddleware.js-->>routes.js: Error response
    end
```

Sources: [src/routes.js](https://github.com/agattani123/access-control-service/blob/main/src/routes.js) (import of authMiddleware.js)

## Summary

The Access Control Service provides a set of API endpoints for managing user roles, permissions, and authentication tokens. It uses an in-memory data store and a middleware function to enforce permission-based access control. The architecture follows a typical Express.js structure, with routes defined in `src/routes.js` and middleware components imported from other files.

While this overview covers the core functionality based on the provided source files, it's important to note that additional features, security considerations, and best practices may be implemented in a production-ready access control system.