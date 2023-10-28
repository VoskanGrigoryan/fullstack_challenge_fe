"use client";

import { useRouter } from "next/navigation";
//redirect from next/navigate not working for some reason
import CustomButton from "@/components/ui/Button";
import { Text } from "@mantine/core";

export default function Custom404() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <CustomButton
          style={{ width: 200 }}
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Return to dashboard
        </CustomButton>
      </div>
    </div>
  );
}
