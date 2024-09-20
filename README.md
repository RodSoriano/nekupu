# Nekupu Monorepo

Welcome to the Nekupu monorepo! This repository contains both the frontend and backend components of the Nekupu project.

## Project Structure

The monorepo consists of the following main parts:

- **`app/frontend`**: The Angular frontend application.
- **`app/api`**: The NestJS backend application.

## Installation

To get started, you'll need to install the dependencies for both the frontend and backend. Run the following commands:

```bash
npm install
```

This will install all the dependencies defined in the `package.json` file and set up the workspaces.

### API Repository

#### Setup Environment Variables

Before running the application, you need to configure the environment variables.

1. **Copy the example environment file**: There is an `env.example` file in the root directory. You need to copy this file and rename it to `.env`.

   ```bash
   cp env.example .env
   ```

2. **Set the correct values**: Open the `.env` file and update the environment variables with the correct values for your local environment, such as database credentials, ports, and secrets.

3. **Generate `jwt_secret`**: If you need to generate a secure `jwt_secret`, you can use the following command and copy the result from the console:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

#### Running the Application with Docker

Once the dependencies are installed and the environment variables are configured, you can use Docker to set up and run the services in containers. Follow these steps:

1. **Ensure Docker is installed**: Make sure Docker and Docker Compose are installed and running on your machine.

   [Install Docker](https://docs.docker.com/get-docker/) if needed.

2. **Build and Start Containers**: Run the following command to start the services in Docker:

   ```bash
   docker compose up
   ```

   This command will build and start the containers for both the frontend and backend. You can view the logs to ensure everything is running correctly.

3. **Access the Application**: Once the containers are up, the frontend and backend will be available at the respective ports (check your Docker Compose configuration for details).

4. **Stop the Containers**: To stop the Docker containers, press `CTRL+C` or run:

   ```bash
   docker compose down
   ```

## Scripts

Here are the available scripts to manage and run the project:

### `dev`

```bash
npm run dev
```

- **Description**: Starts both the Angular frontend and the NestJS backend in development mode.
- **Usage**: This script runs the `start` script from the `app/frontend` workspace and the `start:dev` script from the `app/api` workspace in parallel.
- **Details**:
  - `npm run --workspace app/frontend start`: Launches the Angular frontend application.
  - `npm run --workspace app/api start:dev`: Launches the NestJS backend application in development mode.

### `build`

```bash
npm run build
```

- **Description**: Builds the project using Turbo.
- **Usage**: This script invokes Turbo to run the build process for all workspaces defined in the `turbo.json` configuration file.
- **Details**: Turbo handles building and caching across the monorepo, optimizing the build process.

### `start`

```bash
npm run start
```

- **Description**: Starts the NestJS backend application in production mode.
- **Usage**: This script runs the compiled backend application from the `app/api/dist/main.js` file.
- **Details**: This command assumes that the backend application has already been built and is ready for production deployment.

## Development Setup

To set up the development environment:

1. **Install Dependencies**: Run `npm install` in the root directory.
2. **Run the Development Server**: Use `npm run dev` to start both the frontend and backend applications.

## Deployment Steps

1. **Build the Project**

   To prepare the project for deployment, first build both the frontend and backend applications. Run the following command in the root directory of the monorepo:

```bash
npm run build
```

2. **Start the Backend**

   After building the project, start the NestJS backend application. This can be done by running the following command:

```bash
npm run start
```

This command will execute the compiled backend application from `app/api/dist/main.js`. Make sure your environment is set up with the necessary configurations and environment variables for production. This will also get the frontend running since it is served as a static asset for the backend.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Authors

- Rodrigo Soriano
- Bryan Portillo

## Additional Information

If you encounter any issues or have questions, please feel free to open an issue or contact the authors.
