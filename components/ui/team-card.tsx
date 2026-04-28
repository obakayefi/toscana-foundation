import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Image from "next/image";

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
        <Card className="group relative overflow-hidden bg-white border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-[2.5rem] hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500" data-testid={`card-team-${name.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-green-100 rounded-full scale-110 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-32 h-32 border-4 border-white shadow-lg relative z-10 rounded-full overflow-hidden bg-zinc-100">
                        {image ? (
                            <Image 
                                src={image} 
                                alt={name} 
                                fill 
                                className="object-cover" 
                                sizes="128px"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                <User size={40} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-heading font-extrabold text-zinc-900 tracking-tight" data-testid={`text-team-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>
                        {name}
                    </h3>
                    <p className="text-sm font-bold text-green-700 uppercase tracking-widest">{position}</p>
                </div>

                {qualification && (
                    <div className="px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 mb-6">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter leading-tight">
                            {qualification}
                        </p>
                    </div>
                )}


            </CardContent>
        </Card>
    );
}
