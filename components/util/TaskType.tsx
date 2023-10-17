import {
  BugOutlined,
  ExperimentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

export default function TaskType({ task_type }: { task_type: string }) {
  if (task_type === "bug") {
    return (
      <Tooltip title="Bug">
        <BugOutlined style={{ color: "purple", fontSize: 20 }} />
      </Tooltip>
    );
  }

  if (task_type === "task") {
    return (
      <Tooltip title="Task">
        <ProfileOutlined style={{ color: "DodgerBlue", fontSize: 20 }} />
      </Tooltip>
    );
  }

  if (task_type === "issue") {
    return (
      <Tooltip title="Issue">
        <ExperimentOutlined style={{ color: "red", fontSize: 20 }} />
      </Tooltip>
    );
  }

  return <p>asdfasdf</p>;
}
