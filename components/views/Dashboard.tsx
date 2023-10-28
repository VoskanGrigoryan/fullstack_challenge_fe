/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import { Card, Text, SimpleGrid, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

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
          Are you sure you want to delete this project? This action is can't be
          undone
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      // onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        mutate({ id });
      },
    });

  return (
    <div style={{ padding: 48 }}>
      <SimpleGrid cols={3}>
        {data?.map((item: any, key: number) => {
          let itemId = item.id;
          return (
            <Card
              padding="lg"
              radius="md"
              withBorder
              style={{ width: "auto", minWidth: 250, maxWidth: 300 }}
              key={key}
            >
              <Group justify="space-between" mb="xs">
                <Text fw={600}>{item.title}</Text>

                <IconTrash
                  style={{ color: "salmon", cursor: "pointer" }}
                  stroke={1.5}
                  onClick={() => {
                    openModal({ id: itemId });
                  }}
                />
              </Group>

              <Text
                size="sm"
                style={{ cursor: "pointer", height: "auto" }}
                onClick={() => {
                  router.push(`/project/${itemId}`);
                }}
              >
                {item.description}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
