"use client";

import CButton from "@/components/ui/Button";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { baseURL } from "@/config/api";
import { useRouter } from "next/navigation";

type IFormInputs = {
  title: string;
  description: string;
  owner_user_id: number;
};

type NotificationType = "success" | "info" | "warning" | "error";

interface IProject {
  title: string;
  description: string;
  owner_user_id: number;
}

export default function NewProjectForm({ api }: any) {
  const router = useRouter();

  const { handleSubmit, control } = useForm<IFormInputs>();

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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    data.owner_user_id = 2;

    mutate({ data });
  };

  const { mutate, isLoading, isError } = useMutation<
    AxiosResponse<IProject>,
    AxiosError<any>,
    { data: IProject }
  >({
    mutationFn: async ({ data }) => {
      const project = await axios
        .post(baseURL + "projects", data)
        .catch(function (error) {
          console.log(error);
          openNotificationWithIcon("error", error.code, error.message);
          return error;
        });

      router.push("/dashboard");
      return project;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            maxLength={100}
            addonBefore="Project title"
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
            placeholder="Short description of the project, what are the objectives and core ideas"
            autoSize={{ minRows: 8, maxRows: 5 }}
          />
        )}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: 20 }}>
          <CButton htmlType="submit" type="primary">
            Create project
          </CButton>
        </div>
      </div>
    </form>
  );
}
