import { Breadcrumb } from "antd";

export default function CBreadCrumb({
  referenceUrl,
  projectTitle,
}: {
  referenceUrl: string;
  projectTitle: string | undefined;
}) {
  return (
    <Breadcrumb
      items={[
        {
          title: <a href="/dashboard">Dashboard</a>,
        },
        {
          title: <p>Project</p>,
        },
        {
          title: <a href={referenceUrl}>{projectTitle}</a>,
        },
      ]}
    />
  );
}
