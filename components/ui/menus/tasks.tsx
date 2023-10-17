import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";

export default function TaskMenu({
  id,
  showCompletedTask,
  setShowCompletedTask,
}: {
  id: string;
  showCompletedTask: any;
  setShowCompletedTask: any;
}) {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            router.push("/new-task/" + id);
          }}
        >
          Create new task
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p onClick={() => setShowCompletedTask(!showCompletedTask)}>
          Toggle completed tasks
        </p>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <p style={{ cursor: "pointer" }}>
        <MenuUnfoldOutlined style={{ fontSize: 20 }} />
      </p>
    </Dropdown>
  );
}
