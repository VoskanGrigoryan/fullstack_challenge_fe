import { Title } from "@mantine/core";
// import { IconFileX } from "@tabler/icons-react";

export default function NoData() {
  return (
    <div
      style={{
        height: "",
        zIndex: 40,
        top: "20%",
        right: "35%",
        position: "absolute",
        display: "flex",
      }}
    >
      <Title order={3}>No data found</Title>
      {/* <IconFileX stroke={1.5} style={{ fontSize: 30 }} /> */}
    </div>
  );
}
