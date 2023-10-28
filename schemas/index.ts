import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().required().max(100).min(4),
    description: yup.string().required().max(500).min(2),
    assigned_to: yup.string().required("assigned to is a required field"),
    severity: yup.number().positive().integer().required(),
    task_type: yup.string().required(),
  })
  .required();

export const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
