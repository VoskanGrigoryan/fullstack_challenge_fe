import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Popconfirm } from "antd";
import { useRouter } from "next/navigation";

export default function ProjectMenu({
  id,
  mutate,
}: {
  id: string;
  mutate: any;
}) {
  const router = useRouter();

  const items: MenuProps["items"] = [
    // {
    //   key: "1",
    //   icon: <EditOutlined />,
    //   label: <a href="/new">Edit project</a>,
    // },
    {
      key: "2",
      danger: true,
      icon: <DeleteOutlined />,
      label: (
        <Popconfirm
          title="Delete project"
          description="Are you sure to delete this project?"
          onConfirm={() => {
            mutate({ id });
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          Delete project
        </Popconfirm>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a>
        <SettingOutlined />
      </a>
    </Dropdown>
  );
}
