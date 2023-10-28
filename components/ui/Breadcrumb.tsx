import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";

export default function BreadCrumb({
  referenceUrl,
  projectTitle,
}: {
  referenceUrl: string;
  projectTitle: string | undefined;
}) {
  const items = [
    { title: "Dashboard", href: "/dashboard" },
    { title: projectTitle, href: referenceUrl },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return <Breadcrumbs>{items}</Breadcrumbs>;
}
