
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs"
import { TTabsNav } from "./types"


export function TabsNav({ defaultValue, tabList }: TTabsNav) {
   return (
      <div className="flex w-full flex-col gap-6">
         <Tabs defaultValue={defaultValue}>
            <TabsList>
               {tabList.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.value}>{tab.lable}</TabsTrigger>
               ))}
            </TabsList>
            {tabList.map((content) => (
               <TabsContent value={content.value} key={content.id}>
                  <Card>
                     <CardHeader>
                        <CardTitle>{content.lable}</CardTitle>
                        <CardDescription>
                           {content.description || ''}
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="grid gap-6">
                        {content.tabContent}
                     </CardContent>
                     <CardFooter>
                        <Button>Save changes</Button>
                     </CardFooter>
                  </Card>
               </TabsContent>
            ))}
         </Tabs>
      </div>
   )
}
//32y3103Srth7NRfY478iZ20nts3g25VBUK5Tz10CVBKQN6ahD12USRLlVWMi130810