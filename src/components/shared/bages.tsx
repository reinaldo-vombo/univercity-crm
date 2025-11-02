import { AlertCircleIcon, BanIcon, CheckCircleIcon } from "lucide-react"
import { Badge } from "../ui/badge"

export const SucessBage = () => (
   <Badge
      variant='outline'
      className='border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [a&]:hover:bg-green-600/10 [a&]:hover:text-green-600/90 dark:[a&]:hover:bg-green-400/10 dark:[a&]:hover:text-green-400/90'
   >
      <CheckCircleIcon className='size-3' />
      Successful
   </Badge>
)
export const PendingBage = () => (
   <Badge
      variant='outline'
      className='border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 [a&]:hover:bg-amber-600/10 [a&]:hover:text-amber-600/90 dark:[a&]:hover:bg-amber-400/10 dark:[a&]:hover:text-amber-400/90'
   >
      <AlertCircleIcon className='size-3' />
      Pending
   </Badge>
)
export const FaildBage = () => (
   <Badge
      variant='outline'
      className='text-destructive [a&]:hover:bg-destructive/10 [a&]:hover:text-destructive/90 border-destructive'
   >
      <BanIcon className='size-3' />
      Failed
   </Badge>
)
export const CompleteBage = () => (
   <Badge className='rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'>
      <span className='size-1.5 rounded-full bg-green-600 dark:bg-green-400' aria-hidden='true' />
      Completed
   </Badge>
)
export const ProgressBage = () => (
   <Badge className='rounded-full border-none bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5'>
      <span className='size-1.5 rounded-full bg-amber-600 dark:bg-amber-400' aria-hidden='true' />
      In Progress
   </Badge>
)
export const CloseBage = () => (
   <Badge className='bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive rounded-full border-none focus-visible:outline-none'>
      <span className='bg-destructive size-1.5 rounded-full' aria-hidden='true' />
      Blocked
   </Badge>
)
