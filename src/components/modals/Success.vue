<template>
  <div>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{{ header }}</h3>
                  <div class="mt-2">
                    <p class="text-base text-gray-900">
                      {{ body.text }}
                    </p>
                    <p class="text-base text-gray-900">
                      Total Transaksi: {{ currency(body.total) }}
                    </p>
                    <p class="text-base text-gray-900">
                      Terbayar: {{ currency(body.paid) }}
                    </p>
                    <p class="text-base text-gray-900">
                      Kembali: {{ currency(body.change) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button @click="handleClose" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {formatCurrency} from "../../helpers/currency"
export default defineComponent({
  props: {
    header: {
      type: String,
      required: true
    },
    body: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('on-close')
    },
    currency(value: number) {
      return formatCurrency(value, "IDR")
    },
  },
})
</script>