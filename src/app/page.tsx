import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { News } from "@/components/sections/News";
import { Services } from "@/components/sections/Services";
import { Vision } from "@/components/sections/Vision";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* Hero stays pinned and recedes while About slides up over it */}
        <div className="relative">
          <Hero />
          <About />
        </div>
        <Services />
        <Vision />
        <News />
      </main>
      <Footer />
    </>
  );
}
