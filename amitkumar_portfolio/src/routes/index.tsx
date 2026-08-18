import { createFileRoute } from "@tanstack/react-router";
import {
  Loader,
  Cursor,
  Nav,
  Hero,
  AboutMe,
  FeaturedWork,
  Expertise,
  ArchitectureBreak,
  Process,
  Experience,
  Testimonials,
  About,
  Contact,
  Footer,
} from "@/components/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <Cursor />
      <main className="min-h-screen bg-background text-foreground overflow-x-clip">
        <Nav />
        <Hero />
        <AboutMe />
        <FeaturedWork />
        <Expertise />
        <Process />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
