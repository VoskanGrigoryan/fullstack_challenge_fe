"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import { Grid, Card, Text, Badge, Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";

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

  const openModal = ({ id }: any) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log(id), mutate({ id });
      },
    });

  return (
    <div style={{ padding: 48 }}>
      <Grid>
        {data?.map((item: any, key: number) => {
          let itemId = item.id;
          return (
            <Grid.Col key={key} span={4}>
              {/* <Card
                title={item.title}
                bordered={false}
                extra={<ProjectMenu id={itemId} mutate={mutate} />}
                style={{
                  maxHeight: "400px",
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
              </Card> */}
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                withBorder
                style={{ width: 320 }}
              >
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{item.title}</Text>
                </Group>

                <Text
                  size="sm"
                  c="dimmed"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/project/${itemId}`);
                  }}
                >
                  {item.description}
                </Text>

                <Button
                  variant="light"
                  color="red"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => {
                    openModal(itemId);
                  }}
                >
                  Remove
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      {/* <Row>
        
      </Row> */}
    </div>
  );
}
