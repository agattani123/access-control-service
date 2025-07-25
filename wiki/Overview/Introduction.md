<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/access-control-service/blob/main/README.md)
- [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

</details>

# Introduction

The Access Control Service is an internal Role-Based Access Control (RBAC) microservice that provides centralized permission enforcement for internal tools, APIs, and services within the organization. It manages user-role assignments, role-permission mappings, and enforces access controls at runtime, ensuring consistent and auditable permission enforcement across various systems.

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

## Architecture Overview

The Access Control Service follows a flat RBAC model, where permissions are directly mapped to roles without any hierarchies or scopes. The service employs a middleware-based approach for permission enforcement, intercepting incoming requests and validating the user's role and associated permissions before allowing or denying access.

```mermaid
graph TD
    A[Request] -->|/api/*| B[authMiddleware]
    B --> C[Role Resolution]
    C --> D[Permissions Lookup]
    D -->|permissions[]| E[Allow/Deny]
```

1. Incoming requests to the `/api/*` routes are intercepted by the `authMiddleware`.
2. The user's identity is extracted from the `x-user-email` HTTP header.
3. The user's role is resolved by looking up the `db.users` map.
4. The permissions associated with the user's role are loaded from the `config/roles.json` configuration file.
5. Based on the required permissions annotated on the requested route, access is either allowed or denied.

Sources: [docs/one-pager.md:14-18](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L14-L18)

## Role Management

The Access Control Service provides a command-line interface (CLI) tool for managing user-role assignments. The `manage.js` script allows administrators to assign roles to users.

```bash
node cli/manage.js assign-role alice@company.com engineer
```

This command assigns the `engineer` role to the user with the email `alice@company.com`.

Sources: [docs/one-pager.md:24-26](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L24-L26)

## API Endpoints

The Access Control Service exposes a RESTful API for managing users, roles, and permissions. The following table summarizes the available API endpoints and their corresponding permissions:

| Method | Endpoint         | Description                   | Permission         |
|--------|------------------|-------------------------------|--------------------|
| GET    | /api/users       | List all users and roles      | `view_users`       |
| POST   | /api/roles       | Create a new role             | `create_role`      |
| GET    | /api/permissions | View all role definitions     | `view_permissions` |
| POST   | /api/tokens      | Assign user to a role         | *None (bootstrap)* |

All API requests must include the `x-user-email` header to provide the user's identity.

Sources: [docs/one-pager.md:29-38](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L29-L38)

## Deployment and Persistence

The Access Control Service is designed to be stateless, with no persistent database. The role definitions and user-role mappings are stored in memory, making the service suitable for internal-only usage behind an API gateway. However, for persistent storage, the service can be integrated with an external configuration store like etcd or Consul.

Sources: [docs/one-pager.md:41-43](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L41-L43)

## Related Documentation

- [`docs/permissions.md`](docs/permissions.md): Detailed documentation on role definitions and structure.
- [`docs/api.md`](docs/api.md): Complete API contract and specification.

Sources: [docs/one-pager.md:46-47](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L46-L47)