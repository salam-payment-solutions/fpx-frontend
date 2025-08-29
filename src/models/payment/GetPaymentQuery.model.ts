export interface GetPaymentQuery {
    transactionId?: string
    orderNo?: string
    referenceNo?: string
    type?: string[]
    payerEmail?: string
    payerPhone?: string
    payerName?: string
    sellerId?: string
    exchangeId?: string
    status?: string[]
}
