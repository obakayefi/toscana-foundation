import { useQuery } from '@tanstack/react-query';

export interface Beneficiary {
  id: string;
  type: 'academic' | 'youth';
  name: string;
  yearJoined: string;
  gender: string;
  img?: string | null;
  grant?: string | null;
  schoolName?: string | null;
  course?: string | null;
  level?: string | null;
  craft?: string | null;
  equipmentGiven?: string | null;
  sortOrder: number;
  createdAt: string;
}

async function fetchScholarships(): Promise<Beneficiary[]> {
  const res = await fetch('/api/scholarships');
  if (!res.ok) {
    throw new Error('Failed to fetch scholarships');
  }
  return res.json();
}

export function useScholarships(initialData?: Beneficiary[]) {
  return useQuery({
    queryKey: ['scholarships'],
    queryFn: fetchScholarships,
    initialData,
  });
}
