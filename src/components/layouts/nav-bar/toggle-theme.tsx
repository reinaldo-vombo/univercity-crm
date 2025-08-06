'use client'
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react'

const ThemeToggle = () => {
   const { setTheme, theme, resolvedTheme } = useTheme();

   const toggleTheme = () => {
      const baseTheme = theme?.replace("dark-", "") ?? "light";
      const isCurrentlyDark =
         resolvedTheme === "dark" || theme?.startsWith("dark");

      if (isCurrentlyDark) {
         setTheme(baseTheme);
      } else {
         setTheme(`dark-${baseTheme}`);
      }
   };

   const isDark = resolvedTheme === "dark" || theme?.startsWith("dark");

   return (
      <div>
         <Button
            className='relative flex size-11 items-center justify-center rounded-full border border-border bg-primary-foreground text-gray-500 transition-colors hover:bg-primary'
            onClick={toggleTheme}>
            {/* {theme === 'dark' ? <Sun /> : <Moon />} */}
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
         </Button>
      </div>
   )
}

export default ThemeToggle;
