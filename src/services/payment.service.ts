import { AppConfig } from '@/config/app.config'
import type { Bank } from '@/models/payment/Bank.model'
import type { CreatePaymentRequet } from '@/models/payment/CreatePaymentRequet.model'
import type { FPXCreatePaymentRequest } from '@/models/payment/FPXCreatePaymentRequest.model'
import type { GetPaymentDetailsResponse } from '@/models/payment/GetPaymentDetailsResponse.model'
import type { GetPaymentReceiptRequest } from '@/models/payment/GetPaymentReceiptRequest.model'
import axios from 'axios'

export class PaymentService {
    private apiUrl = `${AppConfig.API_URL}/payments`

    public async getBankList(): Promise<Bank[]> {
        const config = {
            method: 'get',
            url: `${this.apiUrl}/banks`,
        }

        return await axios
            .request(config)
            .then((response) => {
                return response.data.data as Bank[]
            })
            .catch((error) => {
                throw new Error(`Failed to fetch bank list: ${error.message}`)
            })
    }

    public async createPayment(request: CreatePaymentRequet): Promise<FPXCreatePaymentRequest> {
        const config = {
            method: 'post',
            url: `${this.apiUrl}/create`,
            data: request,
        }

        return await axios
            .request(config)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => {
                throw new Error(`Failed to create FPX payment request: ${error.message}`)
            })
    }

    public async getReceiptPayment(
        request: GetPaymentReceiptRequest,
    ): Promise<GetPaymentDetailsResponse> {
        const config = {
            method: 'get',
            url: `${this.apiUrl}/receipt-details`,
            params: request,
        }

        return await axios
            .request(config)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => {
                throw new Error(`Failed to get payment receipt: ${error.message}`)
            })
    }
}
