import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone } from "lucide-react";

interface TeamCardProps {
    name: string;
    position: string;
    qualification?: string;
    phone?: string;
    image?: string;
}

export default function TeamCard({ name, position, qualification, phone, image }: TeamCardProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

    return (
        <Card className="hover-elevate bg-white" data-testid={`card-team-${name.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardContent className="p-6 text-center">

                {image ? (
                    <img src={image} alt={name} className="w-20 h-20 object-cover border-2 border-zinc-300 rounded-full  mx-auto mb-4" />
                ) : (
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarFallback className="bg-green-900/10 text-primary text-xl font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                )}


                <h3 className="font-semibold text-foreground" data-testid={`text-team-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>
                    {name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">{position}</p>

                {qualification && (
                    <p className="text-xs text-muted-foreground font-body mt-2">{qualification}</p>
                )}

                {phone && (
                    <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span className="font-body">{phone}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
