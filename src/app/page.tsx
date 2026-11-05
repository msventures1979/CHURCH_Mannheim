import About from "@/components/About";
import Contact from "@/components/Contact";
import Coworking from "@/components/Coworking";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hall from "@/components/Hall";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Program from "@/components/Program";

// Stündlich neu erzeugen, damit vergangene Events verschwinden
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Coworking />
        <Hall />
        <Program />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
