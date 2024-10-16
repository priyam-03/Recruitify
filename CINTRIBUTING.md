# Contributing to Recruitify

Thank you for considering contributing to our project! We welcome all contributions, whether it's fixing bugs, adding new features, or improving documentation.

Please follow these guidelines for contributing to the repository.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
   - [Fork the Repo](#fork-the-repo)
   - [Clone the Repo](#clone-the-repo)
   - [Install Dependencies](#install-dependencies)
3. [Running the Project](#running-the-project)
4. [Making Changes](#making-changes)
5. [Submitting a Pull Request](#submitting-a-pull-request)
6. [Coding Standards](#coding-standards)

---

## Code of Conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md). Please read and follow it to ensure that the community remains welcoming to everyone.

---

## Getting Started

### Fork the Repo

1. Fork this repository by clicking the "Fork" button at the top right of the page.
2. Create your feature branch: `git checkout -b my-feature`

### Clone the Repo

1. Clone your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name
   ```

### Install Dependencies

We have both client-side and server-side code. You'll need to install dependencies for both.

1. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

2. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

---

## Running the Project

### Running the Server

1. Create a `secret.env` file in `backend` directories and add the necessary environment variables as outlined in the `.env.example` file.
2. Start the server:
   ```bash
   npm start
   ```

### Running the Client

1. In the `client` folder, start the React application:
   ```bash
   npm start
   ```

Now you should have both the server and the client running on your local machine.

---

## Making Changes

1. Make sure your changes are properly tested.
2. Keep your commits clean and descriptive. A good commit message format is:

   ```
   type: subject

   description (optional)
   ```

   Examples:

   - `feat: add login functionality`
   - `fix: resolve bug in user authentication`

---

## Submitting a Pull Request

1. Ensure your changes are up to date with the `main` branch:
   Sync your forked github repository with the main repository

   ```bash
   git fetch origin
   git checkout main
   git merge origin/main
   ```

2. Push your changes to your feature branch:

   ```bash
   git push origin my-feature
   ```

3. Submit a pull request to the `main` branch of the original repository.

Make sure to fill out the pull request template and link any related issues.
