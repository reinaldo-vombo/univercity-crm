'use cliente'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TSelectPros } from './types';

const Selector = ({ className, options, placeholder, formField }: TSelectPros) => {
   const onChange = (value: string) => {
      formField.onChange(value); // For single select
   }

   return (
      <Select onValueChange={onChange}>
         <SelectTrigger aria-label={`Select ${placeholder}`} className={`${className ? className : 'w-[180px]'}`}>
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
