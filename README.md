# Employee Management API

## Overview

The **Employee Management API** is a RESTful backend application built using **Node.js and Express.js**.
It provides functionality to manage employee records including creating, retrieving, updating, and deleting employee data.

This project demonstrates backend development concepts such as **REST API design, input validation, error handling, filtering, pagination, and modular project architecture**.

---

## Developer Information

**Name:** Mohammad Avesh
**Email:** [roshanawesh@gmail.com](mailto:roshanawesh@gmail.com)
**College:** Jharkhand Rai University
**Skill Track:** Java & API Development

---

## Live API

Render Deployment:

```
https://employee-management-bw6s.onrender.com/
```

---

## Features

### Core Features

* Create Employee
* Get All Employees
* Get Employee by ID
* Update Employee
* Delete Employee

### Advanced Features

* Search employees by name
* Pagination support
* Filter employees by department
* Update employee status
* Input validation using express-validator
* Global error handling middleware
* Automatic timestamps (createdAt, updatedAt)

---

## Tech Stack

Backend:

* Node.js
* Express.js

Other Tools:

* REST API
* JSON file for data storage
* express-validator

---

## API Endpoints

### Create Employee

POST `/employees`

Example Request Body:

```
{
  "name": "Mohammad Avesh",
  "email": "roshanawesh@gmail.com",
  "department": "IT",
  "salary": 45000,
  "status": "Active"
}
```

---

### Get All Employees

GET `/employees`

Optional Query Parameters:

```
?page=1
&limit=5
&department=IT
```

---

### Search Employees

GET `/employees/search?name=awesh`

---

### Get Employee by ID

GET `/employees/:id`

Example:

```
GET /employees/101
```

---

### Update Employee

PUT `/employees/:id`

---

### Delete Employee

DELETE `/employees/:id`

---

### Update Employee Status

PATCH `/employees/:id/status`

Example Request:

```
{
  "status": "On Leave"
}
```

---

## Project Structure

```
employee-management
│
├── server.js
├── routes
│   └── employeeRoutes.js
│
├── controllers
│   └── employeeController.js
│
├── middleware
│   └── errorHandler.js
│
├── data
│   └── employees.json
│
└── README.md
```

---

## Installation

Clone the repository:

```
git clone https://github.com/Awesh005/Employee-Management.git
```

Navigate to the project folder:

```
cd Employee-Management
```

Install dependencies:

```
npm install
```

Run the server:

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

## Example API Test

Get employees:

```
http://localhost:5000/employees
```

---

## Future Improvements

* Database integration (MongoDB / PostgreSQL)
* Authentication using JWT
* Role-based access control
* Swagger API documentation

---

## License

This project is created for learning purposes and technical assessment.
