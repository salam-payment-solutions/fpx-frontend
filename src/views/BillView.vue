Build your form Based on last step we can either use
<Form />
component or useForm composable useForm is recommended because values are typed automatically vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ref } from 'vue'

const formSchema = toTypedSchema(
    z.object({
        amount: z.coerce.number().min(1).default(0),
        email: z.string().email().max(50),
        name: z.string().min(2).max(100),
        phone: z.string().min(10).max(15),
        bank: z.string(),
        agree: z.boolean().refine((val) => val, {
            message: 'You must agree to the terms and conditions',
        }),
    }),
)

const billData = ref({
    title: 'Gym Membership Fee',
    description:
        'Monthly membership payment for full access to gym equipment, personal training sessions, and group fitness classes. Includes locker usage and wellness facilities.',
})

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    alert('form submitted')
    console.log('Form submitted!', values)
})
</script>

<template>
    <div class="flex min-h-screen min-w-screen bg-gray-100">
        <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow h-fit">
            <h1 class="text-2xl font-bold">{{ billData.title }}</h1>
            <p class="mt-2">{{ billData.description }}</p>

            <hr class="my-4" />
            <p class="mb-4 font-semibold">Fill in the details</p>
            <form @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="amount">
                    <FormItem>
                        <FormLabel>Amount (RM)</FormLabel>
                        <div class="flex items-center">
                            <FormControl class="flex-1">
                                <NumberField
                                    :default-value="0"
                                    :min="0"
                                    :max="99999999999999.99"
                                    :step="0.01"
                                    :format-options="{
                                        minimumFractionDigits: 2,
                                    }"
                                >
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
                        <FormLabel class="mt-4">Email</FormLabel>
                        <FormControl>
                            <Input type="email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel class="mt-4">Name</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                    <FormItem>
                        <FormLabel class="mt-4">Phone Number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="0123456789" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="bank">
                    <FormItem>
                        <FormLabel class="mt-4">Bank Selection</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger class="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="agree">
                    <FormItem>
                        <div class="flex mt-4">
                            <FormControl>
                                <Checkbox v-bind="componentField" />
                                <FormLabel for="agree" class="ml-2"
                                    >I agree to the
                                    <a
                                        href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp"
                                        target="_blank"
                                        class="text-primary font-bold underline"
                                        >Terms and Conditions</a
                                    ></FormLabel
                                >
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit" class="mt-4 w-full"> Submit </Button>
                <a href="https://www.paynet.my/personal-fpx.html">
                    <img
                        src="../assets/images/fpx-logo.png"
                        alt="FPX logo"
                        class="h-10 w-auto mt-4 mx-auto"
                    />
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
