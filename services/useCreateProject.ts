import { baseURL } from "@/config/api";
import axios from "axios";
import { createMutation } from "react-query-kit";

type Variables = {
  title: string;
  description: string;
  owner_user_id: number;
};

export const useCreateProject = createMutation({
  mutationFn: async (variables: Variables) => {
    const response = await axios.post(baseURL + "projects", variables);

    return response;
  },
});
