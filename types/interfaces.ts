export interface ITasks {
  id: number;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  severity: number;
  project_id: number;
  active: boolean;
}
