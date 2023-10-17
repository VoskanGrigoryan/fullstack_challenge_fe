"use client";

import { Input, Mentions, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CButton from "../ui/Button";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type IFormInputs = {
  title: string;
  description: string;
  assigned_to: string;
  severity: number;
  project_id: number;
  owner_user_id: number;
  task_type: string;
  active: boolean;
};

type NotificationType = "success" | "info" | "warning" | "error";

interface ITask {
  title: string;
  description: string;
  assigned_to: string;
  severity: number;
  task_type: string;
}

const { Title } = Typography;

export default function NewTaskForm({ api }: any) {
  const params = useParams();
  const router = useRouter();

  const { handleSubmit, control } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // if(typeof params.id === "string") {
    //     parseInt(params.id)
    // }

    data.project_id = parseInt(params.id as string);
    data.owner_user_id = 2;
    data.active = true;

    mutate({ data });
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    title?: string,
    description?: string
  ) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const { mutate, isLoading, isError } = useMutation<
    AxiosResponse<ITask>,
    AxiosError<any>,
    { data: ITask }
  >({
    mutationFn: async ({ data }) => {
      const project = await axios
        .post(baseURL + "tasks", data)
        .catch(function (error) {
          console.log(error);
          openNotificationWithIcon("error", error.code, error.message);
          return error;
        });

      router.push("/project/" + params.id);
      return project;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "table", clear: "both" }}
    >
      <div style={{ float: "left", marginBottom: 20 }}>
        <Title level={3}>Task creation</Title>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              maxLength={100}
              addonBefore="Task title"
              placeholder="Title"
              style={{ marginBottom: "12px" }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextArea
              {...field}
              maxLength={500}
              style={{ marginBottom: "12px" }}
              placeholder="Short description of the task, what are the objectives and core ideas"
              autoSize={{ minRows: 8, maxRows: 5 }}
            />
          )}
        />

        <CButton htmlType="submit" type="primary">
          Create task
        </CButton>
      </div>

      <div
        style={{
          float: "left",
          marginLeft: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ width: 120, marginTop: 40 }}>Assigned to:</p>
        <Controller
          name="assigned_to"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Mentions
              {...field}
              style={{ width: "100%" }}
              defaultValue=""
              options={[
                {
                  value: "voskan.grigoryan",
                  label: "voskan.grigoryan",
                },
                {
                  value: "homero.simpson",
                  label: "homero.simpson",
                },
                {
                  value: "marge.simpson",
                  label: "marge.simpson",
                },
              ]}
            />
          )}
        />

        <p style={{ marginTop: 18 }}>Severity:</p>
        <Controller
          name="severity"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue=""
              style={{ width: "full" }}
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
              ]}
            />
          )}
        />

        <p style={{ marginTop: 18 }}>Task type:</p>
        <Controller
          name="task_type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue=""
              style={{ width: "full" }}
              options={[
                { value: "task", label: "Task" },
                { value: "bug", label: "Bug" },
                { value: "issue", label: "Issue" },
              ]}
            />
          )}
        />
      </div>
    </form>
  );
}
