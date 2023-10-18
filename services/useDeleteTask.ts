import { baseURL } from "@/config/api";
import axios from "axios";
import { createMutation } from "react-query-kit";

interface Variables {
  id: number;
}

export const useDeleteTaskById = createMutation({
  mutationFn: async (variables: Variables) => {
    const response = await axios.delete(baseURL + "tasks/" + variables.id);

    return response;
  },
});
