import { baseURL } from "@/config/api";
import axios from "axios";
import { createMutation } from "react-query-kit";

interface Variables {
  id: number;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  severity: number;
  project_id: number;
  active: boolean;
}

export const useCompleteTask = createMutation({
  mutationFn: async (variables: Variables) => {
    variables.active = false;
    const response = await axios.patch(
      baseURL + "tasks/" + variables.id,
      variables
    );

    return response;
  },
});
