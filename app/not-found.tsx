"use client";

import { useRouter } from "next/navigation";
//redirect from next/navigate not working for some reason
import { Result } from "antd";
import CButton from "@/components/ui/Button";

export default function Custom404() {
  const router = useRouter();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div style={{ width: 350 }}>
            <CButton
              onClick={() => {
                router.push("/dashboard");
              }}
              style={{ backgroundColor: "#4096ff" }}
            >
              Back Home
            </CButton>
          </div>
        }
      />
    </div>
  );
}
