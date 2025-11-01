<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { onMounted, ref } from 'vue'
import { PaymentService } from '@/services/payment.service'
import type { Bank } from '@/models/payment/Bank.model'
import { PaymentMessageToken } from '@/enums/payment/payment-message-token'
import type { CreatePaymentRequet } from '@/models/payment/CreatePaymentRequet.model'
import { format } from 'date-fns-tz'
import { PaymentConfig } from '@/config/payment.confiig'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const paymentService = new PaymentService()
const bankList = ref<Bank[]>([])
const paymentTypes = [
    {
        name: 'Personal Banking',
        value: PaymentMessageToken.B2C,
    },
    {
        name: 'Business Banking',
        value: PaymentMessageToken.B2B1,
    },
]
const formSchema = toTypedSchema(
    z.object({
        amount: z.coerce.number().min(1).default(0),
        email: z.string().email().max(50),
        name: z.string().min(2).max(100),
        phone: z.string().min(10).max(15),
        type: z.enum(Object.values(PaymentMessageToken) as [string, ...string[]]),
        bank: z.string(),
        agree: z
            .boolean()
            .optional()
            .refine((value) => value === true, {
                message: 'You must agree to the terms and conditions',
            }),
    }),
)
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        type: PaymentMessageToken.B2C.toString(),
    },
})
const billData = ref({
    imageLink: 'https://i.pinimg.com/736x/eb/23/bf/eb23bfda14bbfe4ad08d6a2b4b4cdb3c.jpg',
    title: 'Gym Membership Fee',
    description: 'Monthly Gym and Wellness Pass',
})

onMounted(async () => {
    bankList.value = await paymentService.getBankList()
})

const onSubmit = form.handleSubmit(async (values) => {
    const formattedDate = format(new Date(), 'yyyyMMddHHmmss', { timeZone: 'UTC' })
    const randomNumber = Math.floor(Math.random() * 10000)

    const referenceNo = `SP${formattedDate}${randomNumber}`

    const request: CreatePaymentRequet = {
        referenceNo: referenceNo,
        description: billData.value.description,
        type: PaymentMessageToken.B2C,
        payerEmail: values.email,
        payerName: values.name,
        payerPhone: values.phone,
        amount: values.amount.toFixed(2),
        bankCode: values.bank,
    }

    await paymentService.createPayment(request).then((response) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', PaymentConfig.FPX_CREATE_PAYMENT_URL)

        let mappedResponse = {
            fpx_msgType: response.fpx_msgType,
            fpx_msgToken: response.fpx_msgToken,
            fpx_sellerExId: response.fpx_sellerExId,
            fpx_sellerExOrderNo: response.fpx_sellerExOrderNo,
            fpx_sellerTxnTime: response.fpx_sellerTxnTime,
            fpx_sellerOrderNo: response.fpx_sellerOrderNo,
            fpx_sellerId: response.fpx_sellerId,
            fpx_sellerBankCode: response.fpx_sellerBankCode,
            fpx_txnCurrency: response.fpx_txnCurrency,
            fpx_txnAmount: response.fpx_txnAmount,
            fpx_buyerEmail: response.fpx_buyerEmail,
            fpx_checkSum: response.fpx_checkSum,
            fpx_buyerName: response.fpx_buyerName,
            fpx_buyerBankId: response.fpx_buyerBankId,
            fpx_buyerBankBranch: response.fpx_buyerBankBranch,
            fpx_buyerAccNo: response.fpx_buyerAccNo,
            fpx_buyerId: response.fpx_buyerId,
            fpx_makerName: response.fpx_makerName,
            fpx_buyerIban: response.fpx_buyerIban,
            fpx_productDesc: response.fpx_productDesc,
            fpx_version: response.fpx_version,
            fpx_eaccountNum: response.fpx_eaccountNum,
            fpx_ebuyerID: response.fpx_ebuyerID,
        }

        Object.entries(mappedResponse).forEach(([key, value]) => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', value || '')
            form.appendChild(input)
        })

        document.body.appendChild(form)

        console.log('form', form);
        form.submit()
    })
})
</script>

<template>
    <div class="flex min-h-screen min-w-screen bg-gray-100 p-4">
        <div class="max-w-md mx-auto p-6 bg-white rounded shadow h-fit">
            <h1 class="text-2xl font-bold">{{ billData.title }}</h1>
            <img :src="billData.imageLink" :alt="billData.title"
                class="w-full h-48 object-contain mt-4 rounded-md border" />
            <p class="mt-4">{{ billData.description }}</p>

            <hr class="my-4" />
            <p class="mb-4 font-semibold">Enter your details to proceed with payment</p>
            <form @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="amount">
                    <FormItem>
                        <FormLabel class="label-required">Amount (RM)</FormLabel>
                        <div class="flex items-center">
                            <FormControl class="flex-1">
                                <NumberField :default-value="0" :min="0" :max="99999999999999.99" :step="0.01"
                                    :format-options="{
                                        minimumFractionDigits: 2,
                                    }">
                                    <NumberFieldContent>
                                        <NumberFieldInput v-bind="componentField" />
                                    </NumberFieldContent>
                                </NumberField>
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel class="mt-4 label-required">Email</FormLabel>
                        <FormControl>
                            <Input type="email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel class="mt-4 label-required">Name</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                    <FormItem>
                        <FormLabel class="mt-4 label-required">Phone Number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="0123456789" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="type">
                    <FormItem>
                        <FormLabel class="mt-4 label-required">Type</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger class="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="payment in paymentTypes" :key="`payment-type-${payment.value}`"
                                        :value="payment.value">{{ payment.name }}</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="bank">
                    <FormItem>
                        <FormLabel class="mt-4 label-required">Bank Selection</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger class="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="bank in bankList" :key="`bank-id-${bank.id}`" :value="bank.code">
                                        {{ bank.displayName }}</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="agree" type="checkbox">
                    <FormItem>
                        <div class="flex mt-4">
                            <FormControl>
                                <Checkbox v-bind="componentField" />
                                <FormLabel class="ml-2 label-required">I agree to the
                                    <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp" target="_blank"
                                        class="text-primary font-bold underline">Terms and Conditions</a>
                                </FormLabel>
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit" class="mt-4 w-full"> Submit </Button>
                <a href="https://www.paynet.my/personal-fpx.html">
                    <img src="@/assets/images/fpx-logo.png" alt="FPX logo" class="h-10 w-auto mt-4 mx-auto" />
                </a>
            </form>
        </div>
    </div>
</template>

<style scoped>
.max-w-md {
    max-width: 28rem;
}
</style>
