"use client";

import Container from "@/components/containers/Container";
import { useParams } from "next/navigation";

export default function EditItem() {
  const params = useParams();

  console.log(params);
  return <Container menuItem={"1"}>Edit</Container>;
}
