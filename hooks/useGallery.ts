import { useQuery } from '@tanstack/react-query';

export interface GalleryImage {
  id: string;
  url: string;
  publicId: string;
  eventId?: string;
}

export interface FormattedGalleryEvent {
  id: string; // slug
  dbId?: string;
  title: string;
  date: string; // year
  description?: string;
  coverImage: string;
  photoCount: number;
  images?: GalleryImage[];
}

async function fetchGalleryEvents(): Promise<FormattedGalleryEvent[]> {
  const res = await fetch('/api/gallery');
  if (!res.ok) {
    throw new Error('Failed to fetch gallery events');
  }
  return res.json();
}

async function fetchGalleryEventBySlug(slug: string) {
  const res = await fetch(`/api/gallery/${slug}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch gallery event');
  }
  return res.json();
}

export function useGalleryEvents(initialData?: FormattedGalleryEvent[]) {
  return useQuery({
    queryKey: ['galleryEvents'],
    queryFn: fetchGalleryEvents,
    initialData,
  });
}

export function useGalleryEvent(slug: string, initialData?: any) {
  return useQuery({
    queryKey: ['galleryEvent', slug],
    queryFn: () => fetchGalleryEventBySlug(slug),
    initialData,
    enabled: !!slug,
  });
}
