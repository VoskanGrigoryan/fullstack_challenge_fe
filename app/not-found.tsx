"use client";

import { useRouter } from "next/navigation";
//redirect from next/navigate not working for some reason

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="bg-white h-screen w-screen justify-center items-center flex">
      <div className="p-12 w-fit h-fit rounded-md text-center">
        <p className="text-9xl">404</p>
        <p className="text-4xl mb-8">Page doesn't exist</p>

        <p
          className="hover:cursor-pointer hover:text-blue-700 text-blue-500 text-2xl"
          onClick={() => router.push("/home")}>
          Return home
        </p>
      </div>
    </div>
  );
}
