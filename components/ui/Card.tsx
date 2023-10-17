import { Card, Dropdown, Modal } from "antd";
import { Col } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useState } from "react";
import ProjectMenu from "./menus/projectMenu";

export const CCard = ({ projects }: any) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    AxiosResponse<any>,
    AxiosError<any>,
    { id: number }
  >({
    mutationFn: async ({ id }) => {
      const project = await axios.delete(baseURL + "projects/" + id);

      return project;
    },

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      {projects?.map((item: any, key: number) => {
        let itemId = item.id;
        return (
          <Col key={key} lg={{ span: 7 }} md={{ span: 12 }} xs={{ span: 24 }}>
            <Card
              title={item.title}
              bordered={false}
              extra={<ProjectMenu id={itemId} mutate={mutate} />}
              style={{
                width: "300px",
                maxHeight: "400px",
                margin: 10,
              }}
              key={key}
            >
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`/project/${itemId}`);
                }}
              >
                {item.description}
              </p>
            </Card>
          </Col>
        );
      })}
    </>
  );
};
