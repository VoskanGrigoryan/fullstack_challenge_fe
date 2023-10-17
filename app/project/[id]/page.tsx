"use client";

import Container from "@/components/containers/Container";
import {
  BugOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExperimentOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Row,
  Typography,
  Skeleton,
  Popconfirm,
  message,
  Empty,
  Breadcrumb,
  Tooltip,
  MenuProps,
  Dropdown,
} from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { baseURL } from "@/config/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TaskMenu from "@/components/ui/menus/tasks";
import TaskType from "@/components/util/TaskType";

interface IProject {
  id: number;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

interface ITasks {
  id: number;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  severity: number;
  project_id: number;
  active: boolean;
}

const { Title } = Typography;

export default function Project() {
  const router = useRouter();
  const params = useParams();

  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const fetchProject = async () => {
    const project = await axios.get(baseURL + "projects/" + params.id);

    return project;
  };

  const { isLoading, isError, data, error } = useQuery<
    AxiosResponse<IProject>,
    AxiosError<any>
  >({
    queryKey: ["project"],
    queryFn: fetchProject,
  });

  const fetchTasksByProjectId = async () => {
    const project = await axios.get(baseURL + "tasks/" + params.id);

    return project;
  };

  const tasks = useQuery<AxiosResponse<ITasks[]>, AxiosError<any>>({
    queryKey: ["tasks"],
    queryFn: fetchTasksByProjectId,
  });

  let tasksData = tasks.data?.data;

  // React Hook to use inside a component
  //Peticiones realizadas con useMutation no se cachean, funciones que interactua con un recurso

  //Get -> useQuery
  //post, delete, patch -> useMutation | cualquier peticion qeu no trae info
  const deleteMutation = useMutation<
    AxiosResponse<ITasks>,
    AxiosError<any>,
    { selectedItemId: number }
  >({
    mutationFn: async ({ selectedItemId }) => {
      const project = await axios.delete(baseURL + "tasks/" + selectedItemId);

      return project;
    },

    onSuccess: () => {
      tasks.refetch();
    },
  });

  const completeMutation = useMutation<
    AxiosResponse<ITasks>,
    AxiosError<any>,
    { selectedItemId: number; item: ITasks }
  >({
    mutationFn: async ({ selectedItemId, item }) => {
      // console.log(item);

      item.active = false;
      const project = await axios.patch(
        baseURL + "tasks/" + selectedItemId,
        item
      );

      return project;
    },

    onSuccess: () => {
      tasks.refetch();
    },
  });

  const nonCompletedTasks = tasksData?.filter((item) => item.active === true);
  const completedTasks = tasksData?.filter((item) => item.active === false);

  const referenceUrl = `/project/${params.id}`;

  const BreadCrumb = () => {
    return (
      <Breadcrumb
        items={[
          {
            title: <a href="/dashboard">Dashboard</a>,
          },
          {
            title: "Project",
          },
          {
            title: <a href={referenceUrl}>{data?.data.title}</a>,
          },
        ]}
      />
    );
  };

  if (isError || tasks.data?.data.length === 0) {
    return (
      <Container menuItem={"1"}>
        <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <BreadCrumb />
            <TaskMenu
              id={params.id as string}
              showCompletedTask={showCompletedTask}
              setShowCompletedTask={setShowCompletedTask}
            />
          </div>

          <Empty />
        </div>
      </Container>
    );
  }

  return (
    <Container menuItem={"1"}>
      <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <BreadCrumb />
          <TaskMenu
            id={params.id as string}
            showCompletedTask={showCompletedTask}
            setShowCompletedTask={setShowCompletedTask}
          />
        </div>
        <Skeleton loading={isLoading}>
          <Title level={3}>{}</Title>
          <Row gutter={12}>
            {nonCompletedTasks?.map((item: any, key: number) => {
              return (
                <Col
                  key={key}
                  lg={{ span: 8 }}
                  xs={{ span: 24 }}
                  style={{ marginBottom: 12 }}
                >
                  <Card
                    title={item.title}
                    style={{ width: "auto" }}
                    extra={<TaskType task_type={item.task_type} />}
                    actions={[
                      <Popconfirm
                        key="done"
                        title="Complete task"
                        description="Are you sure you want complete the task?"
                        okText="Yes"
                        onConfirm={() => {
                          message.success("Task completed successfully! :)");
                          completeMutation.mutate({
                            selectedItemId: item.id,
                            item,
                          });
                        }}
                        cancelText="No"
                      >
                        <CheckCircleOutlined key="done" />,
                      </Popconfirm>,

                      <EditOutlined
                        key="edit"
                        onClick={() => router.push("/edit-task/" + item.id)}
                      />,
                      <Popconfirm
                        key="delete"
                        title="Delete the task"
                        description="Are you sure you want to delete the task?"
                        okText="Yes"
                        onConfirm={() => {
                          message.success("Task deleted successfully");
                          deleteMutation.mutate({ selectedItemId: item.id });
                        }}
                        cancelText="No"
                      >
                        <DeleteOutlined key="delete" />
                      </Popconfirm>,
                    ]}
                  >
                    {item.description}
                  </Card>
                </Col>
              );
            })}
          </Row>

          {showCompletedTask ? (
            <Row gutter={12}>
              {completedTasks?.map((item: any, key: number) => {
                return (
                  <Col
                    key={key}
                    lg={{ span: 8 }}
                    xs={{ span: 24 }}
                    style={{ marginBottom: 12 }}
                  >
                    <Card
                      title={item.title}
                      style={{ width: "auto" }}
                      extra={<p>Completed</p>}
                    >
                      {item.description}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : null}
        </Skeleton>
      </div>
    </Container>
  );
}
