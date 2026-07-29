import Header from "@/components/ui/Header";
import Hero from "@/components/ui/hero";
import ProgramsSection from "@/components/ui/programs-section";
import StatsSection from "@/components/ui/stats-section";
import TeamSection from "@/components/ui/team-section";
import CTASection from "@/components/ui/cta-section";
import Footer from "@/components/ui/footer";
import { FadeIn } from "@/components/animations/FadeIn";

export default function Home() {
    return (
        <div className="bg-zinc-50 font-sans antialiased">
            <Header/>
            <main>
                <Hero/>
                <FadeIn>
                    <ProgramsSection/>
                </FadeIn>
                <FadeIn>
                    <StatsSection/>
                </FadeIn>
                <FadeIn>
                    <TeamSection/>
                </FadeIn>
                <FadeIn>
                    <CTASection/>
                </FadeIn>
            </main>
            <Footer />
        </div>
    );
}
