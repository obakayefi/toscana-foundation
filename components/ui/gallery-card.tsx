import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Image as ImageIcon } from "lucide-react";

interface GalleryCardProps {
    id: string;
    title: string;
    date: string;
    coverImage: string;
    photoCount: number;
}

export default function GalleryCard({ id, title, date, coverImage, photoCount }: GalleryCardProps) {
    return (
        <Link href={`/gallery/${id}`}>
            <Card className="overflow-hidden py-0 hover-elevate group cursor-pointer" data-testid={`card-gallery-${id}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white line-clamp-2" data-testid={`text-gallery-title-${id}`}>
                            {title}
                        </h3>
                    </div>
                </div>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-body">{date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ImageIcon className="w-4 h-4" />
                            <span className="font-body">{photoCount} photos</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
