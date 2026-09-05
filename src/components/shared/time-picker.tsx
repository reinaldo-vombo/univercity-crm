import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Clock } from 'lucide-react'

const TimePickerWithIcon = ({ field }: any) => {
   return (
      <div className='flex w-full max-w-xs flex-col gap-2'>
         <Label htmlFor='timepicker' className='px-1'>
            Time input with start icon
         </Label>
         <div className='relative'>
            <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
               <Clock className='size-4' />
               <span className='sr-only'>User</span>
            </div>
            <Input
               type='time'
               id='time-picker'
               step='1'
               className='peer bg-background appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
               {...field}
            />
         </div>
      </div>
   )
}

export default TimePickerWithIcon;
