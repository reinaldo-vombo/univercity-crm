'use client'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
   const { setTheme, theme, resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   const toggleTheme = () => {
      const root = document.documentElement;
      const isCurrentlyDark = root.classList.contains("dark");

      if (isCurrentlyDark) {
         root.classList.remove("dark");
         // next-themes: pode usar sistema ou "light"
         setTheme("light");
      } else {
         root.classList.add("dark");
         setTheme("dark");
      }
   };

   const isDark = resolvedTheme === "dark" || theme?.startsWith("dark");

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return (
      <div>
         <Button
            variant='outline'
            size='icon'
            onClick={() => toggleTheme()}
            aria-label='Toggle dark mode'
            className={cn(
               isDark
                  ? 'border-amber-600 text-amber-600! hover:bg-amber-600/10 focus-visible:border-amber-600 focus-visible:ring-amber-600/20 dark:border-amber-400 dark:text-amber-400! dark:hover:bg-amber-400/10 dark:focus-visible:border-amber-400 dark:focus-visible:ring-amber-400/40'
                  : 'border-sky-600 text-sky-600! hover:bg-sky-600/10 focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:border-sky-400 dark:text-sky-400! dark:hover:bg-sky-400/10 dark:focus-visible:border-sky-400 dark:focus-visible:ring-sky-400/40'
            )}
         >
            {isDark ? <SunIcon /> : <MoonIcon />}
         </Button>
      </div>
   )
}

export default ThemeToggle;
