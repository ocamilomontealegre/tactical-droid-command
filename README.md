# 🛸 **Tactical Droid Command** 🛸

> *"Calculating the odds of success is the tactical droid's specialty..."*

![Yoda Image](/images/yoda.jpeg)  

Welcome to the **Tactical Droid Command** project! This system is designed for analyzing and executing commands for tactical droids in the style of the Confederacy of Independent Systems' army. This project will allow you to manage strategic attacks and actions using an API written in TypeScript and Node.js.

---

## 📜 **Description**

In this project, a tactical droid makes decisions based on data received from scans and combat protocols. Multiple factors are processed to determine the priority target for attack.

### 📦 **Technologies Used**

- **Node.js** with **TypeScript** 🧑‍💻
- **Express.js** for creating API endpoints 🚀
- **MongoDB** using Docker for the database 📊
- **Swagger** for API documentation 📜
- **ESLint** to ensure clean and consistent code 🌟
- **Winston** for detailed event logging 📑

---

## 🚀 **Getting Started** 🚀

Follow the instructions below to deploy and run the project on your workstation.

### 1️⃣ **Prerequisites**

Before getting started, make sure you have the following installed:

- **Node.js** v16 or higher ([Download Node.js](https://nodejs.org/))
- **Docker** and **Docker Compose** for managing the MongoDB container ([Install Docker](https://www.docker.com/))
- **npm** or **pnpm** as a package manager

---

### 2️⃣ **Cloning the Repository**

Open your terminal and clone the repository to your local machine:

```bash
git clone <https://github.com/ocamilomontealegre/tactical-droid-command.git>
```

---

### 3️⃣ **Installing Dependencies**

Once the project is cloned, navigate to the project directory and run the following command to install all necessary dependencies:

```bash
cd <tactical-droid-command>
npm install
```

### 4️⃣ **Run Docker Compose**

Run the docker-compose file inside the docker folder in order to setting up the MongoDB container

```bash
npm run start:dev
```

---

### 5️⃣ **Execute in Development Mode**

If you are developing new features or adjusting the code, use the following command to run the server in development mode with automatic restarts whenever you change something in the code:

```bash
npm run start:dev
```

---

## 📖 API Documentation

The project uses Swagger to document and test the API interactively. Once the server is running, you can access the documentation at:

```bash
http://localhost:8888/docs
```

---

## 💫 May the Force Be with You

Thank you for using Tactical Droid Command! If you encounter any issues, feel free to open an issue. Remember: precision is key in tactics, and your feedback is as valuable as a lightsaber in battle.

*"Good generals don't lose... they make others lose." — Tactical Droid*

----

## 🛰️ Important Links

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Swagger](https://swagger.io/)
