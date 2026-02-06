import { Table } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

type TSelectColumnProps<T> = {
   table: Table<T>
};
type TSelectCellProps<T> = {
   row: any
   main?: Table<T>
}

export function SelectHeader<T>({ table }: TSelectColumnProps<T>) {
   return (
      <Checkbox
         checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
         }
         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
         aria-label='Selecionar tudo'
      />
   )
}
export function SelectCell<T>({ row }: TSelectCellProps<T>) {
   return (
      <Checkbox
         checked={row.getIsSelected()}
         onCheckedChange={(value) => row.toggleSelected(!!value)}
         aria-label='Selecionar linha'
      />
   )
}