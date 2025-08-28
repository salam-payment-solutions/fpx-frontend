<script lang="ts" setup>
import MainLayout from '@/components/layouts/MainLayout.vue'
// import { PaymentMessageToken } from '@/enums/payment/payment-message-token'
// import { PaymentStatus } from '@/enums/payment/PaymentStatus.enum'
import type { GetPaymentResponse } from '@/models/payment/GetPaymentResponse.model.ts'
import { onMounted, ref, watch } from 'vue'
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

const initialValues = {
    transactionId: '',
    exchangeOrderNo: '',
    orderNo: '',
    referenceNo: '',
    description: '',
    type: '',
    payerEmail: '',
    payerPhone: '',
    payerName: '',
    sellerId: '',
    exchangeId: '',
    status: '',
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
const isFirst = ref(true)

const getPayments = () => {
    paymentService
        .getPayments(pagination.value.currentPage - 1, pagination.value.pageSize)
        .then((response) => {
            console.log('Fetched payments:', response)
            pagination.value.total = response.totalCount
            payments.value = response.data ?? []
        })
        .catch((error) => {
            console.error('Error fetching payments:', error)
        })
}

watch(
    [pagination],
    () => {
        if (isFirst.value) {
            isFirst.value = false
            return
        }

        getPayments()
    },
    { deep: true },
)

onMounted(() => {
    getPayments()
})
</script>

<template>
    <MainLayout>
        <div class="p-4">
            <h1 class="text-2xl font-bold">Payment</h1>
            <div class="rounded-md p-4 bg-white shadow mt-4">
                <div class="flex gap-4">
                    <div
                        class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-x-4"
                        :class="{ 'is-hidden': !isExpanded }"
                    >
                        <div>
                            <label for="transactionId">Transaction ID</label>
                            <Input v-model="query.transactionId" />
                        </div>
                        <div>
                            <label for="exchangeOrderNo">Exchange Order No</label>
                            <Input v-model="query.exchangeOrderNo" />
                        </div>
                        <div>
                            <label for="orderNo">Order No</label>
                            <Input v-model="query.orderNo" />
                        </div>
                        <div>
                            <label for="referenceNo">Reference No</label>
                            <Input v-model="query.referenceNo" />
                        </div>
                        <div>
                            <label for="type">Type</label>
                            <Input v-model="query.type" />
                        </div>
                        <div>
                            <label for="payerEmail">Payer Email</label>
                            <Input v-model="query.payerEmail" />
                        </div>
                        <div>
                            <label for="payerPhone">Payer Phone</label>
                            <Input v-model="query.payerPhone" />
                        </div>
                        <div>
                            <label for="payerName">Payer Name</label>
                            <Input v-model="query.payerName" />
                        </div>
                        <div>
                            <label for="sellerId">Seller ID</label>
                            <Input v-model="query.sellerId" />
                        </div>
                        <div>
                            <label for="exchangeId">Exchange ID</label>
                            <Input v-model="query.exchangeId" />
                        </div>
                        <div>
                            <label for="status">Status</label>
                            <Input v-model="query.status" />
                        </div>
                    </div>
                    <Button variant="outline" @click="isExpanded = !isExpanded" class="mt-6">
                        <ChevronDown v-if="!isExpanded" />
                        <ChevronUp v-if="isExpanded" />
                    </Button>
                </div>
            </div>
            <div class="flex justify-end gap-2 mt-4">
                <Button class="w-32 shadow">Search</Button>
                <Button variant="outline" class="w-32 shadow">Clear</Button>
            </div>
            <div class="rounded-md shadow-md mt-4 bg-white p-4">
                <Table class="overflow-auto min-w-7xl">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction Id</TableHead>
                            <TableHead>Exchange Order No</TableHead>
                            <TableHead>Order No</TableHead>
                            <TableHead>Reference No</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Payer Email</TableHead>
                            <TableHead>Payer Phone</TableHead>
                            <TableHead>Payer Name</TableHead>
                            <TableHead>Seller ID</TableHead>
                            <TableHead>Exchange ID</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="payment in payments" :key="payment.transactionId">
                            <TableCell>
                                {{ payment.transactionId }}
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

                <div class="flex justify-end mt-4">
                    <SharedPagination v-model:value="pagination" />
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
.is-hidden :deep(div:nth-of-type(n + 5)) {
    display: none;
}
</style>
