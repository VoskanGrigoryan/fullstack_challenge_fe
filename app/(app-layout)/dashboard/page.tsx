import Dashboard from "@/components/views/Dashboard";
import { baseURL } from "@/config/api";
import { Empty } from "antd";

export const dynamic = "force-dynamic";

export default async function Home() {
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
    return (
      <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
        <Empty />
      </div>
    );
  }

  return <Dashboard data={data} />;
}
