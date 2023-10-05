"use client";

import AuthContainer from "@/components/containers/AuthContainer";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type IFormInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [userData, setUserData] = useState<IFormInputs>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();
  // const onSubmit: SubmitHandler<IFormInputs> = (data) => setUserData(data);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setUserData(data), loginVerification();
  };

  // console.log(register("username", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i }));

  //register es una funcion que devuelve un objeto

  const loginVerification = () => {
    router.push("/home");
  };

  return (
    <AuthContainer>
      <form className="bg-white p-8 rounded-md grid w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-3xl mb-8">AppSecure: Login</p>
        <Input type="text" placeholder="Username" {...register("username")} />
        <Input type="password" placeholder="Password" {...register("password")} />
        <p className="mb-8">Forgot your password?</p>

        <input
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white hover:cursor-pointer"
        />
        <p className="underline mt-4 mx-16 text-center hover:cursor-pointer hover:text-blue-500">
          <Link href="/auth/register">I don't have an account</Link>
        </p>
      </form>
    </AuthContainer>
  );
}
