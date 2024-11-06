import { IntroScrollMouse } from "@/components/intro-scroll-mouse";
import { HeroSection } from "@/components/pages/home";

const HomePage = () => {
  return (
    <div className="relative grid h-[calc(100vh-64px)] place-content-center">
      <HeroSection />
      <div className="absolute inset-x-0 bottom-8 grid place-content-center md:bottom-12">
        <IntroScrollMouse />
      </div>
    </div>
  );
};

export default HomePage;

export const revalidate = 60;
