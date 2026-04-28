import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Image from "next/image";

interface ProgramCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    href: string;
}

export default function ProgramCard({ title, description, icon: Icon, image, href }: ProgramCardProps) {
    return (
        <Card className="overflow-hidden py-0 hover-elevate group" data-testid={`card-program-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            <div className="aspect-video relative overflow-hidden bg-zinc-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
