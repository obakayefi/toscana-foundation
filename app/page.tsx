import {WavyBackground} from "@/components/ui/wavy-background";
import Image from "next/image";
import {Wavefont} from "next/dist/compiled/@next/font/dist/google";
import {AuroraBackground} from "@/components/ui/aurora-background";
import {AuroraBackgroundDemo} from "@/app/AuroraBackground";

export default function Home() {
    return (
        <div className={"bg-white"}>
            <AuroraBackgroundDemo />
        </div>
    );
}
