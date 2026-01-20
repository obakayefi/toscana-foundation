import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ProgramCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    href: string;
}

export default function ProgramCard({ title, description, icon: Icon, image, href }: ProgramCardProps) {
    return (
        <Card className="overflow-hidden hover-elevate group" data-testid={`card-program-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#005F46]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground" data-testid={`text-program-title-${title.toLowerCase().replace(/\s+/g, "-")}`}>
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground font-body line-clamp-2">
                            {description}
                        </p>
                        <Link
                            href={href}
                            className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline"
                            data-testid={`link-program-${title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
