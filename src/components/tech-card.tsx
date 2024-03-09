import Image from "next/image";

export default function TechnologyCard() {
  return (
    <div className="flex h-full max-h-24 w-full max-w-24 snap-center items-center justify-center rounded-lg bg-gray-50 p-3 shadow dark:bg-gray-900">
      <Image
        src="/technologies/tech.png"
        alt="Technology Image"
        width={76}
        height={76}
        className="max-h-[76px] max-w-[76px]"
      />
    </div>
  );
}
