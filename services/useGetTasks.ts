import { baseURL } from "@/config/api";
import { createQuery } from "react-query-kit";
import axios from "axios";

interface Response {
  id: number;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  severity: number;
  project_id: number;
  active: boolean;
}

type Variables = { id: any };

const useGetTasks = createQuery<Response[], Variables, Error>({
  primaryKey: "tasks",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    let response = await axios.get(baseURL + primaryKey + "/" + variables.id);
    return response.data;
  },
  suspense: true,
});

export default useGetTasks;
