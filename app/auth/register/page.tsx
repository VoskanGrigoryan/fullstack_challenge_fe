"use client";

import AuthContainer from "@/components/containers/AuthContainer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type IFormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Login() {
  // const { register, handleSubmit, watch } = useForm<IFormInputs>();
  // const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  // console.log(register("username", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i }));

  //register es una funcion que devuelve un objeto
  return (
    <AuthContainer>
      <form className="bg-white p-8 rounded-md grid w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-3xl mb-8">AppSecure: Register</p>
        <Input type="text" placeholder="Email" {...register("email")} />
        <Input type="text" placeholder="Username" {...register("username")} />
        <Input type="password" placeholder="Password" {...register("password")} />
        <Input type="password" placeholder="Confirm password" {...register("confirmPassword")} />

        <input
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white hover:cursor-pointer"
        />
        <p className="underline mt-4 mx-16 text-center hover:cursor-pointer hover:text-blue-500">
          <Link href="/auth/login">Already have an account?</Link>
        </p>
      </form>
    </AuthContainer>
  );
}
