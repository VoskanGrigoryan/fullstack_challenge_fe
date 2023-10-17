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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IFormInputs = {
  username: string;
  password: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const { Text } = Typography;

export default function Login() {
  const router = useRouter();

  const [userData, setUserData] = useState<IFormInputs>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

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
              status={errors.username?.message ? "error" : ""}
              placeholder="Username"
              style={{ marginTop: "12px" }}
              prefix={<UserOutlined />}
            />
          )}
        />

        <p style={{ padding: 0, margin: 0, color: "red" }}>
          {errors.username?.message}
        </p>

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input.Password
              {...field}
              status={errors.password?.message ? "error" : ""}
              placeholder="input password"
              style={{ marginTop: "12px" }}
              prefix={<KeyOutlined />}
            />
          )}
        />

        <p style={{ padding: 0, margin: 0, color: "red" }}>
          {errors.password?.message}
        </p>

        <div style={{ marginTop: 20 }}>
          <CButton htmlType="submit" type="primary">
            Login
          </CButton>
        </div>
        <Text style={{ marginTop: "12px", textAlign: "center" }}>
          Don't have an account yet? <Link href="/auth/register">Register</Link>
        </Text>
      </form>
    </AuthContainer>
  );
}
