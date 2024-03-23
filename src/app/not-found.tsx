import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex h-screen flex-1 flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Oops! Page not found.</p>
      <h2 className="text-8xl font-bold text-primary">404</h2>
      <p className="text-gray-500">We can't find the page you're looking for.</p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}
