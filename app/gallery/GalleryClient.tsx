'use client';

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import GalleryCard from "@/components/ui/gallery-card";
import PageJumbo from "@/components/ui/PageJumbo";
import { useGalleryEvents, FormattedGalleryEvent } from "@/hooks/useGallery";

interface GalleryClientProps {
  initialEvents: FormattedGalleryEvent[];
}

export default function GalleryClient({ initialEvents }: GalleryClientProps) {
  const { data: events = initialEvents, isLoading } = useGalleryEvents(initialEvents);

  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />
      <PageJumbo
        title="Gallery"
        description="A collection of our events and activities."
      />
      <section className="py-16 md:py-24" data-testid="section-events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && events.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 font-medium">
              No gallery events found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <GalleryCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  coverImage={event.coverImage}
                  photoCount={event.photoCount}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
