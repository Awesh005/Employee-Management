import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  updateEmployeeStatus
} from '../controllers/employeeController.js';

const router = express.Router();

const employeeValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('department').isIn(['IT', 'HR', 'Finance', 'Marketing']).withMessage('Invalid department. Must be one of: IT, HR, Finance, Marketing'),
  body('status').isIn(['Active', 'Inactive', 'On Leave']).withMessage('Invalid status. Must be one of: Active, Inactive, On Leave')
];

const statusValidationRules = [
  body('status').isIn(['Active', 'Inactive', 'On Leave']).withMessage('Invalid status. Must be one of: Active, Inactive, On Leave')
];

router.get('/search', searchEmployees);

router.patch('/:id/status', statusValidationRules, validate, updateEmployeeStatus);

router.route('/')
  .get(getEmployees)
  .post(employeeValidationRules, validate, createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(employeeValidationRules, validate, updateEmployee)
  .delete(deleteEmployee);

export default router;
