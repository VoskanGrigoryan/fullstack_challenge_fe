"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTask } from "@/services/useCreateTask";
import CustomButton from "../ui/Button";
import {
  Group,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Select,
} from "@mantine/core";
import { schema } from "@/schemas";
import { ITask } from "@/interfaces";

export default function NewTask() {
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

  const mutation = useCreateTask({
    onSettled: (data, error) => {
      if (data) {
        router.push("/project/" + params.id);
      }

      if (error) {
      }
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 48 }}>
      <Group
        justify="space-between"
        mb={"md"}
        style={{ backgroundColor: "white", padding: 12, borderRadius: 4 }}
      >
        <Text fw={500}>New task</Text>
        <Group grow wrap="nowrap">
          <CustomButton type="submit" style={{ width: 200 }}>
            Confirm
          </CustomButton>
          <CustomButton
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            Return
          </CustomButton>
        </Group>
      </Group>
      <SimpleGrid cols={2}>
        <div>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input.Wrapper
                style={{ marginBottom: 20 }}
                label="Task title"
                error={errors.title?.message ? errors.title?.message : ""}
              >
                <Input {...field} placeholder="Add MERN operations" />
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
        </div>
        <div>
          <Controller
            name="assigned_to"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input.Wrapper
                label="Assigned to"
                error={
                  errors.assigned_to?.message ? errors.assigned_to?.message : ""
                }
              >
                <Input {...field} placeholder="homero.simpson" />
              </Input.Wrapper>
            )}
          />

          <Controller
            name="severity"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                value={String(field.value)}
                error={errors.severity?.message ? errors.severity?.message : ""}
                label="Severity"
                data={["1", "2", "3", "4"]}
                mt="lg"
              />
            )}
          />

          <Controller
            name="task_type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                error={
                  errors.task_type?.message ? errors.task_type?.message : ""
                }
                {...field}
                label="Task type"
                data={["task", "bug", "issue"]}
                mt="lg"
              />
            )}
          />
        </div>
      </SimpleGrid>
    </form>
  );
}
