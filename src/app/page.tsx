import Hero from "./components/HeroSection";
import About from "./components/About";
import Sections from "./components/Sections";
import Tagline from "./components/Tagline"
import Footer from "./components/Footer";
import FallingLeaves from "./components/AllingLeaves"
export default function Home() {
  return (
    <div>
      <FallingLeaves />
      <Hero />
      <About />
      <Sections />
      <Tagline />
      <Footer />
    </div>
  );
}
