import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

interface CTASectionProps {
    title?: string;
    description?: string;
    primaryAction?: { label: string; href: string };
    secondaryAction?: { label: string; href: string };
}

export default function CTASection({
                                       title = "Join Us in Making a Difference",
                                       description = "Your support helps us reach more communities, transform more lives, and build a more just society for all Nigerians.",
                                       primaryAction = { label: "Donate Now", href: "/donate" },
                                       secondaryAction = { label: "Contact Us", href: "/contact" },
                                   }: CTASectionProps) {
    return (
        <section className="py-20 bg-green-800" data-testid="section-cta">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-cta-title">
                    {title}
                </h2>
                <p className="mt-4 text-lg text-white/90 font-body max-w-2xl mx-auto">
                    {description}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link href={primaryAction.href}>
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 font-semibold"
                            data-testid="button-cta-primary"
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            {primaryAction.label}
                        </Button>
                    </Link>
                    <Link href={secondaryAction.href}>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/40 text-white bg-white/10 hover:bg-white/20"
                            data-testid="button-cta-secondary"
                        >
                            {secondaryAction.label}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
