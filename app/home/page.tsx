import Container from "@/components/containers/Container";
import Card from "@/components/ui/Card";

export default function Home() {
  const num = [1, 2, 3, 4];
  return (
    <Container>
      <div className="lg:h-24 h-8">
        <p className="lg:text-3xl text-2xl px-4 lg:pt-8">Projects</p>
        <hr className="h-px lg:my-8 mx-4 bg-gray-200 border-0"></hr>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:py-4 overflow-x-hidden overflow-y-auto lg:mt-12">
        <Card amount={num} />
      </div>
    </Container>
  );
}
