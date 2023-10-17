"use client";

import CButton from "@/components/ui/Button";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { baseURL } from "@/config/api";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInputs extends IProject {
  owner_user_id: number;
}

type NotificationType = "success" | "info" | "warning" | "error";

interface IProject {
  title: string;
  description: string;
}

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function NewProjectForm({ api }: any) {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProject>({ resolver: yupResolver(schema) });

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

  const onSubmit: SubmitHandler<IProject> = (values) => {
    // data.owner_user_id = 2;

    mutate({
      data: {
        ...values,
        owner_user_id: 2,
      },
    });
  };

  const { mutate, isLoading, isError } = useMutation<
    AxiosResponse<IProject>,
    AxiosError<any>,
    { data: IFormInputs }
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
        width: "50%",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Project creation</h2>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            status={errors.title?.message ? "error" : ""}
            maxLength={100}
            addonBefore="Project title"
            placeholder="Title"
          />
        )}
      />

      <p style={{ padding: 0, margin: 0, color: "red", marginBottom: 12 }}>
        {errors.title?.message}
      </p>

      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextArea
            {...field}
            status={errors.description?.message ? "error" : ""}
            maxLength={500}
            placeholder="Short description of the project, what are the objectives and core ideas"
            autoSize={{ minRows: 8, maxRows: 5 }}
          />
        )}
      />

      <p style={{ padding: 0, margin: 0, color: "red", marginBottom: 12 }}>
        {errors.description?.message}
      </p>

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
