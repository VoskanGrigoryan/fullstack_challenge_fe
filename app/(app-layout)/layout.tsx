import Container from "@/components/containers/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
