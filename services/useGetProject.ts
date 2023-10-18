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

type Variables = { id: any };

const useGetProjectById = createQuery<Response, Variables, Error>({
  primaryKey: "projects",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    let response = await axios.get(baseURL + primaryKey + "/" + variables.id);
    return response.data;
  },
  suspense: true,
});

export default useGetProjectById;
