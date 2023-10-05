import { ComponentProps, Ref, forwardRef } from "react";

// type InputProps = ComponentProps<"input">;

interface InputProps extends ComponentProps<"input"> {
  // props: any;
}

export default forwardRef(function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  // console.log(props);

  return (
    <input
      className="shadow appearance-none border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
      {...props}
      ref={ref}
    />
  );
});
