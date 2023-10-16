"use client";

import Container from "@/components/containers/Container";
import EditTaskForm from "@/components/forms/edit-task";
import { useParams } from "next/navigation";
import { notification } from "antd";

export default function EditItem() {
  const params = useParams();

  const [api, contextHolder] = notification.useNotification();

  const taskId = parseInt(params.id as string);

  return (
    <Container menuItem={"1"}>
      {contextHolder}
      <div
        style={{
          padding: 24,
          minHeight: 500,
          maxHeight: 500,
          backgroundColor: "white",
        }}
      >
        <EditTaskForm api={api} taskId={taskId} />
      </div>
    </Container>
  );
}
