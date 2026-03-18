import { TActionHistory } from '@/types/global';

export function getFirstAndLastName(fullName: string) {
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  return { firstName, lastName };
}
export const generateSlug = (text: string) => {
  return (
    text
      .toLocaleLowerCase()
      .trim()
      //  .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '')
  );
};

export function formatDate(
  date: string | Date | number,
  format: string = 'YYYY-MM-DD',
): string {
  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes('YYYY')) options.year = 'numeric';
  if (format.includes('MM')) options.month = '2-digit';
  if (format.includes('DD')) options.day = '2-digit';

  const formattedDate = new Date(date).toLocaleDateString('pt-PT', options);

  return formattedDate;
}
export function formatDateTime(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
export function formatTimeAgo(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const month = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  if (seconds < 60)
    return `${seconds} segundo${seconds !== 1 ? 's' : ''} atras`;
  if (minutes < 60) return `${minutes} minuto${minutes !== 1 ? 's' : ''} atras`;
  if (hours < 24 && now.getDate() === date.getDate()) {
    return `Hoje as ${hh}:${mm}`;
  }
  if (days === 1) return `Ontem as ${hh}:${mm}`;
  if (days < 7) return `${days} Dia${days !== 1 ? 's' : ''} atrás`;
  if (weeks < 5) return `${weeks} Semana${days !== 1 ? 's' : ''} atrás`;
  if (month < 12) return `${weeks} Mês${days !== 1 ? 's' : ''} atrás`;
  if (years < 5) return `${years} Ano${days !== 1 ? 's' : ''} atrás`;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const formatCurrency = (price: number) => {
  const converted = new Intl.NumberFormat('AOA', {
    style: 'currency',
    currency: 'AOA',
  }).format(price);
  return converted;
};

export const createQueryString = (
  searchParams: URLSearchParams,
  name: string,
  value: string,
): string => {
  const params = new URLSearchParams(searchParams.toString());

  // Toggle logic: Remove the parameter if the value matches
  if (params.get(name) === value) {
    params.delete(name);
  } else {
    params.set(name, value);
  }

  return params.toString();
};
export const filterActionHistoryByDate = (
  data: TActionHistory[],
  filter: string,
): TActionHistory[] => {
  const now = new Date();
  return data.filter((item) => {
    const createdAt = item.createdAt;
    console.log('filter', createdAt);

    switch (filter) {
      case 'today': {
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));
        return createdAt >= start && createdAt <= end;
      }

      case 'yesterday': {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const start = new Date(yesterday.setHours(0, 0, 0, 0));
        const end = new Date(yesterday.setHours(23, 59, 59, 999));
        return createdAt >= start && createdAt <= end;
      }

      case 'this week': {
        const firstDay = new Date(now);
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // segunda-feira
        firstDay.setDate(diff);
        firstDay.setHours(0, 0, 0, 0);

        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);
        lastDay.setHours(23, 59, 59, 999);

        return createdAt >= firstDay && createdAt <= lastDay;
      }

      case 'this month': {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );
        return createdAt >= start && createdAt <= end;
      }

      default:
        return true;
    }
  });
};
export const getInitials = (title: string): string => {
  const ignore = [
    'da',
    'de',
    'do',
    'das',
    'dos',
    'e',
    'a',
    'o',
    'Da',
    'De',
    'Do',
    'E',
    'A',
    'O',
  ];
  return title
    .split(' ')
    .filter((words) => !ignore.includes(words))
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};
export const showYearLevel = (year: string) => {
  if (year === 'FIRST') return '1º ano';
  if (year === 'SECOND') return '2º ano';
  if (year === 'THIRD') return '3º ano';
  if (year === 'FOURTH') return '5º ano';
  if (year === 'FIFTH') return '6º ano';
  //'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'
};
let counter = 0;

export function createUniqueId(prefix: string = 'id') {
  counter++;
  return `${prefix}-${counter}`;
}
