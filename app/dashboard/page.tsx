"use client";

import Container from "@/components/containers/Container";
import { CCard } from "@/components/ui/Card";
import { Card, Row, Empty } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { baseURL } from "@/config/api";

interface IProject {
  id: number;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const fetchProjects = async () => {
    const allProjects = await axios.get(baseURL + "projects");

    return allProjects;
  };

  const { isLoading, isError, data, error } = useQuery<
    AxiosResponse<IProject[]>,
    AxiosError<any>
  >({
    queryKey: ["projects"],
    refetchOnWindowFocus: false,
    queryFn: fetchProjects,
  });

  if (isError) {
    return (
      <Container menuItem={"1"}>
        <Empty />
      </Container>
    );
  }

  if (isError || data?.data.length === 0) {
    return (
      <Container menuItem={"1"}>
        <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
          <Empty />
        </div>
      </Container>
    );
  }

  return (
    <Container menuItem={"1"}>
      <div style={{ padding: 24, minHeight: 500 }}>
        <Row>
          {isLoading ? (
            <Card style={{ width: 300, marginTop: 16 }} loading={true}></Card>
          ) : (
            <CCard projects={data?.data} />
          )}
        </Row>
      </div>
    </Container>
  );
}
