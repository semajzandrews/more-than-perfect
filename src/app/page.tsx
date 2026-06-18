import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import MobileBook from "@/components/MobileBook";
import Hero from "@/components/Hero";
import TheRecord from "@/components/TheRecord";
import TheFade from "@/components/TheFade";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main>
        <Hero />
        <TheRecord />
        <TheFade />
        <Services />
        <Work />
        <Visit />
      </main>
      <Footer />
      <MobileBook />
    </>
  );
}
