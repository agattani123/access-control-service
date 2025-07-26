<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/access-control-service/blob/main/README.md)
- [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

</details>

# Introduction

The Access Control Service is an internal Role-Based Access Control (RBAC) microservice that provides centralized permission enforcement for internal tools, APIs, and services within a company or organization. Its primary purpose is to manage user-role assignments, role-permission mappings, and enforce access controls at runtime, ensuring consistent and auditable permission handling across various internal systems.

By centralizing access control decisions, this service eliminates the need for hardcoded permission logic within individual applications, promoting code decoupling and maintainability. It serves as a single source of truth for role-based permissions, allowing for consistent enforcement and easier auditing across the organization.

## Key Features

### Flat RBAC Model

The Access Control Service follows a flat RBAC model, where roles are directly mapped to permissions without hierarchies or scopes. This simplifies the role-permission structure and makes it easier to manage and reason about access controls.

Sources: [docs/one-pager.md:10](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L10)

### Declarative Role-Permission Mappings

Role-to-permission mappings are defined declaratively in a JSON configuration file, allowing for easy management and updates without modifying the application code.

Sources: [docs/one-pager.md:11](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L11)

### Middleware-based Permission Enforcement

The service provides a middleware component that can be integrated into various internal applications and APIs. This middleware intercepts incoming requests, checks the user's role and associated permissions, and either allows or denies access based on the required permissions for the requested resource or operation.

Sources: [docs/one-pager.md:12](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L12)

### CLI Tools and REST API

The Access Control Service includes command-line interface (CLI) tools for bootstrapping and assigning roles to users. Additionally, it exposes a REST API for managing roles, users, and permissions.

Sources: [docs/one-pager.md:13-14](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L13-L14), [README.md:21-26](https://github.com/agattani123/access-control-service/blob/main/README.md#L21-L26)

## Request Flow

The following diagram illustrates the high-level flow of a request through the Access Control Service:

```mermaid
graph TD
    A[Request] -->|/api/*| B[authMiddleware]
    B --> C[Role Resolution]
    C --> D[Load Permissions]
    D -->|permissions[]| E[Allow/Deny]
    E -->|allow| F[Proceed]
    E -->|deny| G[Reject]

    C --> H[db.users]
    D --> I[config/roles.json]
```

1. An incoming request to the `/api/*` endpoint is intercepted by the `authMiddleware`.
2. The middleware resolves the user's role based on the provided identity (e.g., `x-user-email` HTTP header) by looking up the user in the `db.users` map.
3. The middleware loads the permissions associated with the user's role from the `config/roles.json` configuration file.
4. The permissions are checked against the required permissions for the requested resource or operation, as defined by annotations on the API routes.
5. If the user has the required permissions, the request is allowed to proceed; otherwise, it is rejected.

Sources: [docs/one-pager.md:16-21](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L16-L21)

## API Overview

The Access Control Service exposes a REST API for managing users, roles, and permissions. The following table summarizes the available endpoints and their associated permissions:

| Method | Endpoint         | Description                   | Permission         |
|--------|------------------|-------------------------------|--------------------|
| GET    | /api/users       | List all users and roles      | `view_users`       |
| POST   | /api/roles       | Create a new role             | `create_role`      |
| GET    | /api/permissions | View all role definitions     | `view_permissions` |
| POST   | /api/tokens      | Assign user to a role         | *None (bootstrap)* |

All API requests must include the `x-user-email` HTTP header to provide the user's identity.

Sources: [README.md:21-26](https://github.com/agattani123/access-control-service/blob/main/README.md#L21-L26), [docs/one-pager.md:25-26](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L25-L26)

## Deployment and Persistence

The Access Control Service is designed to be stateless, with no persistent database. Instead, the configuration and user-role mappings are stored in memory. This makes the service suitable for internal-only usage behind an API gateway.

For persistent storage and configuration management, the service can be integrated with an external configuration store, such as etcd or Consul.

Sources: [docs/one-pager.md:30-32](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L30-L32)

## Related Documentation

- [`docs/permissions.md`](docs/permissions.md): Detailed documentation on the role definitions and structure used by the Access Control Service.
- [`docs/api.md`](docs/api.md): Complete API contract and specification for the Access Control Service.

Sources: [docs/one-pager.md:34-35](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L34-L35)