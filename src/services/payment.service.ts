import { AppConfig } from '@/config/app.config'
import { PaymentConfig } from '@/config/payment.confiig'
import { PaymentMessageToken } from '@/enums/payment/payment-message-token'
import { PaymentMessageType } from '@/enums/payment/payment-message-type'
import type { FPXGetBanksRequest } from '@/models/payment/FPXGetBanksRequest.model'
import axios from 'axios'

export class PaymentService {
    private apiUrl = `${AppConfig.API_URL}/FPXMain`

    async processPayment(paymentData: any) {
        // Logic to process payment
    }

    public async getBankList() {
        var request: FPXGetBanksRequest = {
            fpx_msgType: PaymentMessageType.AR,
            fpx_msgToken: PaymentMessageToken.B2C,
            fpx_sellerExId: PaymentConfig.FPX_EXCHANGE_ID,
            fpx_version: PaymentConfig.FPX_VERSION,
            fpx_checkSum: '',
        }

        request.fpx_checkSum = this.generateChecksum(request)

        let data = JSON.stringify(request)

        let config = {
            method: 'post',
            url: `${this.apiUrl}/RetrieveBankList`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        }

        await axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    private generateChecksum(request: FPXGetBanksRequest): string {
        // sort request object by key in ascending order and join "|"
        const sortedKeys = Object.keys(request)
            .filter((key) => key !== 'fpx_checkSum')
            .sort()
        const sortedValues = sortedKeys.map((key) =>
            (request as Record<string, any>)[key]?.toString(),
        )
        return sortedValues.join('|')
    }
}
