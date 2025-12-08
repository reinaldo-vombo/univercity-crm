
import UserProfilePage from '@/components/templates/profile-page'
import { TSeachParams } from '@/types/global'
import { Metadata } from 'next'
import { Suspense } from 'react';

export const metadata: Metadata = {
   title: 'Perfil'
}
export default async function ProfilePage({ searchParams }: TSeachParams) {
   const { id } = await searchParams;

   return <Suspense fallback={<p>loading</p>}>
      <UserProfilePage id={id} />
   </Suspense>
}
