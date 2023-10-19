import EditTask from "@/components/views/EditTask";

export default function Page() {
  // const taskId = parseInt(params.id as string);

  return (
    <div
      style={{
        padding: 24,
        minHeight: 500,
        backgroundColor: "white",
      }}
    >
      <EditTask />
    </div>
  );
}
