import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Heart, ArrowRight} from "lucide-react";
import heroImage from "@assets/generated_images/nigerian_community_farming_scene.png";

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center" data-testid="section-hero">
            <div
                className="absolute inset-0 bg-cover bg-top-left bg-no-repeat"
                style={{
                    backgroundImage: `
    linear-gradient(125deg, rgba(0, 97, 61, 0.55), rgba(0, 97, 61, 0.65), rgba(0, 97, 61, 0.75)),
    url('/projects/IMG_3841.jpg')
  `,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"/>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                        data-testid="text-hero-headline">
                        Restoring dignity.
                        <br/>
                        Empowering communities.
                        <br/>
                        <span className="text-white/90">Transforming Nigeria.</span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-white/90 font-body max-w-2xl"
                       data-testid="text-hero-subheadline">
                        Villa Toscana Community Development Foundation is committed to reshaping lives
                        through empowerment, health education, rights awareness, and humanitarian support.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link href="/donate">
                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
                                data-testid="button-hero-donate"
                            >
                                <Heart className="w-5 h-5 mr-2"/>
                                Donate Now
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white/20"
                                data-testid="button-hero-learn"
                            >
                                Learn Our Story
                                <ArrowRight className="w-5 h-5 ml-2"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
