import AuthContainer from "@/components/containers/AuthContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContainer>{children}</AuthContainer>
    </>
  );
}
