# Access Control Service

This is an internal RBAC (Role-Based Access Control) microservice that provides centralized permission enforcement for internal tools, APIs, and services. It manages user-role assignments, role-permission mappings, and enforces access controls at runtime.

---

## Purpose

This service eliminates hardcoded permission logic across internal systems by centralizing access control decisions. It ensures consistent, auditable permission enforcement and decouples role logic from application code.

---

## Features

- Flat RBAC model (no scopes or hierarchies)
- Declarative role-to-permission mappings (via JSON config)
- Middleware-based permission enforcement
- CLI tools for bootstrapping and role assignment
- REST API for role and user management

---

## Architecture

```
Request → /api/* → authMiddleware → role → permissions[] → allow/deny
```

- Identity provided via `x-user-email` HTTP header
- Role resolved from `db.users` map
- Permissions loaded from `config/roles.json`
- Routes annotated with required permissions

---

## Setup

```bash
cp .env.example .env
npm install
npm run start
```

---

## CLI Usage

```bash
node cli/manage.js assign-role alice@company.com engineer
```

---

## API Overview

| Method | Endpoint         | Description                   | Permission         |
|--------|------------------|-------------------------------|--------------------|
| GET    | /api/users       | List all users and roles      | `view_users`       |
| POST   | /api/roles       | Create a new role             | `create_role`      |
| GET    | /api/permissions | View all role definitions     | `view_permissions` |
| POST   | /api/tokens      | Assign user to a role         | *None (bootstrap)* |

> All API requests must include:  
> `x-user-email: user@company.com`

---

## Deployment Notes

- Stateless by design (no DB); config is in memory
- Suitable for internal-only usage behind API gateway
- For persistence, integrate with an external config store (e.g., etcd, Consul)

---

## Related Docs

- [`docs/permissions.md`](docs/permissions.md): Role definitions and structure  
- [`docs/api.md`](docs/api.md): Complete API contract
