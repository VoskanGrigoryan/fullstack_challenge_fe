interface Props {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-blue-400 px-4">
      {children}
    </div>
  );
}
