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

export const formatCurrency = (price: number) => {
  const converted = new Intl.NumberFormat('AOA', {
    style: 'currency',
    currency: 'AOA',
  }).format(price);
  return converted;
};
