import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

export default function Page() {
  return (
    <Container className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-[450px] flex-col items-start gap-5">
        <h2 className="text-3xl font-bold">🎉 Successful Submission</h2>
        <p className="text-gray-500">
          Your registration request have been successfully submitted. We’ll send
          you an email if you’re approved or rejected, so keep an eye on your
          inbox.
        </p>
        <Button asChild>
          <Link href="/">
            <HiChevronLeft className="me-2 text-base" />
            Back to website
          </Link>
        </Button>
      </div>
    </Container>
  );
}
