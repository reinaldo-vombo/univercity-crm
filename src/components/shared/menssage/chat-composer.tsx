import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { useAutoResizeTextarea } from "@/lib/hooks/use-auto-resize-textarea"
import {
   ArrowRight,
   Check,
   ChevronDown,
   Loader2,
   Paperclip,
   Sparkles,
} from "lucide-react"
import { TChannel, TChatComposerProps } from "./types"
import { useState } from "react"
import { CHANNEL_CONFIG } from "./constant"
import { cn } from "@/lib/utils"
import { sendMessage } from "@/actions/message"



export const ChatComposer = ({
   channel,
   onChannelChange,
   contactName,
   history,
   onSend,
}: TChatComposerProps) => {
   const [value, setValue] = useState("")
   const [isSuggesting, setIsSuggesting] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const { textareaRef, adjustHeight } = useAutoResizeTextarea({
      minHeight: 44,
      maxHeight: 160,
   })

   const config = CHANNEL_CONFIG[channel]
   const ChannelIcon = config.icon

   const handleSend = async () => {
      const content = value.trim()
      if (!content) return
      await sendMessage(content)
      onSend(content)
      setValue("")
      adjustHeight(true)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         handleSend()
      }
   }

   const handleSuggest = async () => {
      setIsSuggesting(true)
      setError(null)
      try {
         const res = await fetch("/api/ai/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               history,
               instruction: value.trim() || undefined,
               channel,
               contactName,
            }),
         })

         if (!res.ok) throw new Error("Falha ao gerar sugestão")

         const data = await res.json()
         setValue(data.suggestion)
         requestAnimationFrame(() => adjustHeight())
      } catch {
         setError("Não foi possível gerar uma sugestão agora.")
      } finally {
         setIsSuggesting(false)
      }
   }

   return (
      <div className="rounded-xl border bg-background p-1.5">
         <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
               setValue(e.target.value)
               adjustHeight()
            }}
            onKeyDown={handleKeyDown}
            placeholder={`Escrever ${config.label.toLowerCase()}...`}
            disabled={isSuggesting}
            className="min-h-[44px] w-full resize-none border-none bg-transparent px-2.5 py-2 shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
         />

         {error && (
            <p className="px-2.5 pb-1 text-xs text-red-500">{error}</p>
         )}

         <div className="flex items-center justify-between gap-2 px-1 pb-0.5">
            <div className="flex items-center gap-1">
               {/* Seletor de tipo de mensagem (antes era o dropdown de modelo IA) */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        type="button"
                        variant="ghost"
                        className="h-7 gap-1 rounded-md px-2 text-xs hover:bg-muted"
                     >
                        <ChannelIcon className={cn("size-3.5", config.text)} />
                        <span className="hidden sm:inline">{config.label}</span>
                        <ChevronDown className="size-3 opacity-60" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-36">
                     {(Object.keys(CHANNEL_CONFIG) as TChannel[]).map((key) => {
                        const item = CHANNEL_CONFIG[key]
                        const ItemIcon = item.icon
                        return (
                           <DropdownMenuItem
                              key={key}
                              onSelect={() => onChannelChange(key)}
                              className="flex items-center justify-between gap-2"
                           >
                              <span className="flex items-center gap-2">
                                 <ItemIcon className={cn("size-3.5", item.text)} />
                                 {item.label}
                              </span>
                              {channel === key && (
                                 <Check className="size-3.5 text-blue-500" />
                              )}
                           </DropdownMenuItem>
                        )
                     })}
                  </DropdownMenuContent>
               </DropdownMenu>

               <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSuggest}
                  disabled={isSuggesting}
                  className="h-7 gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted"
               >
                  {isSuggesting ? (
                     <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                     <Sparkles className="size-3.5" />
                  )}
                  <span className="hidden sm:inline">
                     {isSuggesting
                        ? "Gerando..."
                        : value.trim()
                           ? "Reescrever"
                           : "Sugerir"}
                  </span>
               </Button>

               <label
                  aria-label="Anexar ficheiro"
                  className="cursor-pointer rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
               >
                  <input type="file" className="hidden" />
                  <Paperclip className="size-4" />
               </label>
            </div>

            <Button
               size="icon"
               className={cn("size-8 cursor-pointer rounded-lg", config.accent)}
               disabled={!value.trim() || isSuggesting}
               onClick={handleSend}
               aria-label="Enviar mensagem"
            >
               <ArrowRight className="size-4 text-white" />
            </Button>
         </div>
      </div>
   )
}