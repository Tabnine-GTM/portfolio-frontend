# Portfolio Frontend

This is the frontend application for the Portfolio project, built with React, TypeScript, and Vite.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

**Requirements:**
- Node.js (v16.0.0 or later recommended)
- npm (v7.0.0 or later recommended)

## Getting Started

Follow these steps to set up your development environment:

1. Clone the repository:

```

git clone https://github.com/your-username/portfolio-frontend.git
cd portfolio-frontend

```

2. Install dependencies:

```

npm install

```

3. Set up environment variables:

```

cp .env.sample .env

```

Open the `.env` file and update the values as needed for your local setup.

## Running the Application

To start the development server:

```

npm run dev

```

This will start the application on `http://localhost:5173` (or another port if 5173 is already in use).

## Building for Production

To create a production build:

```

npm run build

```

This will generate a `dist` folder with the compiled assets.

## Other Available Scripts

- `npm run lint`: Run ESLint to check for code quality and style issues
- `npm run preview`: Preview the production build locally

## Project Structure

- `src/`: Contains the source code
  - `components/`: Reusable React components
  - `pages/`: Individual page components
  - `assets/`: Static assets like images and icons
  - `lib/`: Utility functions and helpers
- `public/`: Public assets that are copied to the build folder

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
