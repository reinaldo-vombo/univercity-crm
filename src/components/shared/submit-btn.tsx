import { LoaderCircle } from "lucide-react"
import { Button } from "../ui/button"

type TSubmitProps = {
   loading: boolean
   label: 'Entrar' | 'Registar' | 'Enviar' | 'Criar' | 'Publicar' | 'Atualisar' | 'Eliminar'

}

const SubmitBtn = ({ label, loading, }: TSubmitProps) => {
   return (
      <Button disabled={loading} type="submit" className="flex w-full items-center justify-center gap-2">
         {loading ? (
            <>
               {label}ando... <LoaderCircle className="animate-spin" />
            </>
         ) : (`${label}`)}
      </Button>
   )
}

export default SubmitBtn
