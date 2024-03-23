import "@/app/globals.css";
import Container from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex h-screen flex-1 items-center justify-center">
      <p className="text-gray-500">Oops! Page not found.</p>
      <h2 className="text-5xl text-primary">404</h2>
    </Container>
  );
}
