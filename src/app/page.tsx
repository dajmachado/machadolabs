import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/effects/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Differentials from "@/components/sections/Differentials";
import Cases from "@/components/sections/Cases";
import Tech from "@/components/sections/Tech";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Differentials />
        <Cases />
        <Tech />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
