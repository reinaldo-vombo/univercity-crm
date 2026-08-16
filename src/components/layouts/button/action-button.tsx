import { AnimatePresence, motion } from 'framer-motion'
import { STATE_CONFIG, STATE_STYLES } from './constants';
import { SubmitState, TSubmitState } from '@/types/global';



const ActionButton = ({ submitState, isPending }: TSubmitState) => {
  const effectiveState: SubmitState = isPending ? 'loading' : submitState;
  return (
    <motion.button
      type="submit"
      disabled={effectiveState !== 'idle'}
      animate={{
        scale: effectiveState === 'loading' ? 0.98 : 1,
      }}
      transition={{ duration: 0.15 }}
      className={`relative cursor-pointer w-full bg-black flex items-center justify-center gap-3
              py-4 rounded-2xl font-medium text-sm tracking-wide
              transition-colors duration-500 overflow-hidden
              disabled:cursor-not-allowed
              ${STATE_STYLES[effectiveState]}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={effectiveState}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex items-center gap-2"
        >
          {STATE_CONFIG[effectiveState].icon}
          <span>{STATE_CONFIG[effectiveState].label}</span>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

export default ActionButton;
