import Container from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex h-full items-center justify-center">
      <h1 className="text-3xl font-bold">
        <span className="text-blue-600">404</span> - Not Found!
      </h1>
    </Container>
  );
}
