"use client";

import Container from "@/components/containers/Container";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
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
} from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { baseURL } from "@/config/api";
import { useParams } from "next/navigation";

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
}

const { Title } = Typography;

export default function Project() {
  const params = useParams();

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
  const { mutate } = useMutation<
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

  // console.log(tasks.data?.data);
  const referenceUrl = `/project/${params.id}`;

  const BreadCrumb = () => {
    return (
      <Breadcrumb
        items={[
          {
            title: <a href="/home">Dashboard</a>,
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
      <Container>
        <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
          <BreadCrumb />
          <Empty />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
        <BreadCrumb />
        <Skeleton loading={isLoading}>
          <Title level={3}>{}</Title>
          <Row gutter={16}>
            {tasksData?.map((item: any, key: number) => {
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
                    actions={[
                      <Popconfirm
                        key="done"
                        title="Complete task"
                        description="Are you sure you want complete the task?"
                        okText="Yes"
                        onConfirm={() => {
                          message.success("Task completed successfully! :)");
                          mutate({ selectedItemId: item.id });
                        }}
                        cancelText="No"
                      >
                        <CheckCircleOutlined key="done" />,
                      </Popconfirm>,

                      <EditOutlined key="edit" />,
                      <Popconfirm
                        key="delete"
                        title="Delete the task"
                        description="Are you sure you want to delete the task?"
                        okText="Yes"
                        onConfirm={() => {
                          message.success("Task deleted successfully");
                          mutate({ selectedItemId: item.id });
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
        </Skeleton>
      </div>
    </Container>
  );
}
