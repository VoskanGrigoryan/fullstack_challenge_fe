"use client";

import { notification } from "antd";

import NewProjectForm from "@/components/forms/new-project";

export default function NewProject() {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <div
        style={{
          padding: 24,
          minHeight: 500,
          maxHeight: 500,
          backgroundColor: "white",
        }}
      >
        <NewProjectForm api={api} />
      </div>
    </>
  );
}
