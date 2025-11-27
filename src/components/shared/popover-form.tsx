"use client"
import * as z from "zod"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form";
import {
   PopoverForm,
   PopoverFormButton,
   PopoverFormCutOutLeftIcon,
   PopoverFormCutOutRightIcon,
   PopoverFormSeparator,
   PopoverFormSuccess,
} from "@/components/ui/popover-form"
import { createMenssageSchema } from "@/lib/validation/menssage"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { sendeMenssage } from "@/actions/menssage";
import { Textarea } from "../ui/textarea";
import { TPopoverForm } from "./types";

type FormState = "idle" | "loading" | "success"

const ExpandebalForm = ({ title }: TPopoverForm) => {
   const [formState, setFormState] = useState<FormState>("idle");
   const [isPending, startTransition] = useTransition();
   const [open, setOpen] = useState(false);


   const form = useForm<z.infer<typeof createMenssageSchema>>({
      resolver: zodResolver(createMenssageSchema),
      defaultValues: {
         type: '',
         message: ''
      },
   });
   const { handleSubmit } = form;

   async function submit(values: z.infer<typeof createMenssageSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            setFormState("loading")
            const response = await sendeMenssage(formData);
            if (response.error) {
               toast.warning(response.message);
               setFormState("idle")
               return;
            }
            setFormState("success")
            setTimeout(() => {
               setOpen(false)
               setFormState("idle")
            }, 3300)
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });
   }

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            setOpen(false)
         }

      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
   }, [open, formState])

   return (
      <div className="flex w-full items-center justify-center">
         <PopoverForm
            title={title}
            open={open}
            setOpen={setOpen}
            width="364px"
            height="200px"
            showCloseButton={formState !== "success"}
            showSuccess={formState === "success"}
            openChild={
               <Form {...form}>
                  <form
                     onSubmit={handleSubmit(submit)}
                  >
                     <div className="relative">
                        <FormField
                           control={form.control}
                           name="message"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Menssagem</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       autoFocus
                                       placeholder="Feedback"
                                       className="h-32 w-full resize-none rounded-t-lg p-3 text-sm outline-none"
                                       {...field} />
                                 </FormControl>
                                 <FormDescription></FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div className="relative flex h-12 items-center px-[10px]">
                        <PopoverFormSeparator />
                        <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                           <PopoverFormCutOutLeftIcon />
                        </div>
                        <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                           <PopoverFormCutOutRightIcon />
                        </div>
                        <PopoverFormButton
                           loading={isPending}
                           text="Enviar"
                        />
                     </div>
                  </form>
               </Form>

            }
            successChild={
               <PopoverFormSuccess
                  title="Feedback Received"
                  description="Thank you for supporting our project!"
               />
            }
         />
      </div>
   )
}

export default ExpandebalForm;
