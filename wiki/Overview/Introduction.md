<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/access-control-service/blob/main/README.md)
- [docs/one-pager.md](https://github.com/agattani123/access-control-service/blob/main/docs/one-pager.md)

</details>

# Introduction

The Access Control Service is an internal Role-Based Access Control (RBAC) microservice that provides centralized permission enforcement for internal tools, APIs, and services within a company or organization. Its primary purpose is to manage user-role assignments, role-permission mappings, and enforce access controls at runtime, ensuring consistent and auditable permission enforcement across various internal systems.

By centralizing access control decisions, this service eliminates the need for hardcoded permission logic within individual applications, promoting code decoupling and maintainability. It serves as a single source of truth for role-based access control, enabling consistent and auditable permission enforcement across the organization's internal systems.

## Features

The Access Control Service offers the following key features:

- **Flat RBAC Model**: It implements a flat Role-Based Access Control (RBAC) model without support for hierarchies or scopes.
- **Declarative Role-Permission Mappings**: Role-to-permission mappings are defined declaratively using a JSON configuration file, allowing for easy management and updates.
- **Middleware-based Permission Enforcement**: The service provides middleware components that can be integrated into internal applications to enforce access controls at runtime based on user roles and permissions.
- **CLI Tools**: Command-line interface (CLI) tools are available for bootstrapping the service and assigning roles to users.
- **REST API**: A RESTful API is provided for managing roles, users, and permissions, enabling integration with other systems and automation.

Sources: [docs/one-pager.md:11-16](), [docs/one-pager.md:24-28]()

## Architecture Overview

The Access Control Service follows a straightforward architecture, as illustrated by the following flow:

```mermaid
graph TD
    Request("Request (/api/*)") -->|x-user-email| authMiddleware("authMiddleware")
    authMiddleware -->|role| roleResolver("Role Resolver (db.users)")
    roleResolver -->|permissions[]| permissionLoader("Permission Loader (config/roles.json)")
    permissionLoader -->|allow/deny| decisionMaker("Decision Maker (Route Annotations)")
    decisionMaker -->|Response| Response("Response")
```

1. Incoming requests to the `/api/*` endpoints include the `x-user-email` HTTP header, which provides the user's identity.
2. The `authMiddleware` component is responsible for extracting the user's identity from the request header.
3. The user's role is resolved by querying the `db.users` map, which associates users with their assigned roles.
4. The `permissionLoader` component loads the permissions associated with the user's role from the `config/roles.json` configuration file.
5. The `decisionMaker` component enforces access control by comparing the user's permissions with the required permissions annotated on the requested route.
6. Based on the decision, the request is either allowed or denied, and an appropriate response is sent.

Sources: [docs/one-pager.md:22-23]()

## Role and Permission Management

The Access Control Service provides mechanisms for managing roles, permissions, and user-role assignments.

### Role and Permission Definitions

Role-to-permission mappings are defined declaratively in a JSON configuration file (`config/roles.json`). This file specifies the available roles and the permissions associated with each role.

```json
{
  "engineer": ["create_resource", "update_resource", "view_resource"],
  "manager": ["create_resource", "update_resource", "view_resource", "delete_resource"],
  "admin": ["*"]
}
```

In the example above, the `engineer` role has permissions to create, update, and view resources, while the `manager` role has additional permission to delete resources. The `admin` role has a wildcard (`*`) permission, granting access to all actions.

Sources: [docs/one-pager.md:12](), [docs/one-pager.md:24]()

### User-Role Assignment

User-role assignments are managed through a CLI tool (`cli/manage.js`). This tool allows administrators to assign roles to specific users.

```bash
node cli/manage.js assign-role alice@company.com engineer
```

In the example above, the `assign-role` command assigns the `engineer` role to the user with the email `alice@company.com`.

Sources: [docs/one-pager.md:27]()

## API Overview

The Access Control Service exposes a RESTful API for managing users, roles, and permissions. The following table summarizes the available API endpoints and their corresponding permissions:

| Method | Endpoint         | Description                   | Permission         |
|--------|------------------|-------------------------------|--------------------|
| GET    | /api/users       | List all users and roles      | `view_users`       |
| POST   | /api/roles       | Create a new role             | `create_role`      |
| GET    | /api/permissions | View all role definitions     | `view_permissions` |
| POST   | /api/tokens      | Assign user to a role         | *None (bootstrap)* |

All API requests must include the `x-user-email` HTTP header to provide the user's identity.

Sources: [docs/one-pager.md:29-37]()

## Deployment and Integration

The Access Control Service is designed to be stateless and suitable for internal-only usage behind an API gateway. By default, it does not persist data to a database, and the configuration is stored in memory.

For production deployments or scenarios requiring persistence, the service can be integrated with an external configuration store, such as etcd or Consul, to store and retrieve role definitions and user-role assignments.

Sources: [docs/one-pager.md:39-41]()

## Related Documentation

- `docs/permissions.md`: Provides detailed information about the role definitions and structure used in the Access Control Service.
- `docs/api.md`: Contains the complete API contract, including request/response formats and error handling.

Sources: [docs/one-pager.md:43-45]()