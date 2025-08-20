import type { PaymentMessageToken } from '@/enums/payment/payment-message-token'

export interface CreatePaymentRequet {
    referenceNo: string
    description: string
    type: PaymentMessageToken
    payerEmail: string
    payerName: string
    payerPhone: string
    amount: string
    bankCode: string
}
