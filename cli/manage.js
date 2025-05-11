import db from '../src/db.js';

const [,, command, email, role] = process.argv;

if (command === 'assign-role' && email && role) {
  db.users[email] = role;
  console.log(`Assigned role '${role}' to user '${email}'`);
} else {
  console.log('Usage: node manage.js assign-role <email> <role>');
}
