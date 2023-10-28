import { useRouter } from "next/navigation";
import { Menu, rem } from "@mantine/core";
import { IconSwitch, IconFilePlus, IconMenu2 } from "@tabler/icons-react";

export default function CustomMenu({
  id,
  showCompletedTask,
  setShowCompletedTask,
}: {
  id: string;
  showCompletedTask: any;
  setShowCompletedTask: any;
}) {
  const router = useRouter();

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <IconMenu2 style={{ cursor: "pointer" }} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            router.push("/new-task/" + id);
          }}
          leftSection={
            <IconFilePlus style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Create new task
        </Menu.Item>
        <Menu.Item
          onClick={() => setShowCompletedTask(!showCompletedTask)}
          leftSection={
            <IconSwitch style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Toggle completed tasks
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
