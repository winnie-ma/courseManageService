# courseManageService

<h2 align="center">RESTful School-CMS API 🛒</h2>

> Currently under construction. Of course you can explore what I've built so far. Just follow some basic steps mentioned below.

## Summary

This school-CMS API is a flexible and powerful tool for building a simple school content management websites and applications for staff. The staff can be divided into two groups, normal and admin while they have different level of authentication when call these endpoint. It uses Node.js, a popular JavaScript runtime, and Express.js, a web framework for Node.js, to handle the server-side logic and routing of the application. MongoDB is used as the database to store and retrieve school content like student, teacher and course data. The API offers a wide range of endpoints for various school content management functionalities such as staff authentication, and content update.

## Features

- Student/teacher/course management endpoints for CRUD operations
- User authentication endpoints for registering, logging in and managing student/teacher/course information
- Built with Node.js, Express.js and MongoDB
- Easy to set up and use

## 🔄 Dependencies

- NodeJS
- ExpressJS (framework Based on NodeJS/Middleware)
- MongoDB (official MongoDB driver for Node.js)
- Mongoose (for MongoDB object modeling)
- JavaScript
- joi (for scheme check)
- express-async-errors (simplify async try catch)
- jsonwebtoken (authentication)
- bcrypt (password hashing)
- dotenv (environment variables)
- jest (unit test framework)
  -jest-mongodb ()
- # supertest (test endpoints and routes on HTTP servers)

## 🚩 How to install API

#### Fork and clone this repository using

```bash
git clone https://github.com/winnie-ma/courseManageService.git
```

#### Install dependencies and dev dependency using

```bash
npm install
```

#### Create a .env file under the root directory and add the following key-value pairs

```bash
CONNECTION_STRING=<Your_Unique_MongoDB_Connection_String>
TOKEN_KEY=<Your_Private_JWT_Key>
```

> Note: Get the connection string followed doc from MongoDB official website.

#### Start the server locally at _localhost:3000_ using

```bash
npm start
```

## 🔱 API Endpoints

### Auth

```bash
POST    /v1/users/register
POST   /v1/users/login
```

### Courses

To manage courses details:

```bash
GET    /v1/courses/
GET    /v1/courses/:courseId
POST   /v1/courses/
PATCH  /v1/courses/:courseId
DELETE /v1/courses/:courseId
```

### Students

To manage students details and their courses (many-many):

```bash
GET    /v1/students/
GET    /v1/students/:studentId
POST   /v1/students/
PATCH  /v1/students/:studentId
DELETE /v1/students/:studentId
POST   /v1/students/:studentId/courses/:courseId
DELETE /v1/students/:studentId/courses/:courseId
```

### Teachers

To manage teachers details and their courses (one-many):

```bash
GET    /v1/teachers/
GET    /v1/teachers/:teacherId
POST   /v1/teachers/
PATCH  /v1/teachers/:teacherId
DELETE /v1/teachers/:teacherId
POST   /v1/teachers/:teacherId/courses/:courseId
DELETE /v1/teachers/:teacherId/courses/:courseId
```

s

## Deploy:

- [x] <a href="https://www.docker.com/">Docker</a> (Container Environment Host)
- [x] <a href="https://kubernetes.io/pt-br/">Kubernetes</a> (Container Orchestrator Tool)
