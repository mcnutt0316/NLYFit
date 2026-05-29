import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import Philosophy from "./_components/Philosophy";
import Programs from "./_components/Programs";
import About from "./_components/About";
import Pricing from "./_components/Pricing";
import Testimonials from "./_components/Testimonials";
import Gallery from "./_components/Gallery";
import Booking from "./_components/Booking";
import Footer from "./_components/Footer";

export default function Design3Page() {
  return (
    <main className="flex-1 overflow-hidden">
      <Nav />
      <Hero />
      <Philosophy />
      <Programs />
      <About />
      <Pricing />
      <Testimonials />
      <Gallery />
      <Booking />
      <Footer />
    </main>
  );
}
