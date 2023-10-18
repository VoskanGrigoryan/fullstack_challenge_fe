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
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TaskMenu from "@/components/ui/menus/tasks";
import TaskType from "@/components/util/TaskType";
import useGetProjectById from "@/services/useGetProject";
import { useDeleteTaskById } from "@/services/useDeleteTask";
import useGetTasks from "@/services/useGetTasks";
import CBreadCrumb from "@/components/ui/Breadcrumb";
import { useCompleteTask } from "@/services/useCompleteTask";

const { Title } = Typography;

export default function Project() {
  const router = useRouter();
  const params = useParams();

  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const variables = { id: params.id };

  const project = useGetProjectById({ variables });
  const tasks = useGetTasks({ variables });

  const deleteMutation = useDeleteTaskById({
    onSuccess: () => {
      message.success("Task deleted successfully! :)");
      tasks.refetch();
    },
  });

  //Get -> useQuery
  //post, delete, patch -> useMutation | cualquier peticion qeu no trae info

  const completeMutation = useCompleteTask({
    onSuccess: () => {
      message.success("Task completed successfully! :)");
      tasks.refetch();
    },
  });

  const nonCompletedTasks = tasks.data?.filter((item) => item.active === true);
  const completedTasks = tasks.data?.filter((item) => item.active === false);

  const referenceUrl = `/project/${params.id}`;

  if (tasks.isError || tasks.data?.length === 0) {
    return (
      <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CBreadCrumb
            referenceUrl={referenceUrl}
            projectTitle={project.data?.title}
          />
          <TaskMenu
            id={params.id as string}
            showCompletedTask={showCompletedTask}
            setShowCompletedTask={setShowCompletedTask}
          />
        </div>

        <Empty />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CBreadCrumb
          referenceUrl={referenceUrl}
          projectTitle={project.data?.title}
        />
        <TaskMenu
          id={params.id as string}
          showCompletedTask={showCompletedTask}
          setShowCompletedTask={setShowCompletedTask}
        />
      </div>
      <Skeleton loading={tasks.isLoading}>
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
                        completeMutation.mutate({
                          id: item.id,
                          title: item.title,
                          description: item.description,
                          assigned_to: item.assigned_to,
                          due_date: item.due_date,
                          severity: item.severity,
                          project_id: item.project_id,
                          active: false,
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
                        // deleteMutation.mutate({ selectedItemId: item.id });
                        deleteMutation.mutate({
                          id: item.id,
                        });
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
  );
}
