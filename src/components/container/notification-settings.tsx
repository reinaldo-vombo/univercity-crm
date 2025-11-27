
'use client'
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { preferenceShema } from '@/lib/validation/user';
import { z } from 'zod';
import {
   Form, FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form';
import { NOTIFICATION_TYPES } from '@/constants/mock-data';
import SubmitBtn from '../shared/submit-btn';
import { toast } from 'sonner';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { TNotificationPreference } from '@/types/global';
import { Bell, Mail, Smartphone } from 'lucide-react';
import { createNotificationPreference } from '@/actions/activitiys';

type FormValues = z.infer<typeof preferenceShema>
type TProps = {
   config: TNotificationPreference
}
const Notification = ({ config }: TProps) => {
   const { settings, enabled } = config;
   const form = useForm<FormValues>({
      resolver: zodResolver(preferenceShema),
      defaultValues: {
         enabled: enabled || true,
         calendar_action: settings.calendar_action,
         course_action: settings.course_action,
         department_action: settings.department_action,
         events_action: settings.events_action,
         exames_action: settings.exames_action,
         payment_action: settings.payment_action,
         student_action: settings.student_action,
         user_action: settings.user_action,
         users_logs: settings.users_logs
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: FormValues) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await createNotificationPreference(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <div className="grid grid-cols-12 gap-3">
               <div className='col-span-6'>
                  <h2 className='font-bold text-2xl'>Notifição por email</h2>
                  <p className='text-slate-200'>Substancia pode enviar email para qualquer messagem directa</p>
               </div>
               <div className='col-span-6 space-y-2'>
                  <FormField
                     control={form.control}
                     name="enabled"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className='font-bold'>Ablitar notificações</FormLabel>
                           <FormControl className="relative">
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                           </FormControl>
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div>
                     {NOTIFICATION_TYPES.map((nt) => (
                        <div className='space-y-4 flex gap-3' key={nt.key}>
                           <FormField
                              key={nt.key}
                              control={form.control}
                              name={nt.key as any}
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl className="relative">
                                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <div>
                              <b className='mb-4'>{nt.label}</b>
                              <p>{nt.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <Separator />
            <div className="grid grid-cols-12 gap-3">
               <div className='col-span-6'>
                  <h2 className='font-bold text-2xl'>Canais de Notificações</h2>
                  <p>Substancia pode enviar email para qualquer messagem directa</p>
               </div>
               <div className='col-span-6'>
                  <div className='space-y-4'>
                     <div className='flex gap-4'>
                        <div className='rounded-lg border p-2'>
                           <Mail />
                        </div>
                        <div className='space-y-3 mr-4'>
                           <b>Notificações por Email</b>
                           <p>Receber notificação via email</p>
                        </div>
                        <Switch className='ml-auto' checked={true} />
                     </div>
                     <div className='flex gap-4'>
                        <div className='rounded-lg border p-2'>
                           <Bell />
                        </div>
                        <div className='space-y-3 mr-4'>
                           <b>Notificações push</b>
                           <p>Receber notificação no navegador</p>
                        </div>
                        <Switch className='ml-auto' checked={true} />
                     </div>
                     <div className='flex gap-4'>
                        <div className='rounded-lg border p-2'>
                           <Smartphone />
                        </div>
                        <div className='space-y-3 mr-4'>
                           <b>Notificações via SMS</b>
                           <p>Receber notificação no navegador</p>
                        </div>
                        <Switch className='ml-auto' checked={true} />
                     </div>

                  </div>
               </div>
            </div>
            <SubmitBtn label='Atualisar' loading={isPending} />
         </form>
      </Form >
   )
}

export default Notification;
