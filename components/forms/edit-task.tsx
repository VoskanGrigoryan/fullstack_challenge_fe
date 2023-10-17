"use client";

import { Input, Mentions, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CButton from "../ui/Button";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

type IFormInputs = {
  title: string | undefined;
  description: string | undefined;
  assigned_to: string | undefined;
  severity: any | undefined;
  project_id: number | undefined;
  owner_user_id: number | undefined;
  task_type: string | undefined;
};

type NotificationType = "success" | "info" | "warning" | "error";

interface ITask {
  title: string;
  description: string;
  assigned_to: string;
  severity: undefined;
  task_type: string;
}

const { Title } = Typography;

export default function EditTaskForm({
  api,
  taskId,
}: {
  api: any;
  taskId: number;
}) {
  const router = useRouter();

  const fetchTaskData = async () => {
    const task = await axios.get(baseURL + "tasks/task/" + taskId);

    return task;
  };

  const { isLoading, isError, data, error } = useQuery<
    AxiosResponse<IFormInputs>,
    AxiosError<any>
  >({
    queryKey: ["task_to_update"],
    // refetchOnWindowFocus: false,
    queryFn: fetchTaskData,
  });

  const { handleSubmit, control } = useForm<IFormInputs>({
    values: {
      assigned_to: data?.data.assigned_to,
      description: data?.data.description,
      severity: data?.data.severity,
      task_type: data?.data.task_type,
      title: data?.data.title,
      project_id: data?.data.project_id,
      owner_user_id: data?.data.owner_user_id,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    // data.project_id = parseInt(params.id as string);
    // data.owner_user_id = 2;

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

  const { mutate } = useMutation<
    AxiosResponse<ITask>,
    AxiosError<any>,
    { data: IFormInputs }
  >({
    mutationFn: async ({ data }) => {
      const task = await axios
        .patch(baseURL + "tasks/" + taskId, data)
        .catch(function (error) {
          openNotificationWithIcon("error", error.code, error.message);

          return error;
        });

      //
      router.push("/project/" + data.project_id);
      return task;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "table", clear: "both" }}
    >
      <div style={{ float: "left", marginBottom: 20 }}>
        <Title level={4}>Edit task: </Title>
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

        <div>
          <CButton
            htmlType="submit"
            type="primary"
            style={{ marginBottom: 20 }}
          >
            Edit task
          </CButton>
          <CButton htmlType="reset" type="default">
            Cancel
          </CButton>
        </div>
      </div>

      <div
        style={{
          float: "left",
          marginLeft: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ width: 120, marginTop: 34 }}>Assigned to:</p>
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
