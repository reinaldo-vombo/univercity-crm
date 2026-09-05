import { motion } from 'framer-motion'

export function Spinner() {
   return (
      <motion.svg
         width="16" height="16" viewBox="0 0 16 16" fill="none"
         animate={{ rotate: 360 }}
         transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
         <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
         <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
   )
}

export function CheckIcon() {
   return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
         <motion.path
            d="M3 8l3.5 3.5L13 4"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
         />
      </svg>
   )
}

export function XIcon() {
   return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
         <motion.path
            d="M4 4l8 8M12 4l-8 8"
            stroke="white" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
         />
      </svg>
   )
}