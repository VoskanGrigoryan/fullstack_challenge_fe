"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, PasswordInput, Text } from "@mantine/core";
import { IconUser, IconKey } from "@tabler/icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "@/components/ui/Button";
import { IFormInputs } from "@/interfaces";
import { registerSchema } from "@/schemas";

import Link from "next/link";

export default function Register() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: 300 }}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "This is not a valid email",
          pattern: /^\S+@\S+$/i,
        }}
        render={({ field }) => (
          <Input.Wrapper
            label="Email"
            mb="sm"
            error={errors.email?.message ? errors.email?.message : ""}
          >
            <Input {...field} placeholder="Email" />
          </Input.Wrapper>
        )}
      />

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
            mb="sm"
            error={errors.password?.message ? errors.password?.message : ""}
            placeholder="User password"
            leftSection={<IconKey size={16} />}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Confirm password"
            error={
              errors.confirmPassword?.message
                ? errors.confirmPassword?.message
                : ""
            }
            placeholder="User password"
            leftSection={<IconKey size={16} />}
          />
        )}
      />

      <CustomButton type="submit" mt="md">
        Register
      </CustomButton>

      <Text mt="sm" size="sm">
        Already have an account? <Link href="/auth/login">Login</Link>
      </Text>
    </form>
  );
}
