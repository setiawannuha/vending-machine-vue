<template>
  <div 
    @click="selectProduct(product)" 
    :class="`p-6 rounded-lg border shadow relative bg-white duration-150  ${product.stock > 0 ? 'cursor-pointer hover:bg-gray-100':''}`"
  >
    <figure class="overflow-hidden">
      <img 
        :src="product.picture" 
        class="object-cover h-48 w-96 rounded-lg" alt="" srcset="">
    </figure>
    <div class="mt-4">
      <h1 class="text-xl font-semibold">{{ product.name }}</h1>
      <p>{{ currency(product.price) }}</p>
      <div v-if="product.stock <= 0" class="absolute top-4 left-4 bg-red-500 text-white rounded-full py-1 px-3">
        Stock Habis
      </div>
      <div v-else class="absolute top-4 right-4 bg-blue-500 text-white rounded-full py-1 px-3">
        {{ product.stock }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {formatCurrency} from "../helpers/currency"
export default defineComponent({
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    currency(value: number) {
      return formatCurrency(value, "IDR")
    },
    selectProduct(product: any) {
      if (product.stock > 0){
        this.$emit('on-selected', product) 
      }
    }
  },
})
</script>