"use client";

import { Input, Mentions, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CButton from "../ui/Button";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateTask } from "@/services/useCreateTask";
import { notification } from "antd";
import { Col, Row } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface ITask {
  title: string;
  description: string;
  assigned_to: string;
  severity: number;
  task_type: string;
}

const { Title } = Typography;

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    assigned_to: yup.string().required("assigned to is a required field"),
    severity: yup.number().positive().integer().required(),
    task_type: yup.string().required("task type is a required field"),
  })
  .required();

export default function NewTask() {
  const [api, contextHolder] = notification.useNotification();

  const params = useParams();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITask>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ITask> = (values) => {
    mutation.mutate({
      ...values,
      active: true,
      owner_user_id: 2,
      project_id: parseInt(params.id as string),
    });
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

  const mutation = useCreateTask({
    onSettled: (data, error) => {
      if (data) {
        router.push("/project/" + params.id);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      <Title level={2}>Create new task</Title>
      <Row gutter={48}>
        <Col xs={24} md={12} lg={12} xl={12}>
          {" "}
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
                placeholder="Short description of the task, what are the objectives and core ideas"
                autoSize={{ minRows: 8, maxRows: 5 }}
              />
            )}
          />
          <p style={{ padding: 0, margin: 0, color: "red", marginBottom: 12 }}>
            {errors.description?.message}
          </p>
          <CButton htmlType="submit" type="primary">
            Create task
          </CButton>
        </Col>
        <Col xs={24} md={12} lg={12} xl={12}>
          <Controller
            name="assigned_to"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Mentions
                {...field}
                status={errors.assigned_to?.message ? "error" : ""}
                style={{ width: "100%" }}
                placeholder="@homero.simpson"
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

          <p style={{ padding: 0, margin: 0, color: "red", marginBottom: 12 }}>
            {errors.assigned_to?.message}
          </p>

          <p>Severity:</p>
          <Controller
            name="severity"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                status={errors.severity?.message ? "error" : ""}
                defaultValue=""
                style={{ width: "100%" }}
                options={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                ]}
              />
            )}
          />

          <p style={{ padding: 0, margin: 0, color: "red", marginBottom: 12 }}>
            {errors.severity?.message}
          </p>

          <p>Task type:</p>
          <Controller
            name="task_type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                status={errors.task_type?.message ? "error" : ""}
                defaultValue=""
                style={{ width: "100%" }}
                options={[
                  { value: "task", label: "Task" },
                  { value: "bug", label: "Bug" },
                  { value: "issue", label: "Issue" },
                ]}
              />
            )}
          />

          <p style={{ padding: 0, margin: 0, color: "red", marginBottom: 12 }}>
            {errors.task_type?.message}
          </p>
        </Col>
      </Row>
    </form>
  );
}