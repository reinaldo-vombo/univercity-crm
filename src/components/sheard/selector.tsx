'use cliente'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TSelectPros } from './types';

const Selector = ({ className, options, placeholder, formField, disabled = false }: TSelectPros) => {


   return (
      <Select onValueChange={(value) => {
         formField.onChange(value);
      }}
         value={formField.value ?? ''} // ensure it is never undefined
         disabled={disabled}>
         <SelectTrigger aria-label={placeholder} className={`${className || 'w-[180px]'}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((item,) => (
               <SelectItem
                  key={item.id}
                  value={item.value}
               >
                  {item.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default Selector;
