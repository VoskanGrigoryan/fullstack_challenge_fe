"use client";

import { useEffect } from "react";
import Container from "@/components/containers/Container";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
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

  const tasks = useQuery<AxiosResponse<ITasks>, AxiosError<any>>({
    queryKey: ["tasks"],
    queryFn: fetchTasksByProjectId,
  });

  console.log(tasks.data?.data);
  let tasksData = tasks.data?.data;

  return (
    <Container>
      <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
        <Skeleton loading={isLoading}>
          <Title level={3}>{data?.data.title}</Title>
          <Row gutter={16}>
            {tasksData?.map((item: any, key: number) => {
              return (
                <>
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
                        <CheckCircleOutlined key="done" />,
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" />,
                      ]}
                    >
                      {item.description}
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Skeleton>
      </div>
    </Container>
  );
}
