# 🏢 Employee Management API

## 👤 Candidate Information
- **Full Name**: Md Awesh
- **Email ID**: roshanawesh@gmail.com
- **College Name**: Jharkhand Rai University
- **Selected Skill Track**: Java or Node.js

## 📝 Assessment Tasks
- **Task Implementation**: All tasks relevant to the chosen track have been implemented.
- **Scope**: Includes coding exercises, problem-solving steps, and a complete mini-project output (REST API + React Dashboard).

---

A robust, production-ready REST API for managing employee records, built with Node.js, Express, and TypeScript. This project follows the **MVC (Model-View-Controller)** pattern and features comprehensive validation, error handling, and a clean React-based dashboard for visualization.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete employee records.
- **Advanced Filtering**: Filter employees by department and search by name.
- **Pagination**: Built-in support for paginated results.
- **Data Validation**: Strict request validation using `express-validator`.
- **Status Management**: Dedicated endpoint for updating employee employment status.
- **Error Handling**: Centralized middleware for consistent error responses.
- **Frontend Dashboard**: A modern React interface to interact with the API.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React 19, Tailwind CSS, Lucide React
- **Validation**: Express Validator
- **Development**: Vite, TSX
- **Storage**: JSON-based persistent file storage

## 📥 Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`.

## 🛣 API Endpoints

### Employees

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/employees` | Get all employees (supports filtering & pagination) |
| `GET` | `/employees/:id` | Get a single employee by ID |
| `POST` | `/employees` | Create a new employee |
| `PUT` | `/employees/:id` | Update an existing employee |
| `PATCH` | `/employees/:id/status` | Update employee status |
| `DELETE` | `/employees/:id` | Delete an employee |
| `GET` | `/employees/search` | Search employees by name |

---

## 📝 Example Requests & Responses

### 1. Create Employee
**POST** `/employees`

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice.j@example.com",
  "department": "IT",
  "salary": 85000,
  "status": "Active"
}
```

**Response (201 Created):**
```json
{
  "id": "emp-1710192000000",
  "name": "Alice Johnson",
  "email": "alice.j@example.com",
  "department": "IT",
  "salary": 85000,
  "status": "Active",
  "createdAt": "2026-03-11T22:34:18.000Z",
  "updatedAt": "2026-03-11T22:34:18.000Z"
}
```

### 2. Get All Employees
**GET** `/employees?department=IT&page=1&limit=5`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalPages": 1
  },
  "data": [
    {
      "id": "emp-001",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "department": "IT",
      "salary": 75000,
      "status": "Active"
    }
  ]
}
```

### 3. Update Status
**PATCH** `/employees/emp-001/status`

**Request Body:**
```json
{
  "status": "On Leave"
}
```

**Response (200 OK):**
```json
{
  "id": "emp-001",
  "name": "John Doe",
  "status": "On Leave",
  "updatedAt": "2026-03-11T22:40:00.000Z"
}
```

### 4. Error Response Example
**Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Please provide a valid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

## 📂 Project Structure

```text
├── controllers/     # Business logic & request handlers
├── data/            # JSON data storage
├── middleware/      # Custom middleware (auth, validation, errors)
├── routes/          # API route definitions
├── src/             # Frontend React application
├── server.ts        # Express server entry point
└── package.json     # Project dependencies & scripts
```


