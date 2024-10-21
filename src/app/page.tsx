import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src="/image.jpg" width={500} height={500} alt={""} />
    </div>
  );
}
