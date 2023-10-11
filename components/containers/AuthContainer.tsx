import { Card } from "antd";

interface Props {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#4096ff",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="Full Stack Application" style={{ width: 300 }}>
        {children}
      </Card>
    </div>
  );
}
