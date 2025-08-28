import { AppConfig } from '@/config/app.config'
import type { Bank } from '@/models/payment/Bank.model'
import type { CreatePaymentRequet } from '@/models/payment/CreatePaymentRequet.model'
import type { FPXCreatePaymentRequest } from '@/models/payment/FPXCreatePaymentRequest.model'
import type { GetPaymentResponse } from '@/models/payment/GetPaymentResponse.model'
import type { GetPaymentReceiptRequest } from '@/models/payment/GetPaymentReceiptRequest.model'
import axios from 'axios'
import type { PaginatedResponse } from '@/models/shared/paginated-response.model'

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

    public async getReceiptPayment(request: GetPaymentReceiptRequest): Promise<GetPaymentResponse> {
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

    public async getPayments(
        skip: number,
        take: number,
    ): Promise<PaginatedResponse<GetPaymentResponse>> {
        const url = new URL(this.apiUrl)

        url.searchParams.append('skip', skip.toString())
        url.searchParams.append('take', take.toString())

        const config = {
            method: 'get',
            url: `${url}`,
        }

        return await axios
            .request(config)
            .then((response): PaginatedResponse<GetPaymentResponse> => {
                return response.data
            })
            .catch((error) => {
                throw new Error(`Failed to get payments: ${error.message}`)
            })
    }
}
