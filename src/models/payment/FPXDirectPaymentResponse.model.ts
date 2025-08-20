export interface FPXDirectPaymentResponse {
    fpx_msgType: string
    fpx_msgToken: string
    fpx_fpxTxnId: string
    fpx_sellerExId: string
    fpx_sellerExOrderNo: string
    fpx_fpxTxnTime: string
    fpx_sellerTxnTime: string
    fpx_sellerOrderNo: string
    fpx_sellerId: string
    fpx_txnCurrency: string
    fpx_txnAmount: string
    fpx_checkSum: string
}
