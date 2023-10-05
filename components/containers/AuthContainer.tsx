interface Props {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500  px-4">
      {children}
    </div>
  );
}
