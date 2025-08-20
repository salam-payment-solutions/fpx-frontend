import type { PaymentMessageToken } from '@/enums/payment/payment-message-token'
import type { PaymentStatus } from '@/enums/payment/PaymentStatus.enum'

export interface GetPaymentDetailsResponse {
    transactionId?: string
    exchangeOrderNo: string
    orderNo: string
    referenceNo: string
    description: string
    type: PaymentMessageToken
    payerEmail: string
    payerPhone: string
    payerName: string
    amount: number
    sellerId: string
    exchangeId: string
    status?: PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    // fpxSellerExchange: FpxSellerExchangeCreateNestedOneWithoutPaymentsInput;
    // bank: Prisma.BankCreateNestedOneWithoutPaymentsInput;
}
