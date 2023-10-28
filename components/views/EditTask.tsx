"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
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

interface IFormInputs extends ITask {
  project_id: number;
  owner_user_id: number;
}

export default function EditTask() {
  const params = useParams();
  const router = useRouter();

  const taskId = parseInt(params.id as string);

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITask>({
    // If null or undefined replace for x
    values: {
      assigned_to: data?.data.assigned_to ?? "",
      description: data?.data.description ?? "",
      severity: data?.data.severity ?? 0,
      task_type: data?.data.task_type ?? "",
      title: data?.data.title ?? "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ITask> = (values) => {
    mutate({
      data: {
        ...values,
        owner_user_id: data?.data.owner_user_id ?? 0,
        project_id: data?.data.project_id ?? 0,
      },
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
          // openNotificationWithIcon("error", error.code, error.message);

          return error;
        });

      router.push("/project/" + data.project_id);
      return task;
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 48 }}>
      <Group
        justify="space-between"
        mb={"md"}
        style={{ backgroundColor: "white", padding: 12, borderRadius: 4 }}
      >
        <Text fw={500}>Edit task</Text>
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
