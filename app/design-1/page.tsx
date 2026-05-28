import Hero from "./_components/Hero";
import Programs from "./_components/Programs";
import About from "./_components/About";
import Testimonials from "./_components/Testimonials";
import Gallery from "./_components/Gallery";
import Booking from "./_components/Booking";
import Footer from "./_components/Footer";

export default function Design1Page() {
  return (
    <main className="flex-1">
      <Hero />
      <Programs />
      <About />
      <Testimonials />
      <Gallery />
      <Booking />
      <Footer />
    </main>
  );
}
