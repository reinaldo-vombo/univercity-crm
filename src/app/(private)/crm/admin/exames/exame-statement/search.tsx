'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useQueryState } from "nuqs"

const SearchStatements = () => {
   const [search, setSearch] = useQueryState(
      'search',
   )
   return (
      <div className="relative flex-1 max-w-sm">
         <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#22262B]/35" />
         <Input
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar enunciado..."
            className="border-[#22262B]/15 bg-[#FCFBF8] pl-9 focus-visible:ring-[#2B3A67]"
         />
      </div>
   )
}

export default SearchStatements
