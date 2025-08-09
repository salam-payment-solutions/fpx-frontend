<template>
  <div class="flex min-h-screen min-w-screen bg-gray-100">
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow h-fit">
      <h1 class="text-2xl font-bold mb-6">Fill in Bill Details</h1>
      <form @submit.prevent="submitBill">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Amount</label>
          <input
            v-model="form.amount"
            type="number"
            min="0"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Name</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Phone Number</label>
          <input v-model="form.phone" type="tel" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Bank Selection</label>
          <select v-model="form.bank" class="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select a bank</option>
            <option value="Bank A">Bank A</option>
            <option value="Bank B">Bank B</option>
            <option value="Bank C">Bank C</option>
          </select>
        </div>
        <div class="mb-4 flex items-center">
          <input v-model="form.agree" type="checkbox" id="agree" class="mr-2" required />
          <label for="agree"
            >I agree to the
            <a
              href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp"
              target="_blank"
              class="text-primary font-bold underline"
              >Terms and Conditions</a
            ></label
          >
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
        >
          Submit
        </button>
        <img src="../assets/images/fpx-logo.png" alt="FPX logo" class="h-10 w-auto mt-2 mx-auto" />
        <!-- <div>Online Banking Payment Channel via DuitNow and FPX provided by TOYYIBPAY SDN BHD.</div> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        amount: '',
        email: '',
        name: '',
        phone: '',
        bank: '',
        agree: false,
      },
    }
  },
  methods: {
    submitBill() {
      if (!this.form.agree) {
        alert('You must agree to the terms and conditions.')
        return
      }
      // Handle form submission logic here
      alert('Bill submitted!')
    },
  },
}
</script>

<style scoped>
.max-w-md {
  max-width: 28rem;
}
</style>
