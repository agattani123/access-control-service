<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [docs/permissions.md](https://github.com/agattani123/access-control-service/blob/main/docs/permissions.md)
- [src/authMiddleware.js](https://github.com/agattani123/access-control-service/blob/main/src/authMiddleware.js)
</details>

# Permission Management

## Introduction

The access-control-service implements a Role-Based Access Control (RBAC) model to manage permissions within the project. This system enforces access restrictions on a per-route basis, ensuring that only authorized users with the appropriate roles and permissions can access specific routes or functionalities.

The permission management system is designed to provide a flexible and scalable approach to access control, allowing for the definition of custom roles and the assignment of specific permissions to each role. This approach enables fine-grained control over user access and helps maintain the security and integrity of the application.

## RBAC Model

The RBAC model used in this project is based on the concept of roles and permissions. Roles are predefined sets of permissions, and users are assigned one or more roles based on their access requirements. Permissions are then checked at runtime to determine whether a user has the necessary access to perform a specific action or access a particular resource.

### Roles and Permissions

The project defines a set of default roles, each with a predefined set of permissions. The default roles and their associated permissions are defined in the `config/roles.json` file and are loaded into memory during application startup.

```json
{
  "admin": ["view_users", "create_role", "view_permissions"],
  "engineer": ["view_users", "view_permissions"],
  "analyst": ["view_users"]
}
```

Sources: [docs/permissions.md:6-13]()

#### Role Descriptions

- **admin**: This role has full system access and is intended for platform and DevOps teams. It grants permissions to view users, create new roles, and view permissions.
- **engineer**: This role provides read-only access to users and permissions, typically used for observability and debugging purposes.
- **analyst**: This role grants basic read-only access to user data, intended for data analysis and reporting use cases.

Sources: [docs/permissions.md:15-22]()

### Permission Enforcement

The access-control-service enforces permissions on a per-route basis. Each route defines the required permission(s) to access it, and these permissions are checked at runtime against the user's assigned role(s).

For a request to be considered valid, it must meet the following criteria:

1. Include the `x-user-email` header with a valid user email.
2. Match a known user in the in-memory `db.users` map.
3. The user's assigned role(s) must include the required permission(s) for the requested route.

```javascript
export function checkPermission(requiredPermission) {
  return function (req, res, next) {
    const userEmail = req.headers['x-user-email'];
    // Check if user email is provided and exists in the database
    // ...

    // Retrieve the user's role and associated permissions
    // ...

    // Check if the user's permissions include the required permission
    // ...

    // If authorized, proceed to the next middleware or route handler
    next();
  };
}
```

Sources: [src/authMiddleware.js:2-22]()

The `checkPermission` middleware function is responsible for verifying the user's permissions based on the provided `requiredPermission` argument. It checks the `x-user-email` header, retrieves the user's role and associated permissions from the in-memory database, and ensures that the required permission is included in the user's permissions. If the user is authorized, the middleware proceeds to the next middleware or route handler.

### Adding a New Role

To add a new role to the system, follow these steps:

1. Edit the `config/roles.json` file to define a new role and its associated permissions:

```json
{
  "support": ["view_users"]
}
```

2. Assign the new role to a user using the provided CLI tool:

```bash
node cli/manage.js assign-role support@company.com support
```

3. Ensure that consuming services request the appropriate permissions when accessing routes or resources protected by the new role.

Sources: [docs/permissions.md:25-36]()

## Future Enhancements

The current implementation of the permission management system has some limitations and potential areas for improvement. The following enhancements are planned for future releases:

- **Scoped Permissions**: Introduce the ability to define scoped permissions, such as `project:view:marketing`, to provide more granular access control.
- **SSO Group Claims Integration**: Integrate with Single Sign-On (SSO) group claims to streamline user and role management.
- **Audit Logging**: Implement audit logging for role changes and access attempts to improve visibility and auditing capabilities.

Sources: [docs/permissions.md:40-44]()

## Conclusion

The access-control-service implements a robust and flexible RBAC model for managing permissions within the project. By defining roles and associating them with specific permissions, the system ensures that only authorized users can access protected routes and resources. The current implementation provides a solid foundation for access control, while future enhancements aim to improve scalability, integration, and auditing capabilities.