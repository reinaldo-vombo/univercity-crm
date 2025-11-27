import Avatar from '@/components/shared/avatar'
import ExpandebalForm from '@/components/shared/popover-form'
import { Button } from '@/components/ui/button'
import { TFaculty } from '@/types/global'
import Link from 'next/link'
type TProps = {
   info: TFaculty
}

const PersenalInfo = ({ info }: TProps) => {
   const { firstName, middleName, lastName, profileImage, facultyId } = info;
   const name = `${firstName} ${lastName}`;
   const fullName = `${firstName} ${middleName} ${lastName}`
   return (
      <div className="bg-card rounded-md p-5 col-span-6">
         <div className="space-y-4 ">
            <div className='flex justify-between'>
               <Avatar name={name} photo={profileImage || '/avatar-1.jpg'} className="size-28" />
               <Button variant={'link'} type="button" role="link">
                  <Link href='#' >Mais detalhes</Link>
               </Button>
            </div>
            <p># {facultyId}</p>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <div className='flex items-center justify-center'>
               <ExpandebalForm title='Menssagem' />
            </div>
         </div>

      </div>
   )
}

export default PersenalInfo
