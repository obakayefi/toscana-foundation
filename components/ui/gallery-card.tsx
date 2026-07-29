import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Calendar, Image as ImageIcon, ArrowRight } from "lucide-react";
import { SmoothImage } from "@/components/ui/smooth-image";

interface GalleryCardProps {
    id: string;
    title: string;
    date: string;
    coverImage: string;
    photoCount: number;
}

export default function GalleryCard({ id, title, date, coverImage, photoCount }: GalleryCardProps) {
    return (
        <Link href={`/gallery/${id}`} className="block group">
            <Card className="relative h-[400px] overflow-hidden rounded-3xl border-0 shadow-2xl shadow-zinc-200/50 transition-all duration-500 hover:shadow-green-900/20 active:scale-[0.98]">
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0">
                    <SmoothImage
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Sophisticated Multi-layer Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="space-y-4">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                                <Calendar className="w-3 h-3 text-green-400" />
                                {date}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                                <ImageIcon className="w-3 h-3 text-green-400" />
                                {photoCount} Photos
                            </div>
                        </div>

                        {/* Title & Action */}
                        <div className="relative">
                            <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-green-400 transition-colors">
                                {title}
                            </h3>
                            <div className="flex items-center gap-2 text-green-400 font-bold text-sm transform -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                View Gallery <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/0 transition-colors group-hover:border-white/20" />
            </Card>
        </Link>
    );
}
