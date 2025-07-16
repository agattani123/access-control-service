<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/access-control-service/blob/main/README.md)
- [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

</details>

# Introduction

The Access Control Service is an internal Role-Based Access Control (RBAC) microservice that provides centralized permission enforcement for internal tools, APIs, and services within a company or organization. Its primary purpose is to manage user-role assignments, role-permission mappings, and enforce access controls at runtime, eliminating the need for hardcoded permission logic across various internal systems.

By centralizing access control decisions, this service ensures consistent and auditable permission enforcement while decoupling role logic from application code. It follows a flat RBAC model without hierarchies or scopes, allowing for declarative role-to-permission mappings through a JSON configuration file.

## Key Features

- Flat RBAC model (no scopes or hierarchies)
- Declarative role-to-permission mappings (via JSON config)
- Middleware-based permission enforcement
- CLI tools for bootstrapping and role assignment
- REST API for role and user management

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

## Architecture Overview

The Access Control Service follows a straightforward architecture, as illustrated by the following flow:

```mermaid
graph TD
    Request[Request /api/*] -->|x-user-email| authMiddleware[authMiddleware]
    authMiddleware -->|role| roleResolver[Role Resolver]
    roleResolver -->|permissions[]| permissionLoader[Permission Loader]
    permissionLoader -->|allow/deny| accessDecision[Access Decision]
```

1. Incoming requests to the `/api/*` endpoints include an `x-user-email` HTTP header for identity.
2. The `authMiddleware` component resolves the user's role from the `db.users` map.
3. The user's role is used to load the corresponding permissions from the `config/roles.json` configuration file.
4. The requested route is checked against the required permissions, and access is either allowed or denied.

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

## API Overview

The Access Control Service exposes a REST API for managing users, roles, and permissions. The following table summarizes the available endpoints and their corresponding permissions:

| Method | Endpoint         | Description                   | Permission         |
|--------|------------------|-------------------------------|--------------------|
| GET    | /api/users       | List all users and roles      | `view_users`       |
| POST   | /api/roles       | Create a new role             | `create_role`      |
| GET    | /api/permissions | View all role definitions     | `view_permissions` |
| POST   | /api/tokens      | Assign user to a role         | *None (bootstrap)* |

All API requests must include the `x-user-email` header with a valid user email address.

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

## Deployment and Usage

### Setup and Running

To set up and run the Access Control Service, follow these steps:

```bash
cp .env.example .env
npm install
npm run start
```

This will copy the example environment file, install dependencies, and start the service.

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

### CLI Usage

The service provides a command-line interface (CLI) tool for managing user-role assignments. For example, to assign the `engineer` role to the user `alice@company.com`, run:

```bash
node cli/manage.js assign-role alice@company.com engineer
```

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

### Deployment Notes

- The Access Control Service is designed to be stateless, with no persistent database. The configuration is stored in memory.
- It is suitable for internal-only usage behind an API gateway.
- For persistence, the service can be integrated with an external configuration store, such as etcd or Consul.

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

## Related Documentation

- [`docs/permissions.md`](docs/permissions.md): Role definitions and structure
- [`docs/api.md`](docs/api.md): Complete API contract

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

In summary, the Access Control Service provides a centralized and consistent approach to managing user roles and permissions within an organization. By leveraging a flat RBAC model and declarative role-permission mappings, it simplifies access control enforcement across internal systems while ensuring audibility and decoupling from application code.