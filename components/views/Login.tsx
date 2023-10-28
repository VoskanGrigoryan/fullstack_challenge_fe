/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas";
import { Text, Input, PasswordInput } from "@mantine/core";
import { IconKey, IconUser } from "@tabler/icons-react";
import { IFormLogin } from "@/interfaces";
import CustomButton from "@/components/ui/Button";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [userData, setUserData] = useState<IFormLogin>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    setUserData(data), router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input.Wrapper
            mb="sm"
            label="Username"
            error={errors.username?.message ? errors.username?.message : ""}
          >
            <Input
              {...field}
              placeholder="marge.simpson"
              leftSection={<IconUser size={16} />}
            />
          </Input.Wrapper>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Password"
            error={errors.password?.message ? "error" : ""}
            placeholder="User password"
            leftSection={<IconKey size={16} />}
          />
        )}
      />

      <CustomButton type="submit" style={{ marginTop: 20 }}>
        Login
      </CustomButton>
      <Text size="sm" mt="sm">
        Don't have an account yet? <Link href="/auth/register">Register</Link>
      </Text>
    </form>
  );
}
