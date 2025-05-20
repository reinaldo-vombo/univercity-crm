
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
}

const Card = ({ children, lable, description }: Props) => {
   return (
      <CardBody>
         <CardHeader>
            {lable && <CardTitle>{lable}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
         </CardHeader>
         <CardContent>
            {children}
         </CardContent>
      </CardBody>

   )
}

export default Card
