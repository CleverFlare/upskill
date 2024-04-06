import Container from "@/components/container";
import Logo from "@/components/logo";
import Login from "./_components/login";

export default async function Page() {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-[320px] flex-col gap-5">
        <Logo />
        <p className="text-3xl font-bold">Login</p>
        <Login />
      </div>
    </Container>
  );
}
