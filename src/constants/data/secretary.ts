import { TRequest } from '@/types/global';

export const getAllRequests = async (): Promise<TRequest[]> => {
  await new Promise((res) => setTimeout(res, 2500));
  return [
    {
      id: 'abc123',
      type: 'COURSE_TRANSFER',
      status: 'PENDING',
      reason: 'Prefiro Engenharia Informática',
      adminNote: null,
      createdAt: '2025-03-10T09:00:00Z',
      student: {
        studentId: 'EST001',
        name: 'João Silva',
        profileImage: '/avatar-4.jpeg',
      },
      semester: { title: '1º Semestre', year: '2025' },
      details: {
        from: 'Ciência da Computação',
        to: 'Engenharia Informática',
      },
    },
    {
      id: 'def456',
      type: 'SHIFT_TRANSFER',
      status: 'APPROVED',
      reason: 'Trabalho de manhã',
      adminNote: null,
      createdAt: '2025-03-11T10:00:00Z',
      student: {
        studentId: 'EST002',
        name: 'Maria Santos',
        profileImage: '/avatar-1.jpg',
      },
      semester: { title: '1º Semestre', year: '2025' },
      details: {
        from: 'LCC2M (Manhã)',
        to: 'LCC2T (Tarde)',
      },
    },
  ];

  //
};
