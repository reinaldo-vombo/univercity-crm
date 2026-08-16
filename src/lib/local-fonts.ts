import localFont from 'next/font/local';

const Nunito = localFont({
  src: [
    {
      path: '../assets/fonts/nunito/Nunito-Regular.ttf',
      weight: '400',
    },
    {
      path: '../assets/fonts/nunito/Nunito-Medium.ttf',
      weight: '500',
    },
    {
      path: '../assets/fonts/nunito/Nunito-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../assets/fonts/nunito/Nunito-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-nunito',
});

const PTSerif = localFont({
  src: [
    {
      path: '../assets/fonts/pt-serif/PTSerif-Regular.ttf',
      weight: '400',
    },
    {
      path: '../assets/fonts/pt-serif/PTSerif-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-pt-serif',
});

const JetBrainsMono = localFont({
  src: '../assets/fonts/jetbrains-mono/JetBrainsMono-Regular.ttf',
  variable: '--font-jetbrains',
});

export const LOCAL_FONTS = {
  JetBrainsMono,
  Nunito,
  PTSerif,
};
