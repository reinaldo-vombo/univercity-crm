import { Skeleton } from "../ui/skeleton"


const ListItemsSkeleton = () => {
   return (
      <div className="w-full space-y-4">
         {Array.from({ length: 7 }).map((_, index) => (
            <div className="flex gap-3" key={index}>
               <Skeleton className='relative rounded-lg size-9' />
               <div className="space-y-2 w-full">
                  <Skeleton className="w-28 h-3"></Skeleton>
                  <Skeleton className="size-8 rounded-full"></Skeleton>
               </div>
            </div>
         ))}
      </div>
   )
}

export default ListItemsSkeleton;
