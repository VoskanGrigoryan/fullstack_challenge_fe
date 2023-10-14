import { Card, Dropdown } from "antd";
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

export const CCard = ({ projects }: any) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <EditOutlined />,
      label: <a href="/new">Edit project</a>,
    },
    {
      key: "2",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Delete project",
    },
  ];

  const { mutate } = useMutation<
    AxiosResponse<any>,
    AxiosError<any>,
    { selectedItemId: number }
  >({
    mutationFn: async ({ selectedItemId }) => {
      const project = await axios.delete(
        baseURL + "projects/" + selectedItemId
      );

      return project;
    },

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["projects"] });
    },
  });

  const test = (itemId: number) => {
    mutate({ selectedItemId: itemId });
  };

  return (
    <>
      {projects?.map((item: any, key: number) => {
        let itemId = item.id;
        return (
          <Col key={key} lg={{ span: 7 }} md={{ span: 12 }} xs={{ span: 24 }}>
            <Card
              title={item.title}
              bordered={false}
              extra={
                <Dropdown
                  menu={{
                    items,
                    onClick: () => {
                      test(itemId);
                    },
                  }}
                  trigger={["click"]}
                >
                  <a>
                    <SettingOutlined />
                  </a>
                </Dropdown>
              }
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
