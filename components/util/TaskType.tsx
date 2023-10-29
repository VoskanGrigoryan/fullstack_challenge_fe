import { IconBug, IconChecklist } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { IconAtom } from "@tabler/icons-react";

export default function TaskType({ task_type }: { task_type: string }) {
  if (task_type === "bug") {
    return (
      <Tooltip label="Bug">
        <IconBug style={{ color: "purple", fontSize: 20 }} />
      </Tooltip>
    );
  }

  if (task_type === "task") {
    return (
      <Tooltip label="Task">
        <IconChecklist style={{ color: "DodgerBlue", fontSize: 20 }} />
      </Tooltip>
    );
  }

  if (task_type === "issue") {
    return (
      <Tooltip label="Issue">
        <IconAtom style={{ color: "red", fontSize: 20 }} />
      </Tooltip>
    );
  }

  return <p>Generic</p>;
}
