import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";


export default function Home() {
  return (
    <main className="text-red-700 bg-white text-5xl">
      <div>
        <FloatingNav navItems={navItems}/>
        <Hero/>
      </div>
   </main>
  );
}
