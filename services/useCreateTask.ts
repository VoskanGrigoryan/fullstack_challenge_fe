import { baseURL } from "@/config/api";
import axios from "axios";
import { createMutation } from "react-query-kit";

interface Variables {
  title: string;
  description: string;
  assigned_to: string;
  severity: number;
  task_type: string;
  active: boolean;
  owner_user_id: number;
  project_id: number;
}

export const useCreateTask = createMutation({
  mutationFn: async (variables: Variables) => {
    const response = await axios.post(baseURL + "tasks", variables);

    return response;
  },
});
