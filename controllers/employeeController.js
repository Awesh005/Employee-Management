import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/employees.json');

// Helper to read data
const readEmployees = async () => {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
};

// Helper to write data
const writeEmployees = async (employees) => {
  await fs.writeFile(dataPath, JSON.stringify(employees, null, 2));
};

// @desc    Get all employees with filters and pagination
// @route   GET /employees
export const getEmployees = async (req, res, next) => {
  try {
    let employees = await readEmployees();
    const { department, name, page = 1, limit = 10 } = req.query;

    // Filter by department
    if (department) {
      employees = employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
    }

    // Filter by name (for combined filters)
    if (name) {
      employees = employees.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Pagination
    const total = employees.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const results = employees.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      count: results.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      },
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search employees by name
// @route   GET /employees/search
export const searchEmployees = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400);
      throw new Error('Please provide a name query parameter');
    }

    const employees = await readEmployees();
    const results = employees.filter(e => 
      e.name.toLowerCase().includes(name.toLowerCase())
    );

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
export const getEmployeeById = async (req, res, next) => {
  try {
    const employees = await readEmployees();
    const employee = employees.find(e => e.id === req.params.id);
    
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

// @desc    Create employee
// @route   POST /api/employees
export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, salary, status } = req.body;
    
    const employees = await readEmployees();
    const now = new Date().toISOString();
    
    const newEmployee = {
      id: `emp-${Date.now()}`,
      name,
      email,
      department,
      salary: Number(salary),
      status,
      createdAt: now,
      updatedAt: now
    };
    
    employees.push(newEmployee);
    await writeEmployees(employees);
    
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
export const updateEmployee = async (req, res, next) => {
  try {
    const employees = await readEmployees();
    const index = employees.findIndex(e => e.id === req.params.id);
    
    if (index === -1) {
      res.status(404);
      throw new Error('Employee not found');
    }

    const now = new Date().toISOString();
    const updatedEmployee = { 
      ...employees[index], 
      ...req.body, 
      id: employees[index].id,
      updatedAt: now 
    };
    
    employees[index] = updatedEmployee;
    
    await writeEmployees(employees);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee status
// @route   PATCH /employees/:id/status
export const updateEmployeeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const employees = await readEmployees();
    const index = employees.findIndex(e => e.id === req.params.id);

    if (index === -1) {
      res.status(404);
      throw new Error('Employee not found');
    }

    const now = new Date().toISOString();
    employees[index] = {
      ...employees[index],
      status,
      updatedAt: now
    };

    await writeEmployees(employees);
    res.status(200).json(employees[index]);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
export const deleteEmployee = async (req, res, next) => {
  try {
    const employees = await readEmployees();
    const filteredEmployees = employees.filter(e => e.id !== req.params.id);
    
    if (employees.length === filteredEmployees.length) {
      res.status(404);
      throw new Error('Employee not found');
    }
    
    await writeEmployees(filteredEmployees);
    res.status(200).json({ message: `Employee ${req.params.id} deleted` });
  } catch (error) {
    next(error);
  }
};
