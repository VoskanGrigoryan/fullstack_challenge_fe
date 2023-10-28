import { Paper } from "@mantine/core";

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
      <Paper shadow="md" radius="sm" p="xl">
        {children}
      </Paper>
    </div>
  );
}
