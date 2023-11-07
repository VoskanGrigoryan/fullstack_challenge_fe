"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TaskType from "@/components/util/TaskType";
import useGetProjectById from "@/services/useGetProject";
import { useDeleteTaskById } from "@/services/useDeleteTask";
import useGetTasks from "@/services/useGetTasks";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useCompleteTask } from "@/services/useCompleteTask";
import NoData from "../ui/NoData";
import CustomMenu from "@/components/ui/menus/tasks";
import {
  Skeleton,
  SimpleGrid,
  Group,
  Text,
  Card,
  List,
  ThemeIcon,
  Paper,
  Divider,
} from "@mantine/core";
import CustomButton from "../ui/Button";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconCircleDashed,
} from "@tabler/icons-react";

export default function Project() {
  const router = useRouter();
  const params = useParams();

  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const [viewType, setViewType] = useState(true);

  const variables = { id: params.id };

  const project = useGetProjectById({ variables });
  const tasks = useGetTasks({ variables });

  const deleteMutation = useDeleteTaskById({
    onSuccess: () => {
      notifications.show({
        autoClose: 3000,
        title: "Task deleted successfully",
        message: "",
        icon: <IconCircleCheckFilled />,
        loading: false,
        color: "blue",
      });
      tasks.refetch();
    },
  });

  //Get -> useQuery
  //post, delete, patch -> useMutation | cualquier peticion qeu no trae info

  const completeMutation = useCompleteTask({
    onSuccess: () => {
      notifications.show({
        autoClose: 3000,
        title: "Task completed successfully!",
        message: "",
        icon: <IconCircleCheckFilled />,
        loading: false,
        color: "green",
      });
      tasks.refetch();
    },
  });

  const nonCompletedTasks = tasks.data?.filter((item) => item.active === true);
  const completedTasks = tasks.data?.filter((item) => item.active === false);

  const referenceUrl = `/project/${params.id}`;

  const confirmModal = ({
    id,
    item,
    operationType,
  }: {
    id?: number;
    item: any;
    operationType: string;
  }) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        if (operationType === "done") {
          completeMutation.mutate({
            //Como todas las propiedades son iguales se puede hacer el ...
            ...item,
            active: false,
          });
        }

        if (operationType === "delete") {
          deleteMutation.mutate({
            id: item.id,
          });
        }
      },
    });

  if (tasks.isError || tasks.data?.length === 0) {
    return (
      <div style={{ padding: 48 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <BreadCrumb
            referenceUrl={referenceUrl}
            projectTitle={project.data?.title}
          />
          <CustomMenu
            viewType={viewType}
            setViewType={setViewType}
            id={params.id as string}
            showCompletedTask={showCompletedTask}
            setShowCompletedTask={setShowCompletedTask}
          />
        </div>

        <NoData />
      </div>
    );
  }

  return (
    <div style={{ padding: 48 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <BreadCrumb
          referenceUrl={referenceUrl}
          projectTitle={project.data?.title}
        />
        <CustomMenu
          viewType={viewType}
          setViewType={setViewType}
          id={params.id as string}
          showCompletedTask={showCompletedTask}
          setShowCompletedTask={setShowCompletedTask}
        />
      </div>
      {tasks.isLoading ? (
        <Skeleton height={50} circle mb="xl" />
      ) : (
        <>
          {viewType ? (
            <SimpleGrid cols={3}>
              {nonCompletedTasks?.map((item: any, key: number) => {
                return (
                  <Card shadow="md" radius="sm" withBorder key={key}>
                    <Group justify="space-between" mt="md" mb="xs">
                      <Group justify="space-between">
                        <Text fw={500}>{item.title}</Text>
                        <Text c="blue">[{item.severity}]</Text>
                      </Group>

                      <TaskType task_type={item.task_type} />
                    </Group>

                    <Text size="sm" c="dimmed" truncate="end">
                      {item.description}
                    </Text>

                    <Group grow wrap="nowrap" mt="md">
                      <CustomButton
                        variant="subtle"
                        onClick={() => {
                          confirmModal({ item, operationType: "done" });
                        }}
                      >
                        Done
                      </CustomButton>
                      <CustomButton
                        variant="subtle"
                        onClick={() => router.push("/edit-task/" + item.id)}
                      >
                        Edit
                      </CustomButton>
                      <CustomButton
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          confirmModal({ item, operationType: "delete" });
                        }}
                      >
                        Delete
                      </CustomButton>
                    </Group>
                  </Card>
                );
              })}
            </SimpleGrid>
          ) : (
            <div>
              {nonCompletedTasks?.map((item: any, key: number) => {
                return (
                  <Paper
                    key={key}
                    withBorder
                    shadow="md"
                    radius="xs"
                    p="xs"
                    style={{
                      display: "flex",
                    }}
                  >
                    <Text
                      size="sm"
                      fw={500}
                      style={{ marginRight: 20, width: "20%" }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      size="sm"
                      c="dimmed"
                      truncate="end"
                      style={{ width: "55%", display: "flex" }}
                    >
                      {item.description}
                    </Text>

                    <Text size="sm" c="blue" style={{ marginLeft: 4 }}>
                      [{item.severity}]
                    </Text>
                    <Divider
                      orientation="vertical"
                      style={{ marginRight: 4, marginLeft: 20 }}
                    />
                    <TaskType task_type={item.task_type} />

                    <Group
                      grow
                      wrap="nowrap"
                      style={{ width: "25%", marginLeft: 20 }}
                      gap="xs"
                    >
                      <Text
                        c="blue"
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          confirmModal({ item, operationType: "done" });
                        }}
                      >
                        Done
                      </Text>
                      <Text
                        size="sm"
                        style={{ cursor: "pointer" }}
                        c="blue"
                        onClick={() => router.push("/edit-task/" + item.id)}
                      >
                        Edit
                      </Text>
                      <Text
                        size="sm"
                        style={{ cursor: "pointer" }}
                        c="red"
                        onClick={() => {
                          confirmModal({ item, operationType: "delete" });
                        }}
                      >
                        Delete
                      </Text>
                    </Group>
                  </Paper>
                );
              })}
            </div>
          )}

          {showCompletedTask ? (
            <SimpleGrid cols={3}>
              {completedTasks?.map((item: any, key: number) => {
                return (
                  <Card
                    withBorder
                    key={key}
                    style={{ width: "auto", marginTop: 16 }}
                  >
                    <Group justify="space-between">
                      <Group justify="space-between" c="dimmed">
                        <Text fw={500}>{item.title}</Text>
                        <Text c="gray">[{item.severity}]</Text>
                      </Group>
                      <Text fw={500} c="blue">
                        Completed
                      </Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {item.description}
                    </Text>
                  </Card>
                );
              })}
            </SimpleGrid>
          ) : null}
        </>
      )}
    </div>
  );
}
