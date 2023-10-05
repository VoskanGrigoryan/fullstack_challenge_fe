interface Props {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  console.log("hey");
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-blue-500 px-4">
      {children}
    </div>
  );
}
