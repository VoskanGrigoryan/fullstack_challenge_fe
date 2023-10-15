/* eslint-disable react/no-unescaped-entities */
"use client";

import AuthContainer from "@/components/containers/AuthContainer";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
import CButton from "@/components/ui/Button";

type IFormInputs = {
  username: string;
  password: string;
};

const { Text } = Typography;

export default function Login() {
  const router = useRouter();

  const [userData, setUserData] = useState<IFormInputs>();

  const { handleSubmit, control } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setUserData(data), router.push("/dashboard");
  };

  //
  return (
    <AuthContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Username"
              style={{ marginBottom: "12px" }}
              prefix={<UserOutlined />}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="input password"
              style={{ marginBottom: "12px" }}
              prefix={<KeyOutlined />}
            />
          )}
        />

        <CButton htmlType="submit" type="primary">
          Login
        </CButton>

        <Text style={{ marginTop: "12px", textAlign: "center" }}>
          Don't have an account yet? <Link href="/auth/register">Register</Link>
        </Text>
      </form>
    </AuthContainer>
  );
}
