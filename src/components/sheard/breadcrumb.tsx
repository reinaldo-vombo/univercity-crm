import {
   Breadcrumb as BreadcrumbComponent,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const Breadcrumb = () => {
   return (
      <BreadcrumbComponent>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </BreadcrumbComponent>

   )
}

export default Breadcrumb
