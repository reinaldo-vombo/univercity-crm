export const InfoItem = ({
   icon: Icon,
   label,
   value,
}: {
   icon: React.ElementType
   label: string
   value: React.ReactNode
}) => (
   <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
         <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
         <p className="text-xs text-muted-foreground">{label}</p>
         <p className="truncate text-sm font-medium">{value}</p>
      </div>
   </div>
)