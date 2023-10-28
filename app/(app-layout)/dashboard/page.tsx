import NoData from "@/components/ui/NoData";
import Dashboard from "@/components/views/Dashboard";
import { baseURL } from "@/config/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const getProjects = async () => {
    const response = await fetch(`${baseURL}projects`, {
      cache: "no-cache",
    }).then((res) => res.json());

    if (response.statusCode === 404) {
      throw new Error("Failed to fetch data");
    }

    return response;
  };

  const data = await getProjects();

  if (data.length === 0) {
    return <NoData />;
  }

  return <Dashboard data={data} />;
}
