import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import Partners from "./_components/Partners";
import Programs from "./_components/Programs";
import About from "./_components/About";
import Offer from "./_components/Offer";
import Pricing from "./_components/Pricing";
import Testimonials from "./_components/Testimonials";
import Booking from "./_components/Booking";
import Footer from "./_components/Footer";

export default function Design2Page() {
  return (
    <main className="flex-1 overflow-hidden">
      <Nav />
      <Hero />
      <Partners />
      <Programs />
      <About />
      <Offer />
      <Pricing />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
