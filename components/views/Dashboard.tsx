"use client";

import { Row } from "antd";
import { CCard } from "../ui/Card";

type Response = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner_user_id: number | null;
};

export default function Dashboard({ data }: { data: Response[] }) {
  return (
    <div style={{ padding: 24, minHeight: 500 }}>
      <Row>
        <CCard projects={data} />
      </Row>
    </div>
  );
}
