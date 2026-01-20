import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface CoreValueCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function CoreValueCard({ title, description, icon: Icon }: CoreValueCardProps) {
    return (
        <Card className="hover-elevate" data-testid={`card-value-${title.toLowerCase()}`}>
            <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-[#005F46]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground" data-testid={`text-value-title-${title.toLowerCase()}`}>
                    {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground font-body">{description}</p>
            </CardContent>
        </Card>
    );
}
