import Navbar from "@/components/Navbar";
import Image from "next/image";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <h1>Data Embers</h1>
        <Timeline />
      </main>
    </div>
  );
}
