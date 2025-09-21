import Avatar from '@/components/shared/avatar'
import Modal from '@/components/shared/Modal'
import { Button } from '@/components/ui/button'
import { TFaculty } from '@/types/global'
import { MailIcon, MessageCircle, Send } from 'lucide-react'
import Link from 'next/link'
type TProps = {
   info: TFaculty
}

const messageChanel = [
   {
      id: '1',
      title: 'Menssagem via Aplicativo',
      description: 'Envie menssagem via do aplicativo',
      trigger: <Send />
   },
   {
      id: '2',
      title: 'Menssagem via WhatsApp',
      description: 'Envie menssagem via do WhatsApp',
      trigger: <MessageCircle />
   },
   {
      id: '3',
      title: 'Menssagem via Gmail',
      description: 'Envie menssagem via do gmail',
      trigger: <MailIcon />
   },
]

const PersenalInfo = ({ info }: TProps) => {
   const { firstName, middleName, lastName, profileImage, facultyId } = info;
   const name = `${firstName} ${lastName}`;
   const fullName = `${firstName} ${middleName} ${lastName}`
   return (
      <div className="bg-card rounded-md p-5 flex justify-between col-span-6">
         <div className="space-y-4 ">
            <Avatar name={name} photo={profileImage || '/default.jpeg'} className="size-28" />
            <p>{facultyId}</p>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <div className='space-x-4'>
               {messageChanel.map((chanel) => (
                  <Modal
                     key={chanel.id}
                     title={chanel.title}
                     description={chanel.description}
                     trigger={<div className='border rounded-full p-2 hover:bg-primary cursor-pointer'>{chanel.trigger}</div>}
                  >
                     sms
                  </Modal>
               ))}
            </div>
         </div>
         <Button variant={'link'} type="button" role="link">
            <Link href='#' >Mais detalhes</Link>
         </Button>
      </div>
   )
}

export default PersenalInfo
