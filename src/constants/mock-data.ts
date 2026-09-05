export const DUMMY_DATA = {
  sesson: [
    {
      id: '1',
      label: '1º semestre',
      value: '1º Semestre',
    },
    {
      id: '2',
      label: '2º semestre',
      value: '2º Semestre',
    },
  ],
  months: [
    {
      id: '1',
      label: 'Janeiro',
      value: 'Janeiro',
    },
    {
      id: '2',
      label: 'Fevereiro',
      value: 'Fevereiro',
    },
    {
      id: '3',
      label: 'Março',
      value: 'Março',
    },
    {
      id: '4',
      label: 'Abril',
      value: 'Abril',
    },
    {
      id: '5',
      label: 'Maio',
      value: 'Maio',
    },
    {
      id: '6',
      label: 'Junho',
      value: 'Junho',
    },
    {
      id: '7',
      label: 'Julho',
      value: 'Julho',
    },
    {
      id: '8',
      label: 'Agosto',
      value: 'Agosto',
    },
    {
      id: '9',
      label: 'Setembro',
      value: 'Setembro',
    },
    {
      id: '10',
      label: 'Outubro',
      value: 'Outubro',
    },
    {
      id: '11',
      label: 'Novembro',
      value: 'Novembro',
    },
    {
      id: '12',
      label: 'Dezembro',
      value: 'Decembro',
    },
  ],
  shifts: [
    {
      id: '1',
      label: 'Manhã',
      value: '1',
    },
    {
      id: '2',
      label: 'Tarde',
      value: '2',
    },
    {
      id: '3',
      label: 'Noite',
      value: '3',
    },
  ],
  shiftsNumber: [
    {
      id: '1',
      label: 'Manhã',
      value: 1,
    },
    {
      id: '2',
      label: 'Tarde',
      value: 2,
    },
    {
      id: '3',
      label: 'Noite',
      value: 3,
    },
  ],
  gender: [
    {
      id: '1',
      label: 'Masculino',
      value: 'masculino',
    },
    {
      id: '2',
      label: 'Feminino',
      value: 'feminino',
    },
  ],
  yearLevel: [
    {
      id: '1',
      label: '1',
      value: 'FIRST',
    },
    {
      id: '2',
      label: '2',
      value: 'SECOND',
    },
    {
      id: '3',
      label: '3',
      value: 'THIRD',
    },
    {
      id: '4',
      label: '4',
      value: 'FOURTH',
    },
    {
      id: '5',
      label: '5',
      value: 'FIFTH',
    },
  ],
  exameGrades: [
    { id: '1', label: '1', value: '1' },
    { id: '2', label: '2', value: '2' },
    { id: '3', label: '3', value: '3' },
    { id: '4', label: '4', value: '4' },
    { id: '5', label: '5', value: '5' },
    { id: '6', label: '6', value: '6' },
    { id: '7', label: '7', value: '7' },
    { id: '8', label: '8', value: '8' },
    { id: '9', label: '9', value: '9' },
    { id: '10', label: '10', value: '10' },
    { id: '11', label: '11', value: '11' },
    { id: '12', label: '12', value: '12' },
    { id: '13', label: '13', value: '13' },
    { id: '14', label: '14', value: '14' },
    { id: '15', label: '15', value: '15' },
    { id: '16', label: '16', value: '16' },
    { id: '17', label: '17', value: '17' },
    { id: '18', label: '18', value: '18' },
    { id: '19', label: '19', value: '19' },
    { id: '20', label: '20', value: '20' },
  ],
  themes: ['solar-dust', 'nature', 'dark-nature', 'vitage'],
  StudentType: [
    {
      id: '1',
      label: 'Normal',
      value: 'NORMAL',
    },
    {
      id: '2',
      label: 'Cadeirante',
      value: 'CADEIRANTE',
    },
    {
      id: '3',
      label: 'Bolseiro',
      value: 'BOLSEIRO',
    },
  ],
};
export const NOTIFICATION_TYPES = [
  {
    key: 'user_action',
    label: 'Apenas Actividades dos membros',
    description:
      'Notifica-me sobre todas publicações e atualizações dos membros',
  },
  {
    key: 'payment_action',
    label: 'Apenas Actividades Financeiras',
    description: 'Notifica-me sobre todas actividades finançeiras',
  },
  {
    key: 'users_logs',
    label: 'Apenas Actividades dos membros',
    description: 'Notifica-me sobre todas actividades dos membros',
  },
  {
    key: 'student_action',
    label: 'Actividades dos estudantes',
    description:
      'Notifica-me sobre todas publicações e atualizações dos estudantes',
  },
  {
    key: 'department_action',
    label: 'Actividades dos departamentos',
    description:
      'Notifica-me sobre todas publicações e atualizações dos departamentos',
  },
  {
    key: 'course-action',
    label: 'Actividades dos cursos',
    description:
      'Notifica-me sobre todas publicações e atualizações dos cursos',
  },
  {
    key: 'events_action',
    label: 'Actividades dos eventos',
    description:
      'Notifica-me sobre todas publicações e atualizações dos eventos',
  },
  {
    key: 'calendar_action',
    label: 'Actividades dos calendarios',
    description:
      'Notifica-me sobre todas publicações e atualizações dos calendarios',
  },
  {
    key: 'exames_action',
    label: 'Actividades dos calendarios',
    description:
      'Notifica-me sobre todas publicações e atualizações dos exames',
  },
] as const;
