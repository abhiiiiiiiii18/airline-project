import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import DestinationsSection from "../components/home/DestinationsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ReviewsSection from "../components/home/ReviewsSection";
import FooterSection from "../components/home/FooterSection";

export default function Home() {
  return (
    <Box className="w-full flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <HowItWorksSection />
      <ReviewsSection />
      <FooterSection />
    </Box>
  );
}
