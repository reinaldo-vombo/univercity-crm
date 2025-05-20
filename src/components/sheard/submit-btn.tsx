import { LoaderCircle } from "lucide-react"
import { Button } from "../ui/button"

type TSubmitProps = {
   loading: boolean
   label: 'Entrar' | 'Criar' | 'Publicar' | 'Atualisar' | 'Eliminar'

}

const SubmitBtn = ({ label, loading }: TSubmitProps) => {
   return (
      <Button type="submit" className="flex items-center justify-center gap-2">
         {loading ? (
            <>
               {label} <LoaderCircle className="animate-spin" />
            </>
         ) : (`${label}`)}
      </Button>
   )
}

export default SubmitBtn
