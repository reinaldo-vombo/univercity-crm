export const REVALIDATION = {
  ONE_MINUTES: 60,
  FIVE_MINUTES: 5 * 60,
  TEN_MINUTES: 10 * 60,
  FIFTEEN_MINUTES: 15 * 60,
  TWENTY_MINUTES: 20 * 60,
  THIRTY_MINUTE: 30 * 60,
  ONE_HOUR: 60 * 60,
};
export const CACHE_LIFE = {
  ONE_MINUTE: 'oneMinute',
  FIVE_MINUTES: 'fiveMinutes',
  TEN_MINUTES: 'tenMinutes',
  FIFTEEN_MINUTES: 'fifteenMinutes',
  TWENTY_MINUTES: 'twentyMinutes',
  THIRTY_MINUTES: 'thirtyMinutes',
  ONE_HOUR: 'oneHour',
} as const;
