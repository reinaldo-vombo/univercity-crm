
const Footer = () => {
   return (
      <div className="text-muted-foreground flex w-full items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6">
         <p className="text-sm text-balance max-sm:text-center">©2026 <a target="_blank" className="text-primary hover:underline" href="https://reinaldo-vombo.vercel.app/">Reinaldo vombo</a>, Made for better web design</p>
         <div className="flex items-center gap-5 max-sm:hidden">
            <a target="_blank" className="text-muted-foreground hover:text-foreground text-sm transition duration-300" href="https://shadcnstudio.com/docs/documentation-admin/getting-started">Apresentação</a>
            <a target="_blank" className="text-muted-foreground hover:text-foreground text-sm transition duration-300" href="https://shadcnstudio.com/support">Suporte</a></div>
      </div>
   )
}

export default Footer;
