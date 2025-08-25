
import {
   Card as CardBody,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
type Props = {
   children: React.ReactNode
   lable?: string
   description?: string
   showTitle?: boolean
}

const Card = ({ children, lable, description, showTitle = true }: Props) => {
   return (
      <CardBody>
         <CardHeader>
            {showTitle && <CardTitle>{lable || 'card title'}</CardTitle>}
            <CardDescription className="sr-only">{description || 'Card description'}</CardDescription>
         </CardHeader>
         <CardContent>
            {children}
         </CardContent>
      </CardBody>

   )
}

export default Card
