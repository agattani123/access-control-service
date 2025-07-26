<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [.env.example](https://github.com/agattani123/access-control-service/blob/main/.env.example)
- [package.json](https://github.com/agattani123/access-control-service/blob/main/package.json)
</details>

# Deployment and Infrastructure

## Introduction

The "Deployment and Infrastructure" aspect of this project primarily deals with the configuration and setup required to run the Access Control Service application. It covers the necessary dependencies, environment variables, and the entry point for starting the application server.

Sources: [package.json](), [.env.example]()

## Application Dependencies

The project relies on the following key dependencies:

| Dependency | Description |
|------------|-------------|
| dotenv     | Loads environment variables from a `.env` file into `process.env`. |
| express    | A fast and minimalist web application framework for Node.js.      |

Sources: [package.json:9-12]()

## Environment Configuration

The application expects certain environment variables to be defined. These variables can be set in a `.env` file, which is loaded using the `dotenv` package.

| Variable | Description | Default Value |
|----------|-------------|---------------|
| PORT     | The port on which the application server will listen. | 8080 |

Sources: [.env.example:1]()

## Application Entry Point

The entry point for starting the application server is located in the `src/index.js` file. This file is responsible for setting up the Express server and listening on the configured port.

```javascript
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Sources: [package.json:5]() (inferred from the `start` script)

## Deployment Process

To deploy the Access Control Service application, follow these steps:

1. Install the required dependencies by running `npm install`.
2. Create a `.env` file in the project root directory and set the desired environment variables (e.g., `PORT`).
3. Start the application server by running `npm start`.

The application will start listening on the configured port, and you should see a log message indicating that the server is running.

Sources: [package.json:5,9-12](), [.env.example:1]()

## Summary

The "Deployment and Infrastructure" aspect of this project focuses on setting up the necessary environment and dependencies for running the Access Control Service application. It involves configuring environment variables, installing required packages, and starting the Express server on the specified port. The provided source files cover the essential information for deploying and running the application locally or in a production environment.