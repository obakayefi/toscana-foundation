import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'data.json');

export interface GalleryEvent {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  year: string;
  images: Array<{
    id: string;
    url: string;
    publicId: string;
  }>;
  createdAt: string;
}

export interface Beneficiary {
  id: string;
  type: 'academic' | 'youth';
  name: string;
  yearJoined: string;
  gender: string;
  img: string | null;
  grant?: string | null;
  schoolName?: string | null;
  course?: string | null;
  level?: string | null;
  craft?: string | null;
  equipmentGiven?: string | null;
  sortOrder: number;
  createdAt: string;
}

export interface AppData {
  galleryEvents: GalleryEvent[];
  beneficiaries: Beneficiary[];
  updatedAt: string;
}

export async function readData(): Promise<AppData> {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { galleryEvents: [], beneficiaries: [], updatedAt: new Date().toISOString() };
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return { galleryEvents: [], beneficiaries: [], updatedAt: new Date().toISOString() };
  }
}

export async function writeData(data: AppData): Promise<void> {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(DATA_FILE, content, 'utf-8');
  } catch (error) {
    console.error('Error writing data.json:', error);
    throw error;
  }
}
