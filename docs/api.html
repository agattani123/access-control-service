<!DOCTYPE html>
<html>
<head>
    <title>API Reference – Access Control Service</title>
</head>
<body>
<h1 id="api-reference-access-control-service">API Reference – Access Control Service</h1>
<p>All requests must include a valid identity header:</p>
<pre><code>x-user-email: user@yourcompany.com
</code></pre>
<p>This is used to look up the user's role and evaluate access.</p>
<hr>
<h2 id="-get-api-users-"><code>GET /api/users</code></h2>
<p><strong>Description:</strong><br>Returns a list of all users and their roles.</p>
<p><strong>Required Permission:</strong> <mark class="remove">view_users</mark><mark class="add"> assign_user</mark></p>
<p><strong>Response:</strong></p>
<pre><code class="lang-json">[
  { "email": "admin@internal.company", "role": "admin" },
  { "email": "analyst@internal.company", "role": "analyst" }
]
</code></pre>
<hr>
<h2 id="-post-api-roles-"><code>POST /api/roles</code></h2>
<p><strong>Description:</strong><br>Defines a new role and its associated permissions.</p>
<p><strong>Required Permission:</strong> <mark class="remove">create_role</mark><mark class="add"> view_permissions</mark></p>
<p><strong>Request Body:</strong></p>
<pre><code class="lang-json">{
  "name": "support",
  "permissions": ["view_users"]
}
</code></pre>
<p><strong>Response:</strong></p>
<pre><code class="lang-json">{
  "role": "support",
  "permissions": ["view_users"]
}
</code></pre>
<hr>
<h2 id="-get-api-permissions-"><code>GET /api/permissions</code></h2>
<p><strong>Description:</strong><br>Lists all current role-permission mappings.</p>
<p><strong>Required Permission:</strong> <mark class="remove">view_permissions</mark><mark class="add"> assign_user</mark></p>
<p><strong>Response:</strong></p>
<pre><code class="lang-json">{
  "admin": ["view_users", "create_role", "view_permissions", <mark class="add">"assign_user"</mark>],
  "engineer": ["view_users", "view_permissions"],
  "analyst": ["view_users"]
}
</code></pre>
<hr>
<h2 id="-post-api-tokens-"><code>POST /api/tokens</code></h2>
<p><strong>Description:</strong><br>Assigns a role to a user. Used for bootstrapping new users.</p>
<mark class="remove"><p>Old Permission: None </p></mark>
<p><strong>Required Permission:</strong><mark class="add"> <code>assign_user</code></mark></p>
<mark class="add"><p>This endpoint was previously unrestricted. As of May 2025, it now requires the <code>assign_user</code> permission to enforce accountability around role assignment.</p></mark>
<p><strong>Request Body:</strong></p>
<pre><code class="lang-json">{
  "user": "newuser@internal.company",
  "role": "analyst"
}
</code></pre>
<p><strong>Response:</strong></p>
<pre><code class="lang-json">{
  "user": "newuser@internal.company",
  "role": "analyst"
}
</code></pre>
<hr>
<h2 id="common-error-responses">Common Error Responses</h2>
<table>
<thead>
<tr>
  <th>Code</th>
  <th>Message</th>
</tr>
</thead>
<tbody>
<tr><td>400</td><td>Invalid or missing request body</td></tr>
<tr><td>401</td><td>Unknown user</td></tr>
<tr><td>403</td><td>Missing required permission</td></tr>
</tbody>
</table>
</body>
</html>
