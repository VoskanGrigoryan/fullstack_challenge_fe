/* eslint-disable react/no-unescaped-entities */
"use client";

import AuthContainer from "@/components/containers/AuthContainer";
import CButton from "@/components/ui/Button";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IFormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

interface FormInputs {
  singleErrorInput: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const { Text } = Typography;

export default function Login() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
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
              status={errors.email?.message ? "error" : ""}
              {...field}
              placeholder="Email"
              style={{ marginTop: "12px" }}
              prefix={<MailOutlined />}
            />
          )}
        />

        <p style={{ padding: 0, margin: 0, color: "red" }}>
          {errors.email?.message}
        </p>

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
              placeholder="Password"
              style={{ marginTop: "12px" }}
              prefix={<KeyOutlined />}
            />
          )}
        />

        <p style={{ padding: 0, margin: 0, color: "red" }}>
          {errors.password?.message}
        </p>

        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input.Password
              {...field}
              status={errors.confirmPassword?.message ? "error" : ""}
              placeholder="Confirm password"
              style={{ marginTop: "12px" }}
              prefix={<KeyOutlined />}
            />
          )}
        />
        <p style={{ padding: 0, margin: 0, color: "red" }}>
          {errors.confirmPassword?.message}
        </p>

        <div style={{ marginTop: 20 }}>
          <CButton htmlType="submit" type="primary">
            Register
          </CButton>
        </div>

        <Text style={{ marginTop: "12px", textAlign: "center" }}>
          Already have an account? <Link href="/auth/login">Login</Link>
        </Text>
      </form>
    </AuthContainer>
  );
}
