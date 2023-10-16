"use client";

import Container from "@/components/containers/Container";
import { notification } from "antd";

import NewTaskForm from "@/components/forms/new-task";

export default function NewTask() {
  const [api, contextHolder] = notification.useNotification();

  return (
    <Container menuItem={""}>
      {contextHolder}
      <div
        style={{
          padding: 24,
          minHeight: 500,
          maxHeight: 500,
          backgroundColor: "white",
        }}
      >
        <NewTaskForm />
      </div>
    </Container>
  );
}
