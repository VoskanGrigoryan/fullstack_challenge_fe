//task creation & task edition
export interface ITask {
  title: string;
  description: string;
  assigned_to: string;
  severity: number;
  task_type: string;
}

//login
export type IFormLogin = {
  username: string;
  password: string;
};

//register
export type IFormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
