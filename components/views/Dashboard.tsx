"use client";

import { Card, Col, Row } from "antd";
import ProjectMenu from "../ui/menus/projectMenu";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useMutation } from "@tanstack/react-query";

type Response = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner_user_id: number | null;
};

export default function Dashboard({ data }: { data: Response[] }) {
  const router = useRouter();

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
      //Recarga la parte del ssr
      router.refresh();
    },
  });

  return (
    <div style={{ padding: 24, minHeight: 500 }}>
      <Row>
        {data?.map((item: any, key: number) => {
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
                  marginBottom: 10,
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
      </Row>
    </div>
  );
}
