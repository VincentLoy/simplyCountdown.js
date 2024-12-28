# Contributing to SimplyCountdown.js

🎉 Thank you for considering contributing to SimplyCountdown.js! I appreciate your support and I'm excited to collaborate with you. Below are the guidelines to help you get started.

## How to Contribute

### ⭐ 0. Give a Star to the Repository

This step is totally optional... but seriously, who doesn't love some stars? 😉
It's like giving a virtual high-five to the project! 🙌 ⭐ 🙌

### 🔱 1. Fork the Repository

Start by forking the repository to your GitHub account.

### 📥 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone git@github.com:your-username/simplyCountdown.js.git
cd simplyCountdown.js
```

### 🔧 3. Node.js Version

Make sure you're using the correct Node.js version. You can check the required version in `.nvmrc`. If you use [nvm](https://github.com/nvm-sh/nvm), simply run:

```bash
nvm use
```

This will automatically switch to the correct Node.js version for the project.

### 🛠️ 4. Set Up the Development Environment

Install the necessary dependencies:
We recommend using [bun](https://bun.sh/) as it offers superior performance and seamless dependency management.

```bash
bun install
```

**NOTE:** _For now, `package.json` is running bun commands only, maybe we will have to update this to be compatible with any package management system in the future_

### 🌿 5. Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```

### 💻 6. Make Your Changes

Make your changes to the codebase. Ensure your code follows the project's code style and formatting guidelines.
While developping, you should run this command:

```bash
bun run dev
```

**NOTE:** _This will run a dev server with Vite, update the sources from `src/core` and tests your new features in `docs/src` files like `docs/src/index.html` and `docs/src/assets/js/main.js`. Each changes inside those files will refresh the dev page_

### ✅ 7. Test Your Changes

Build, then, run the tests to make sure your changes don't break anything:

```bash
bun run build
```

then:

```bash
bun run dist:test:serve
```

**NOTE:** _This will generate various HTML files inside a `dist_test` directory and run a temporary node.js server where you can check different implementations and use-cases of the distribution files. Every HTML pages should run a working countdown._

### 💾 8. Commit Your Changes

Commit your changes with a clear and concise commit message:

```bash
git add .
git commit -m "Add feature: your feature description"
```

### 🚀 9. Push to Your Fork

Push your changes to your forked repository:

```bash
git push origin feature/your-feature-name
```

### 🔄 10. Open a Pull Request

Open a pull request from your forked repository to the main repository. Provide a detailed description of your changes and any relevant information.

## Pull Request Process

-   Provide a detailed description of your changes in the pull request.
-   Link any relevant issues in the pull request description.
-   Wait for a maintainer to review your pull request.

## Creating Issues

If you find a bug or have a feature request, please create an issue in the repository. Provide as much detail as possible, including steps to reproduce the issue or a clear description of the feature.

## Code Review Process

All pull requests will be reviewed by a maintainer. The review process includes:

-   Checking for code quality and adherence to the style guide.
-   Ensuring tests are passing.
-   Providing feedback and requesting changes if necessary.

## Documentation

For more information about the project, please refer to the [README.md](README.md) and the [documentation website](https://vincentloy.github.io/simplyCountdown.js/).

Thank you for contributing! 🚀
