import { AppConfig } from '@/config/app.config'
import type { Bank } from '@/models/payment/Bank.model'
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
}
