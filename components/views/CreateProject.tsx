"use client";

import CButton from "@/components/ui/Button";
import { Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateProject } from "@/services/useCreateProject";
import { notification } from "antd";

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

const { Title } = Typography;

export default function CreateProject() {
  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

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

  const mutation = useCreateProject({
    onSettled: (data, error) => {
      if (data) {
        //Refresh needed FOR SOME REASON so that tiles can be updated in dashboard
        router.refresh();
        router.push("/dashboard");
      }

      if (error) {
        openNotificationWithIcon(
          "error",
          "Error",
          "There was an error, try again"
        );
      }
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProject>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IProject> = (values) => {
    mutation.mutate({
      title: values.title,
      description: values.description,
      owner_user_id: 2,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      <Title level={3} style={{ marginBottom: 20 }}>
        Create new project
      </Title>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            status={errors.title?.message ? "error" : ""}
            maxLength={100}
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
