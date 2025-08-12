import type { DefaultStatus } from '@/shared/enums/DefaultStatus.enum'

export interface Bank {
    id: number
    name: string
    code: string
    displayName: string
    isB2C: boolean
    isB2B: boolean
    status: DefaultStatus
}
