<!-- generate simple receipt view after making payment -->
<template>
  <div>
    <h1>Payment Receipt</h1>
    <p>Thank you for your payment!</p>
    <p>Amount: {{ receipt.amount }}</p>
    <p>Date: {{ receipt.updatedAt }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FPXDirectPaymentResponse } from '@/models/payment/FPXDirectPaymentResponse.model';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PaymentService } from '@/services/payment.service';
import type { GetPaymentDetailsResponse } from '@/models/payment/GetPaymentDetailsResponse.model';
import { PaymentMessageToken } from '@/enums/payment/payment-message-token';

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
