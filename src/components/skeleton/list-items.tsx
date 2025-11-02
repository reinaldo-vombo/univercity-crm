import { Skeleton } from "../ui/skeleton"


const ListItemsSkeleton = () => {
   return (
      <div className="w-full">
         {Array.from({ length: 8 }).map((_, index) => (
            <div className="flex gap-2 items-center" key={index}>
               <Skeleton className='relative rounded-lg size-9' />
               <div className="space-y-2">
                  <Skeleton className="w-10 h-1.5"></Skeleton>
                  <Skeleton className="w-10 h-1.5"></Skeleton>
               </div>
            </div>
         ))}
      </div>
   )
}

export default ListItemsSkeleton;
