"use client";

import { DataTable } from "@/components/shared/data-table";
import { TBuilding, TRoom } from "@/types/global";
import { RoomColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
import { createSelectCalumn } from "@/components/table-filters/select-column-def";
import { isAdmin } from "@/lib/helper/auth/check-user-role";
import { deleteManyRoom } from "@/actions/room";
import { useSheet } from "@/providers/sheet-provider";
import { useState } from "react";
import SheetModal from "@/components/shared/sheet-modal";
import BulkUpdateRoomUpdateForm from "@/components/forms/admin/update/bulk-update-room";
const CreateRoomForm = dynamic(() => import("@/components/forms/admin/post/create-rooms"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   rooms: TRoom[];
   building: TBuilding[];
   session: any
}
const herader = {
   roomNumber: "Numero da sala",
   floor: "Andar",
}
const uid = createUniqueId("create");
const bulkId = createUniqueId("bulk-updat");
export function RoomTable({ rooms, building, session }: Props) {
   const [selectedIds, setSelectedIds] = useState<number[]>([])
   const { open } = useSheet()

   const columns = [
      createSelectCalumn<TRoom>(),
      ...RoomColumns(building)]

   return (
      <>
         <DataTable
            actionForm={<CreateRoomForm buildings={building} />}
            fileHerderes={herader}
            canDelete={isAdmin(session.role)}
            canUpdate={isAdmin(session.role)}
            onDeleteMany={(ids) => deleteManyRoom(ids)}
            onUpdateMany={(ids) => {
               setSelectedIds(ids);
               open(bulkId)
            }
            }
            fileName="Salas"
            sheetId={uid}
            modalTitle="Criar Salas"
            columns={columns}
            data={rooms}
            filterColumn="roomNumber" />
         <SheetModal trigger={<p className="hidden">t</p>}
            side="right"
            title={`Atualizar ${selectedIds.length} salas`}
            description={`Atualizar ${selectedIds.length} salas`}
            id={bulkId}
         ><BulkUpdateRoomUpdateForm roomIds={selectedIds} setSelectedIds={setSelectedIds} /></SheetModal>
      </>
   )
}
