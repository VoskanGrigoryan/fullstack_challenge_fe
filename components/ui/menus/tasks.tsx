import { useRouter } from "next/navigation";
import { Menu, rem } from "@mantine/core";
import {
  IconSwitch,
  IconFilePlus,
  IconMenu2,
  IconList,
  IconNotes,
} from "@tabler/icons-react";

export default function CustomMenu({
  viewType,
  setViewType,
  id,
  showCompletedTask,
  setShowCompletedTask,
}: {
  viewType: boolean;
  setViewType: any;
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
          onClick={() => {
            setViewType(!viewType);
          }}
          leftSection={
            viewType === true ? (
              <IconList style={{ width: rem(14), height: rem(14) }} />
            ) : (
              <IconNotes style={{ width: rem(14), height: rem(14) }} />
            )
          }
        >
          Switch view type
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
