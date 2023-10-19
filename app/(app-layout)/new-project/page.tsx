import CreateProject from "@/components/views/CreateProject";

export default async function Page() {
  return (
    <div
      style={{
        padding: 24,
        minHeight: 500,
        maxHeight: 500,
        backgroundColor: "white",
      }}
    >
      <CreateProject />
    </div>
  );
}
