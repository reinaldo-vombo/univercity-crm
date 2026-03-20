import { FaildBage, PendingBage, SucessBage } from '@/components/shared/bages'
import React from 'react'

export const paymentStatusBage = (status: string) => {
   if (status === 'APROVED' || 'PAID') return <SucessBage />
   if (status === 'PENDING' || 'PENDING') return <PendingBage />
   if (status === 'NOT_PAID') return <FaildBage />
}
