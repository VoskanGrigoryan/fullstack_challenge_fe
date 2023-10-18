import { baseURL } from "@/config/api";
import { createQuery } from "react-query-kit";
import axios from "axios";

interface Response {
  id: number;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

const useGetProjects = createQuery<Response[], Error>({
  primaryKey: "projects",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    let response = await axios.get(baseURL + primaryKey);
    return response.data;
  },
  suspense: true,
});

export default useGetProjects;
