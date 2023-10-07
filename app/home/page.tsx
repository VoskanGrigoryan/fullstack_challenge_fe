import Container from "@/components/containers/Container";
import Card from "@/components/ui/Card";

export default function Home() {
  const num = [1, 2];
  return (
    <Container>
      <div className="lg:h-12 h-8">
        <p className="text-2xl px-4 lg:h-12 flex items-center">Projects</p>
        <hr className="h-px  mx-4 bg-gray-200 border-0"></hr>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:py-4 overflow-x-hidden overflow-y-auto lg:mt-2 px-2">
        <Card amount={num} />
      </div>
    </Container>
  );
}
