"use client";

import Container from "@/components/containers/Container";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

export default function Project() {
  return (
    <Container>
      <div style={{ padding: 24, minHeight: 500, backgroundColor: "white" }}>
        <Title level={3}>Project 0</Title>
        <Row gutter={16}>
          <Col lg={{ span: 8 }} xs={{ span: 24 }} style={{ marginBottom: 12 }}>
            <Card
              title={"1524 - Finish code challenge"}
              style={{ width: "auto" }}
              actions={[
                <CheckCircleOutlined key="done" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              Finish code challenge by end of week or suffer the consecuences
            </Card>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 24 }}>
            <Card
              title={"4325 - Ask Robby about code issue"}
              style={{ width: "auto" }}
              actions={[
                <CheckCircleOutlined key="done" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              Contact Robby thru email to ask about progress
            </Card>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 24 }}>
            <Card
              title={"3794 - Learn how to backend in one week"}
              style={{ width: "auto" }}
              actions={[
                <CheckCircleOutlined key="done" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              Learn how to use JWT, AUTH, NEST JS, ETC. God help me I need to
              sleep
            </Card>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 24 }}>
            <Card
              title={"8953 - Replace tailwind with antd"}
              style={{ width: "auto" }}
              actions={[
                <CheckCircleOutlined key="done" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              Waste even more time switching UI builders
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
