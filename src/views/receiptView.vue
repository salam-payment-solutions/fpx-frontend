<template>
    <div class="flex min-h-screen min-w-screen bg-gray-100 p-4">
        <div class="max-w-lg w-full my-auto mx-auto p-6 bg-white rounded shadow h-fit">
            <div class="w-20 h-20 mx-auto">
              <CircleCheck v-if="receipt?.status === PaymentStatus.COMPLETED" class="w-full h-full text-primary" />
              <CircleX v-else-if="receipt?.status === PaymentStatus.FAILED" class="w-full h-full text-danger" />
              <CircleExclamation v-else class="w-full h-full text-yellow-400" />
            </div>
            <h1 class="text-2xl font-bold text-center capitalize">Payment {{ receipt?.status?.toString().toLowerCase() || 'Pending' }}</h1>
            <hr class="my-4" />
            <div>
              <p>Transaction Date</p>
              <p class="text-base font-semibold">{{ format(receipt?.updatedAt ?? new Date(), 'dd MMM YYY, hh:mm a') }}</p>
            </div>
            <div class="mt-4">
              <p>Transaction Amount</p>
                <p class="text-base font-semibold">RM {{ Number(receipt?.amount ?? 0).toFixed(2) }}</p>
            </div>
            <div class="mt-4">
              <p>Reference Number</p>
              <p class="text-base font-semibold">{{ receipt.orderNo }}</p>
            </div>
            <div class="mt-4">
              <p>FPX Transaction ID</p>
              <p class="text-base font-semibold">{{ receipt.transactionId || '-' }}</p>
            </div>
            <div class="mt-4">
              <p>Buyer Bank Name</p>
              <p class="text-base font-semibold">{{ receipt.bank?.displayName || '-' }}</p>
            </div>
            <Button type="button" class="mt-8 w-full"> Download Receipt </Button>
            <a href="/">
              <Button type="button" class="mt-2 w-full text-primary bg-white border border-primary hover:opacity-50 hover:bg-white"> Back to Home </Button>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FPXDirectPaymentResponse } from '@/models/payment/FPXDirectPaymentResponse.model';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PaymentService } from '@/services/payment.service';
import type { GetPaymentDetailsResponse } from '@/models/payment/GetPaymentDetailsResponse.model';
import { PaymentMessageToken } from '@/enums/payment/payment-message-token';
import CircleCheck from "@/assets/images/circle-check.svg";
import CircleX from "@/assets/images/circle-x.svg";
import CircleExclamation from "@/assets/images/circle-exclaimation.svg";
import { PaymentStatus } from '@/enums/payment/PaymentStatus.enum';
import { format } from 'date-fns';

// get query params from url
const route = useRoute();
const paymentService = new PaymentService();

const query = route.query as unknown as FPXDirectPaymentResponse;

onMounted(async () => {
  await getPaymentReceipt();
});

const receipt = ref<GetPaymentDetailsResponse>({
  amount: 0,
  updatedAt: new Date().toLocaleString(),
  exchangeOrderNo: '',
  orderNo: '',
  referenceNo: '',
  description: '',
  type: PaymentMessageToken.B2C,
  payerEmail: '',
  payerPhone: '',
  payerName: '',
  sellerId: '',
  exchangeId: ''
});

const getPaymentReceipt = async () =>{
  console.log('running');
  receipt.value = await paymentService.getReceiptPayment({
    transactionId: query.fpx_fpxTxnId,
    orderNo: query.fpx_sellerOrderNo,
    exchangeOrderNo: query.fpx_sellerExOrderNo,
  })
}
</script>
