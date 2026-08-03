'use client'

import SheetModal from "@//components/shared/sheet-modal";
import { Briefcase, Check, Eye, Mail, Pencil, Phone, Plus, Trash, UserCircle } from "lucide-react";

import Avatar from "@/components/shared/avatar";

import UpdatedAccountForm from "@/components/forms/admin/update/update-account";
import { TUser } from "@/types/global";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
type TProps = {
   user: TUser | undefined
}

type TRole = {
   id: string;
   name: string;
   label: string;
   permissions: string[];
};

const permissions = ['view', 'create', 'edit', 'delete'] as const;

const roles: TRole[] = [
   { id: 'admin', name: 'admin', label: 'Administrador', permissions: ['view', 'create', 'edit', 'delete'] },
   { id: 'manager', name: 'manager', label: 'Gestor', permissions: ['view', 'create', 'edit'] },
   { id: 'editor', name: 'editor', label: 'Editor', permissions: ['view', 'edit'] },
   { id: 'viewer', name: 'viewer', label: 'Visualizador', permissions: ['view'] },
];

const permissionConfig: Record<typeof permissions[number], { label: string; icon: React.ReactNode }> = {
   view: { label: 'Visualizar', icon: <Eye className="size-3.5" /> },
   create: { label: 'Criar', icon: <Plus className="size-3.5" /> },
   edit: { label: 'Editar', icon: <Pencil className="size-3.5" /> },
   delete: { label: 'Eliminar', icon: <Trash className="size-3.5" /> },
};

const AccountTab = ({ user }: TProps) => {

   const [selectedRole, setSelectedRole] = useState(
      roles.find((r) => r.name === user?.role) ?? roles[roles.length - 1]
   );
   return (
      <div className="grid grid-cols-12 gap-5">

         {/* Perfil */}
         <div className="col-span-12 lg:col-span-7 rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
               <UserCircle className="text-slate-400 size-5" />
               <b>Informações pessoais</b>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
               <div className="relative w-fit mx-auto sm:mx-0">
                  <Avatar
                     name={user?.name || ''}
                     photo={user?.avatar || ''}
                     className="size-28 rounded-full border-4 border-neutral-900"
                  />
                  <SheetModal
                     side="right"
                     trigger={
                        <div className="absolute -bottom-1 -right-1 flex items-center justify-center size-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg">
                           <Pencil className="size-3.5 text-white" />
                        </div>
                     }
                     title="Editar Perfil"
                     id={`view-${user?.id}`}
                     description="Editar Perfil"
                     className="sm:max-w-md"
                  >
                     <UpdatedAccountForm defaultValues={user} />
                  </SheetModal>
               </div>

               <div className="flex-1 space-y-4 w-full">
                  <div>
                     <p className="text-xs text-neutral-500 mb-1.5">Nome</p>
                     <div className="rounded-lg border bg-neutral-950/40 px-3 py-2.5">
                        <b className="text-sm">{user?.name}</b>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <p className="text-xs text-neutral-500 mb-1.5 flex items-center gap-1.5">
                           <Mail className="size-3" /> Email
                        </p>
                        <div className="rounded-lg border bg-neutral-950/40 px-3 py-2.5 truncate">
                           <b className="text-sm">{user?.email}</b>
                        </div>
                     </div>
                     <div>
                        <p className="text-xs text-neutral-500 mb-1.5 flex items-center gap-1.5">
                           <Phone className="size-3" /> Telemóvel
                        </p>
                        <div className="rounded-lg border bg-neutral-950/40 px-3 py-2.5">
                           <b className="text-sm">(+244) {user?.contact?.phone}</b>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Trabalho / cargo e permissões */}
         <div className="col-span-12 lg:col-span-5 rounded-xl border p-6 space-y-6">
            <div className="flex items-center gap-2">
               <Briefcase className="text-slate-400 size-4" />
               <b>Detalhes do trabalho</b>
            </div>

            <div className="space-y-2">
               <p className="text-xs text-neutral-500">Posição</p>
               <Select
                  value={selectedRole.name}
                  onValueChange={(value) => {
                     const role = roles.find((r) => r.name === value);
                     if (role) setSelectedRole(role);
                  }}
               >
                  <SelectTrigger className="w-full">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                           {role.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            <div className="space-y-2.5">
               <p className="text-xs text-neutral-500">Permissões</p>
               <div className="grid grid-cols-2 gap-2.5">
                  {permissions.map((permission) => {
                     const isActive = selectedRole.permissions.includes(permission);
                     const cfg = permissionConfig[permission];
                     return (
                        <div
                           key={permission}
                           className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors ${isActive
                              ? 'bg-green-500/5 border-green-500/20'
                              : 'bg-neutral-950/40 border-neutral-800 opacity-50'
                              }`}
                        >
                           <span className={isActive ? 'text-green-500' : 'text-neutral-600'}>
                              {cfg.icon}
                           </span>
                           <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                              {cfg.label}
                           </span>
                           {isActive && <Check className="size-3.5 text-green-500 ml-auto" />}
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default AccountTab
