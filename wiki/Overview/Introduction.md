<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/access-control-service/blob/main/README.md)
- [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

</details>

# Introduction

The Access Control Service is an internal Role-Based Access Control (RBAC) microservice that provides centralized permission enforcement for internal tools, APIs, and services within the organization. It manages user-role assignments, role-permission mappings, and enforces access controls at runtime, ensuring consistent and auditable permission handling across various systems.

Sources: [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

## Purpose and Overview

The primary purpose of this service is to eliminate the need for hardcoded permission logic across internal systems by centralizing access control decisions. It promotes a decoupled architecture where role logic is separated from application code, enabling consistent and auditable permission enforcement.

Sources: [docs/one-pager.md:4-6](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L4-L6)

The Access Control Service follows a flat RBAC model, where roles are directly mapped to permissions without any hierarchies or scopes. The role-to-permission mappings are defined declaratively in a JSON configuration file.

Sources: [docs/one-pager.md:10-11](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L10-L11)

## Key Features

- **Flat RBAC model**: The service implements a flat Role-Based Access Control model without support for scopes or hierarchies.
- **Declarative role-permission mappings**: Role-to-permission mappings are defined in a JSON configuration file, allowing for easy management and updates.
- **Middleware-based permission enforcement**: The service provides a middleware component for enforcing permissions at runtime based on the user's assigned role.
- **CLI tools**: Command-line interface (CLI) tools are available for bootstrapping the service and assigning roles to users.
- **REST API**: A RESTful API is provided for managing roles and user assignments.

Sources: [docs/one-pager.md:10-14](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L10-L14)

## Architecture Overview

```mermaid
graph TD
    Request --> APIEndpoint[/api/*]
    APIEndpoint --> AuthMiddleware[authMiddleware]
    AuthMiddleware --> UserRole[role]
    UserRole --> PermissionsArray[permissions[]]
    PermissionsArray --> AllowDeny[allow/deny]
```

The Access Control Service follows a middleware-based architecture for enforcing permissions:

1. Incoming requests to the `/api/*` endpoints are intercepted by the `authMiddleware`.
2. The user's identity is extracted from the `x-user-email` HTTP header.
3. The user's assigned role is resolved from the `db.users` map.
4. The permissions associated with the user's role are loaded from the `config/roles.json` configuration file.
5. The requested route is checked against the user's permissions, and access is either allowed or denied based on the result.

Sources: [docs/one-pager.md:17-22](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L17-L22)

## Setup and Usage

### Setup

To set up the Access Control Service, follow these steps:

```bash
cp .env.example .env # Create a .env file from the example
npm install # Install dependencies
npm run start # Start the service
```

Sources: [docs/one-pager.md:25-29](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L25-L29)

### CLI Usage

The service provides a command-line interface (CLI) tool for assigning roles to users:

```bash
node cli/manage.js assign-role alice@company.com engineer
```

This command assigns the `engineer` role to the user with the email `alice@company.com`.

Sources: [docs/one-pager.md:31-33](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L31-L33)

## API Overview

The Access Control Service exposes a RESTful API for managing users, roles, and permissions. The following table summarizes the available API endpoints and their corresponding permissions:

| Method | Endpoint         | Description                   | Permission         |
|--------|------------------|-------------------------------|--------------------|
| GET    | /api/users       | List all users and roles      | `view_users`       |
| POST   | /api/roles       | Create a new role             | `create_role`      |
| GET    | /api/permissions | View all role definitions     | `view_permissions` |
| POST   | /api/tokens      | Assign user to a role         | *None (bootstrap)* |

> All API requests must include the `x-user-email` header with the user's email address.

Sources: [docs/one-pager.md:35-44](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L35-L44)

## Deployment Considerations

- **Stateless design**: The Access Control Service is designed to be stateless, with no persistent database. The configuration is stored in memory.
- **Internal usage**: The service is suitable for internal usage behind an API gateway, as it is not intended for public-facing applications.
- **Persistence integration**: For persistent configuration storage, the service can be integrated with an external configuration store like etcd or Consul.

Sources: [docs/one-pager.md:46-49](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L46-L49)

## Related Documentation

- [`docs/permissions.md`](docs/permissions.md): Detailed documentation on role definitions and structure.
- [`docs/api.md`](docs/api.md): Complete API contract and specification.

Sources: [docs/one-pager.md:51-52](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md#L51-L52)