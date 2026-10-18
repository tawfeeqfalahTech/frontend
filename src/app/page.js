import Navbar from "@/features/landing/Navbar";
import HeroSection from "@/features/landing/HeroSection";
import StatsSection from "@/features/landing/StatsSection";
import HowItWorksSection from "@/features/landing/HowItWorksSection";
import FeaturesSection from "@/features/landing/FeaturesSection";
import FeaturedProjectsSection from "@/features/landing/FeaturedProjectsSection";
import TestimonialsSection from "@/features/landing/TestimonialsSection";
import CtaBannerSection from "@/features/landing/CtaBannerSection";
import Footer from "@/features/landing/Footer";
import DevQuickAccess from "@/features/landing/DevQuickAccess";

export const metadata = {
  title: "إحياء - منصتك لإحياء الأفكار وتنمية الاستثمار",
  description:
    "سوق إلكتروني ذكي يربط رواد الأعمال بالمستثمرين المعتمدين محلياً وعالمياً، بدراسات جدوى وتقييمات مدعومة بالذكاء الاصطناعي.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#9E7F4D] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <HeroSection />

        {/* Counter Stats Bar */}
        <StatsSection />

        {/* How It Works (3 steps) */}
        <HowItWorksSection />

        {/* Features / Why Ihyaa (5 Pillars) */}
        <FeaturesSection />

        {/* Featured Projects / AI Evaluated Opportunities */}
        <FeaturedProjectsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Call To Action Banner */}
        <CtaBannerSection />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Floating Developer Navigation Helper */}
      <DevQuickAccess />
    </div>
  );
}
