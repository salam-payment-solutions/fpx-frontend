<script lang="ts" setup>
import MainLayout from '@/components/layouts/MainLayout.vue'
// import { PaymentMessageToken } from '@/enums/payment/payment-message-token'
// import { PaymentStatus } from '@/enums/payment/PaymentStatus.enum'
import type { GetPaymentResponse } from '@/models/payment/GetPaymentResponse.model.ts'
import { onMounted, ref, watch } from 'vue'
// Simple debounce implementation
function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (...args: any[]) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { PaymentService } from '@/services/payment.service'
import type { Pagination } from '@/models/shared/pagination.model'
import SharedPagination from '@/components/shared/SharedPagination.vue'
import { PaymentMessageToken } from '@/enums/payment/payment-message-token'
import SharedMultiSelect from '@/components/shared/SharedMultiSelect.vue'
import type { Dropdown } from '@/models/shared/dropdown.model'
import { PaymentStatus } from '@/enums/payment/PaymentStatus.enum'
import type { GetPaymentQuery } from '@/models/payment/GetPaymentQuery.model'
import { Form } from 'vee-validate'

const initialValues = {
    transactionId: '',
    exchangeOrderNo: '',
    orderNo: '',
    referenceNo: '',
    description: '',
    type: [] as Dropdown<string>[],
    payerEmail: '',
    payerPhone: '',
    payerName: '',
    sellerId: '',
    exchangeId: '',
    status: [] as Dropdown<string>[],
}

const paymentService = new PaymentService()

const isExpanded = ref(false)
const query = ref(initialValues)
const pagination = ref<Pagination>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
})
const payments = ref<GetPaymentResponse[]>([])
const paymentTypeOptions = Object.values(PaymentMessageToken).map((type) => ({
    label: type,
    value: type,
})) as Dropdown<string>[]
const paymentStatusOptions = Object.entries(PaymentStatus).map(([key, _]) => ({
    label: key,
    value: key,
})) as Dropdown<string>[]

onMounted(() => {
    getPayments()
})

const resetFilters = () => {
    query.value = { ...initialValues }
}

const getPayments = () => {
    const sendQuery: GetPaymentQuery = {
        ...query.value,
        type: query.value.type.map((t) => t.value),
        status: query.value.status.map((s) => s.value),
    }
    paymentService
        .getPayments(
            (pagination.value.currentPage - 1) * pagination.value.pageSize,
            pagination.value.pageSize,
            sendQuery,
        )
        .then((response) => {
            pagination.value.total = response.totalCount
            payments.value = response.data ?? []
        })
        .catch((error) => {
            console.error('Error fetching payments:', error)
        })
}

const debouncedGetPayments = debounce(getPayments, 500)
</script>

<template>
    <MainLayout>
        <Form @submit="getPayments" class="p-4">
            <h1 class="text-2xl font-bold">Payment</h1>
            <div class="rounded-md p-4 bg-white shadow mt-4">
                <div class="flex gap-4">
                    <div
                        class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-x-4"
                        :class="{ 'is-hidden': !isExpanded }"
                    >
                        <div>
                            <label class="text-xs" for="transactionId">Transaction ID</label>
                            <Input v-model="query.transactionId" />
                        </div>
                        <div>
                            <label class="text-xs" for="exchangeOrderNo">Exchange Order No</label>
                            <Input v-model="query.exchangeOrderNo" />
                        </div>
                        <div>
                            <label class="text-xs" for="orderNo">Order No</label>
                            <Input v-model="query.orderNo" />
                        </div>
                        <div>
                            <label class="text-xs" for="referenceNo">Reference No</label>
                            <Input v-model="query.referenceNo" />
                        </div>
                        <div>
                            <label class="text-xs" for="type">Payment Type</label>
                            <SharedMultiSelect
                                v-model="query.type"
                                :options="paymentTypeOptions"
                                popover-trigger-class="w-full"
                            />
                        </div>
                        <div>
                            <label class="text-xs" for="payerEmail">Payer Email</label>
                            <Input v-model="query.payerEmail" />
                        </div>
                        <div>
                            <label class="text-xs" for="payerPhone">Payer Phone</label>
                            <Input v-model="query.payerPhone" />
                        </div>
                        <div>
                            <label class="text-xs" for="payerName">Payer Name</label>
                            <Input v-model="query.payerName" />
                        </div>
                        <div>
                            <label class="text-xs" for="sellerId">Seller ID</label>
                            <Input v-model="query.sellerId" />
                        </div>
                        <div>
                            <label class="text-xs" for="exchangeId">Exchange ID</label>
                            <Input v-model="query.exchangeId" />
                        </div>
                        <div>
                            <label class="text-xs" for="status">Status</label>

                            <SharedMultiSelect
                                v-model="query.status"
                                :options="paymentStatusOptions"
                                popover-trigger-class="w-full"
                            />
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        @click="isExpanded = !isExpanded"
                        class="mt-6"
                    >
                        <ChevronDown v-if="!isExpanded" />
                        <ChevronUp v-if="isExpanded" />
                    </Button>
                </div>
            </div>
            <div class="flex justify-end gap-2 mt-4">
                <Button class="w-32 shadow" type="button">Search</Button>
                <Button @click="resetFilters" variant="outline" class="w-32 shadow" type="reset"
                    >Clear</Button
                >
            </div>
            <div class="rounded-md shadow-md mt-4 p-4 bg-white">
                <Table class="overflow-auto min-w-7xl">
                    <TableHeader>
                        <TableRow>
                            <TableHead class="!text-gray-400/80 !font-bold"
                                >Transaction Id</TableHead
                            >
                            <TableHead class="!text-gray-400/80 !font-bold"
                                >Exchange Order No</TableHead
                            >
                            <TableHead class="!text-gray-400/80 !font-bold">Order No</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Reference No</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Type</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Payer Email</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Payer Phone</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Payer Name</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Seller ID</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Exchange ID</TableHead>
                            <TableHead class="!text-gray-400/80 !font-bold">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="payment in payments" :key="payment.transactionId">
                            <TableCell>
                                {{ payment.transactionId || '-' }}
                            </TableCell>
                            <TableCell>{{ payment.exchangeOrderNo }}</TableCell>
                            <TableCell>{{ payment.orderNo }}</TableCell>
                            <TableCell>{{ payment.referenceNo }}</TableCell>
                            <TableCell>{{ payment.type }}</TableCell>
                            <TableCell>{{ payment.payerEmail }}</TableCell>
                            <TableCell>{{ payment.payerPhone }}</TableCell>
                            <TableCell>{{ payment.payerName }}</TableCell>
                            <TableCell>{{ payment.sellerId }}</TableCell>
                            <TableCell>{{ payment.exchangeId }}</TableCell>
                            <TableCell>{{ payment.status }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div class="flex justify-end items-center mt-4">
                    <SharedPagination
                        :value="pagination"
                        @update:modelValue="
                            (newValue: Pagination) => {
                                pagination = newValue
                                getPayments()
                            }
                        "
                    />
                </div>
            </div>
        </Form>
    </MainLayout>
</template>

<style scoped>
.is-hidden :deep(div:nth-of-type(n + 5)) {
    display: none;
}
</style>
