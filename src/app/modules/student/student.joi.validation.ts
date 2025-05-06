import Joi from 'joi';

// code কে organize করার জন্য validation schema কে আলাদা করে রাখা হয়েছে।
// Helper function for Title Case validation
const titleCase = (value: string, helpers: Joi.CustomHelpers) => {
  const formatted =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  if (value !== formatted) {
    return helpers.error('any.invalid');
  }
  return value;
};

// User name schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(15)
    .trim()
    .custom(titleCase, 'Title case validation')
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name max length is 15',
      'any.invalid': 'First name must be in Title Case',
    }),
  middleName: Joi.string().max(15).trim().optional(),
  lastName: Joi.string()
    .required()
    .max(15)
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.max': 'Last name max length is 15',
      'string.pattern.base': 'Last name must contain only alphabets',
    }),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().optional(),
  fatherContactNo: Joi.string().trim().optional(),
  fatherOccupation: Joi.string().trim().optional(),
  motherName: Joi.string().trim().optional(),
  motherContactNo: Joi.string().trim().optional(),
  motherOccupation: Joi.string().trim().optional(),
});

// Local guardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().optional(),
  contactNo: Joi.string().trim().optional(),
  occupation: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),
});

// Main student schema
const StudentValidationSchemaWithJoi = Joi.object({
  id: Joi.string()
    .required()
    .messages({ 'any.required': 'Student ID is required' }),
  name: userNameValidationSchema
    .required()
    .messages({ 'any.required': 'Name is required' }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
  gender: Joi.string()
    .valid('male', 'female')
    .required()
    .messages({ 'any.only': 'Gender must be male or female' }),
  dateOfBirth: Joi.string().optional(),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact no is required',
  }),
  emergencyContactNo: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': 'Invalid blood group',
    }),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.optional(),
  profileImg: Joi.string().optional(),
});

export default StudentValidationSchemaWithJoi;
