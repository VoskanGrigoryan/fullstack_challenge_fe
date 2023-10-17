/* eslint-disable react/no-unescaped-entities */
"use client";

import AuthContainer from "@/components/containers/AuthContainer";
import CButton from "@/components/ui/Button";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import { Input, Typography } from "antd";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type IFormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

interface FormInputs {
  singleErrorInput: string;
}

const { Text } = Typography;

export default function Login() {
  const { handleSubmit, control, watch } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {};

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
          name="email"
          control={control}
          rules={{
            required: "This is not a valid email",
            pattern: /^\S+@\S+$/i,
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Email"
              style={{ marginBottom: "12px" }}
              prefix={<MailOutlined />}
            />
          )}
        />

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
              placeholder="Password"
              style={{ marginBottom: "12px" }}
              prefix={<KeyOutlined />}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: true,
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Confirm password"
              style={{ marginBottom: "12px" }}
              prefix={<KeyOutlined />}
            />
          )}
        />

        <CButton htmlType="submit" type="primary">
          Register
        </CButton>

        <Text style={{ marginTop: "12px", textAlign: "center" }}>
          Already have an account? <Link href="/auth/login">Login</Link>
        </Text>
      </form>
    </AuthContainer>
  );
}
