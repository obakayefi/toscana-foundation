import {WavyBackground} from "@/components/ui/wavy-background";
import Image from "next/image";
import {Wavefont} from "next/dist/compiled/@next/font/dist/google";
import {AuroraBackground} from "@/components/ui/aurora-background";
import {AuroraBackgroundDemo} from "@/app/AuroraBackground";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/hero";
import About from "@/app/about/page";
import ProgramsSection from "@/components/ui/programs-section";
import StatsSection from "@/components/ui/stats-section";
import TeamSection from "@/components/ui/team-section";
import CTASection from "@/components/ui/cta-section";
import Footer from "@/components/ui/footer";

export default function Home() {
    return (
        <div className={"bg-white"}>
            <Header/>
            <main>
                <Hero/>
                {/*<AboutSection/>*/}
                <ProgramsSection/>
                <StatsSection/>
                <TeamSection/>
                <CTASection/>
            </main>
            <Footer />
        </div>
    );
}
