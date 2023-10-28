"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateProject } from "@/services/useCreateProject";
import { Input, Textarea, Paper } from "@mantine/core";
import CustomButton from "../ui/Button";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface IProject {
  title: string;
  description: string;
}

const schema = yup
  .object({
    title: yup.string().required().max(100).min(4),
    description: yup.string().required().max(500).min(2),
  })
  .required();

export default function CreateProject() {
  const router = useRouter();

  const mutation = useCreateProject({
    onSettled: (data, error) => {
      if (data) {
        //Refresh needed FOR SOME REASON so that tiles can be updated in dashboard
        router.refresh();
        router.push("/dashboard");
      }

      if (error) {
        notifications.show({
          autoClose: 3000,
          title: "There was an error",
          message: JSON.stringify(error.message),
          icon: <IconX />,
          loading: false,
          color: "red",
        });
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
    <Paper
      shadow="md"
      px="lg"
      py="xs"
      style={{ margin: 40, height: "fit-content" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input.Wrapper
              label="Project title"
              error={errors.title?.message ? errors.title?.message : ""}
            >
              <Input {...field} placeholder="Full stack project" />
            </Input.Wrapper>
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              style={{ marginTop: 20 }}
              {...field}
              minRows={6}
              maxRows={10}
              autosize
              error={
                errors.description?.message ? errors.description?.message : ""
              }
              label="Project description"
            />
          )}
        />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: 20, marginTop: 20 }}>
            <CustomButton type="submit" size="xs">
              Create project
            </CustomButton>
          </div>
        </div>
      </form>
    </Paper>
  );
}
