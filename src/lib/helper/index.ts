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
  format: string = 'YYYY-MM-DD'
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
  value: string
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
