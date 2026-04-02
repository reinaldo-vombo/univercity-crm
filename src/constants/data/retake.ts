import {
  RetakeAtaResponse,
  RetakeSectionItem,
  TAtaDiscipline,
  TExames,
} from '@/types/global';

export const getAllRetakes = async (): Promise<TExames[]> => {
  await new Promise((res) => setTimeout(res, 2500));
  return [
    {
      id: 'req_001',
      status: 'PAID',
      student: {
        id: 'stu_01',
        studentId: '2024001',
        name: 'João Silva',
        profileImage: '/avatar-3.jpeg',
      },
      discipline: {
        id: 'disc_01',
        name: 'Matemática',
      },
      course: {
        id: 'course_01',
        title: 'Engenharia Informática',
      },
      semester: {
        id: 'sem_01',
        title: '1º Semestre',
        year: '2026',
      },
      section: {
        id: 'sec_01',
        title: 'Turma A',
        shift: 'Manhã',
      },
      location: {
        building: 'Bloco A',
        room: '101',
        floor: '1',
      },
      date: new Date(),
      time: '08:00',
      payment: 'PAID',
    },
    {
      id: 'req_002',
      status: 'PENDING',
      student: {
        id: 'stu_02',
        studentId: '2024002',
        name: 'Maria Costa',
        profileImage: '/avatar-4.jpeg',
      },
      discipline: {
        id: 'disc_02',
        name: 'Física',
      },
      course: {
        id: 'course_02',
        title: 'Engenharia Civil',
      },
      semester: {
        id: 'sem_02',
        title: '2º Semestre',
        year: '2026',
      },
      section: {
        id: 'sec_02',
        title: 'Turma B',
        shift: '—',
      },
      location: {
        building: 'Por definir',
        room: 'Por definir',
        floor: '—',
      },
      date: new Date(),
      time: 'Por definir',
      payment: 'PENDING',
    },
  ];
};
export const getRetakeAtaData = async (): Promise<RetakeAtaResponse> => {
  await new Promise((res) => setTimeout(res, 2500));
  return {
    discipline: {
      id: 'disc_01',
      name: 'Matemática',
    },
    semester: {
      id: '01',
      title: '1º Semestre',
      year: 2026,
    },
    sections: [
      {
        section: {
          id: 'sec_01',
          title: 'Turma A',
          shift: 'Manhã',
        },
        course: {
          title: 'Engenharia Informática',
        },
        department: {
          id: 'o1',
          title: 'Departamento de Ciêncial Tecnólogicas e Engenharia',
        },
        students: [
          {
            number: 1,
            studentId: '2024001',
            name: 'João Manuel Silva',
            date: '2026-03-25',
            time: '08:00',
            location: {
              building: 'Bloco A',
              room: '101',
              floor: 1,
            },
          },
          {
            number: 2,
            studentId: '2024002',
            name: 'Maria Costa',
            date: '2026-03-25',
            time: '10:00',
            location: {
              building: 'Bloco A',
              room: '102',
              floor: 1,
            },
          },
        ],
      },
      {
        section: {
          id: 'sec_02',
          title: 'Turma B',
          shift: 'Tarde',
        },
        course: {
          title: 'Engenharia Informática',
        },
        department: {
          id: 'o1',
          title: 'Departamento de Ciêncial Tecnólogicas e Engenharia',
        },
        students: [
          {
            number: 1,
            studentId: '2024003',
            name: 'Carlos André',
            date: '2026-03-26',
            time: '—',
            location: {
              building: 'Por definir',
              room: 'Por definir',
              floor: null,
            },
          },
        ],
      },
    ],
  };
};
export const getRetakeSectionsByDiscipline = async (): Promise<
  RetakeSectionItem[]
> => {
  await new Promise((res) => setTimeout(res, 2500));
  return [
    {
      id: 'sec_01',
      title: 'Turma A',
      shift: 'Manhã',
    },
    {
      id: 'sec_02',
      title: 'Turma B',
      shift: 'Tarde',
    },
  ];
};
export const getAllAtaDataByCourse = async (): Promise<TAtaDiscipline[]> => {
  await new Promise((res) => setTimeout(res, 2500));
  return [
    {
      id: 'disc_01',
      name: 'Matemática',
    },
    {
      id: 'disc_02',
      name: 'Física',
    },
    {
      id: 'disc_03',
      name: 'Química',
    },
    {
      id: 'disc_04',
      name: 'Programação',
    },
  ];
};
