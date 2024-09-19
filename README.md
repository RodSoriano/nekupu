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

This will install all the dependencies defined in the `package.json` file and setup the workspaces.

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

This command will execute the compiled backend application from app/api/dist/main.js. Make sure your environment is set up with the necessary configurations and environment variables for production. This will also get the frontend running since it is served as a static asset for the backend.


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Authors

- Rodrigo Soriano
- Bryan Portillo

## Additional Information

If you encounter any issues or have questions, please feel free to open an issue or contact the authors.