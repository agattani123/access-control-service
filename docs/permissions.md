# RBAC Model: Roles & Permissions

This document defines the permission system enforced by the access-control-service.

---

## Permission Enforcement

Permissions are enforced on a per-route basis. Each route defines the permission required to access it. These are checked at runtime against the user's assigned role.

A valid request must:
1. Include the header `x-user-email`
2. Match a known user in the in-memory `db.users` map
3. Have a role that includes the required permission

---

## Default Roles

```json
{
  "admin": ["view_users", "create_role", "view_permissions"],
  "engineer": ["view_users", "view_permissions"],
  "analyst": ["view_users"]
}
```

### admin
- Full system access
- Used by platform and DevOps teams

### engineer
- Read-only access to users and permissions
- Used for observability and debugging

### analyst
- Basic read-only access
- Intended for data/reporting use cases

---

## Adding a New Role

1. Edit `config/roles.json` to define a new role:
```json
{
  "support": ["view_users"]
}
```

2. Assign it to a user:
```bash
node cli/manage.js assign-role support@company.com support
```

3. Ensure consuming services request the appropriate permissions.

---

## Notes

- All permission checks are flat; no wildcarding or nesting
- All user-role mappings are in-memory
- Changes to `roles.json` require a service restart

---

## Future Enhancements

- Scoped permissions (e.g. `project:view:marketing`)
- Integration with SSO group claims
- Audit logging for role changes and access attempts
