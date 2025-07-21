import {
   Breadcrumb as BreadcrumbComponent,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
type TBaseRoutes = {
   root: string
   pageUrl: string
   pageName: string
   name: string
}


const Breadcrumb = ({ root, pageUrl, pageName, name }: TBaseRoutes) => {
   return (
      <BreadcrumbComponent>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink href={root}>Crm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbLink href={pageUrl}>{pageName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </BreadcrumbComponent>

   )
}

export default Breadcrumb
