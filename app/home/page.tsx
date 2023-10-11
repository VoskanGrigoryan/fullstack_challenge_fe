import Container from "@/components/containers/Container";
import { CCard } from "@/components/ui/Card";
import { Row } from "antd";

export default function Home() {
  const num = [1, 2];
  return (
    <Container>
      <Row>
        <CCard amount={num} />
      </Row>
    </Container>
  );
}
