"use client";

import Container from "@/components/containers/Container";
import { CCard } from "@/components/ui/Card";
import useGetProjects from "@/services/useGetProjects";
import { Card, Row, Empty } from "antd";

export default function Home() {
  const { data, isLoading, isError } = useGetProjects();

  if (isError || data?.length === 0) {
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
            <CCard projects={data} />
          )}
        </Row>
      </div>
    </Container>
  );
}
