'use client'
import { addNewBankAccount } from '@/actions/bank-accounte';
import Selector from '@/components/shared/selector';
import SubmitBtn from '@/components/shared/submit-btn';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { createBankAccountZodSchema } from '@/lib/validation/bank-account';
import { useSheet } from '@/providers/sheet-provider';
import { handleApiError } from '@/services/error-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const banks = [
   {
      id: '1',
      label: 'BAI',
      value: 'BAI',
   },
   {
      id: '2',
      label: 'BFA',
      value: 'BFA',
   },
   {
      id: '3',
      label: 'BIC',
      value: 'BIC',
   },
]

const CreateBankAccount = () => {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof createBankAccountZodSchema>>({
      resolver: zodResolver(createBankAccountZodSchema),
      defaultValues: {
         accountName: '',
         accountNumber: '',
         bankName: '',
         iban: '',
         isActive: true,
         swift: 0
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof createBankAccountZodSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewBankAccount(formData);

            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            handleApiError(error);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                     <FormItem className='w-1/2'>
                        <FormLabel>Nome da Conta</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Ex: Univercity S.A"
                              {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                     <FormItem className='w-1/2'>
                        <FormLabel>Número da Conta</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Ex: 123456789"
                              type='number'
                              {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                     <FormItem className='w-1/2'>
                        <FormLabel>Nome do Banco</FormLabel>
                        <FormControl>
                           <Selector
                              className="w-full"
                              options={banks}
                              placeholder="Ex: BAI, BFA, BIC..."
                              formField={field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="iban"
                  render={({ field }) => (
                     <FormItem className='w-1/2'>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Ex: AOA606.0000.8765.8765"
                              {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="swift"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Swift</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Ex: 123456"
                              {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel id="aproveAccount">Status</FormLabel>
                        <FormControl>
                           <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="aproveAccount"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <SubmitBtn
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateBankAccount
