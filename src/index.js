import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use('/api', routes);

// const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Access Control Service listening on port ${port}`);
});
