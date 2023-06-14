<template>
  <div>
    <Navbar />
    <div class="max-w-screen-xl mx-auto py-5 pb-32">
      <div v-if="allProduct.isLoading">
        <div class="flex justify-center items-center h-[80vh]">
          Loading...
        </div>
      </div>
      <div v-else-if="allProduct.isError">
        <div class="flex justify-center items-center h-[80vh]">
          {{ allProduct.errorMessage }}
        </div>
      </div>
      <div v-else>
        <div class="mb-4 flex justify-between px-2">
          <div>
            <!-- <input v-model="form.customerName" type="search" class="py-3 px-6 rounded-lg border border-gray-600 w-64" placeholder="Enter Customer Name" /> -->
          </div>
          <form @submit.prevent="handleSearch" class="flex items-center">
            <input v-model="search" type="search" class="py-3 px-6 rounded-lg border border-gray-600 w-64" placeholder="Search something" />
            <button class="py-3 px-6 rounded-lg bg-blue-500 text-white ml-2 hover:bg-blue-600 duration-150">Search</button>
          </form>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div v-for="(item, index) in allProduct.data" :key="index" class="col-span-1 p-2">
          <CardProduct :product="item" @on-selected="selectProduct" />
        </div>
        </div>
      </div>
    </div>
    <div v-if="form.data.length > 0" class="fixed bottom-0 bg-white py-4 md:py-5 w-full border shadow px-3 md:px-8 lg:px-20 xl:px-40 flex justify-between items-center">
      <h1 class="text-base md:text-xl font-semibold">
        Total: {{ currency(total) }}
      </h1>
      <div class="flex items-center space-x-3">
        <button @click="handleReset" class="py-2 md:py-3 px-4 md:px-7 rounded-lg bg-red-500 text-white hover:bg-red-600 duration-150">
          RESET
        </button>
        <button @click="handleSubmit" class="py-2 md:py-3 px-4 md:px-7 rounded-lg bg-blue-500 text-white hover:bg-blue-600 duration-150">
          SUBMIT
        </button>
      </div>
    </div>
    <div v-if="modal.payment.status">
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full md:w-[75vw] lg:w-[50vw]">
                <div class="bg-white p-4">
                  <div class="flex justify-between items-center">
                    <h1 class="text-xl font-semibold">PEMBAYARAN</h1>
                    <div>
                      <button 
                        @click="cancelPayment"
                        type="button" 
                        class="inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 sm:ml-3 sm:w-auto">
                        Batal
                      </button>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <div class="flex flex-col space-y-4 h-80 overflow-y-scroll">
                    <div v-for="(item, index) in form.data" :key="index" class="">
                      <div class="flex justify-between items-center space-x-3">
                        <div class="flex items-center space-x-3">
                          <img 
                            :src="item.picture" 
                            class="object-cover h-16 w-16 rounded-lg shadow border" alt="" srcset="">
                          <div>
                            <h1 class="text-lg font-semibold">{{ item.name }}</h1>
                            <p>{{ currency(item.price) }}</p>
                          </div>
                        </div>
                        <div>
                          <h1 class="text-base font-semibold bg-blue-100 rounded-md px-3 py-2">
                            X {{ item.qty }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="p-4 flex justify-between items-center space-x-3">
                  <div>
                    <h1 class="text-lg font-semibold">
                      {{ currency(paid) }} / {{ currency(total) }}
                    </h1>
                  </div>
                  <div>
                  </div>
                </div>
                <hr />
                <div class="p-4">
                    <form @submit.prevent="checkMoney" class="flex justify-between items-center space-x-3">
                      <input type="number" v-model="money" class="py-3 px-6 border border-black shadow rounded-lg w-full" placeholder="Enter Money" />
                      <button class="ml-2 py-3 px-6 rounded-lg border border-black bg-gray-100 text-black duration-150 hover:bg-gray-300">Check</button>
                    </form>
                  <div class="mt-2 p-2 rounded-md bg-blue-200">
                    Info: {{ information }}
                  </div>
                </div>
                <div class="p-4">
                  <button v-if="paid < total"
                    type="button" 
                    class="inline-flex w-full justify-center rounded-md bg-gray-200 px-6 py-3 font-semibold text-black shadow-sm">
                    SILAHKAN LENGKAPI PEMBAYARAN
                  </button>
                  <button 
                    v-else
                    @click="handleProcessPayment"
                    type="button" 
                    class="inline-flex w-full justify-center rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-600">
                    PROSES PEMBAYARAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div v-if="modal.message.status">
      <ModalMessage @on-close="modal.message.status = false" :header="modal.message.header" :body="modal.message.body" />
    </div>
    <div v-if="modal.success.status">
      <ModalSuccess @on-close="closeModalSuccess" :header="modal.success.header" :body="modal.success.body" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters,mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';
import ModalMessage from './components/modals/Message.vue';
import ModalSuccess from "./components/modals/Success.vue"
import CardProduct from './components/CardProduct.vue';
import { IProduct } from './store/product/interface';
import {formatCurrency} from "./helpers/currency"
interface ITransactionProduct extends IProduct{
  qty: number
}
export default defineComponent({
  data() {
    return {
      search: "",
      page: 1,
      limit: 10,
      modal: {
        payment: {
          status: false,
          header: "",
          body: ""
        },
        message: {
          status: false,
          header: "",
          body: ""
        },
        success: {
          status: false,
          header: "",
          body: ""
        }
      },
      form: {
        customerName: "",
        pay: [],
        data: []
      },
      total: 0,
      money: 0,
      permittedDenominations: [2000,5000,10000,20000,50000],
      information: "Pecahan yang dibolehkan adalah 2,000, 5,000, 10,000, 20,000, 50,000"
    }
  },
  components: {
    Navbar,
    CardProduct,
    ModalMessage,
    ModalSuccess
  },
  computed: {
    ...mapGetters({
      allProduct: "product/getAllProduct"
    }),
    paid() {
      return this.form.pay.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
    }
  },
  methods: {
    ...mapActions({
      getAllProduct: "product/getAllProduct",
      insertTransaction: "transaction/insertTransaction"
    }),
    currency(value: number) {
      return formatCurrency(value, "IDR")
    },
    handleSearch() {
    this.getAllProduct({search: this.search, page: this.page, limit: this.limit})
    },
    selectProduct(product: IProduct) {
      if (this.form.data.length === 0) {
        this.form.data = [
          {
            ...product,
            productId: product.id,
            qty: 1,
          }
        ]
        this.total = product.price
      } else {
        const productExist = this.form.data.find((e: ITransactionProduct) => e.id === product.id)
        if (productExist) {
          if (product.stock <= productExist.qty) {
            this.modal.message.status = true
            this.modal.message.header = "Terjadi kesalahan"
            this.modal.message.body = "Stock tidak mencukupi"
            return
          }
          const newData = this.form.data.map((e: ITransactionProduct) => {
            if (e.id === product.id) {
              return {
                ...e,
                qty: e.qty + 1
              }
            }
            return e
          })
          this.form.data = newData
          this.total += product.price
        } else {
          this.form.data = [
            ...this.form.data,            
            {
              ...product,
              productId: product.id,
              qty: 1
            }
          ]
          this.total += product.price
        }
      }
    },
    handleReset() {
      this.form.data = []
      this.total = 0
    },
    async handleSubmit() {
      this.modal.payment.status = true
    },
    cancelPayment() {
      this.modal.payment.status = false
      this.money = 0
      this.form.pay = []
    },
    checkMoney() {
      if (!this.permittedDenominations.includes(this.money)) {
        this.modal.message.status = true
        this.modal.message.header = "Terjadi kesalahan"
        this.modal.message.body = this.information
      } else {
        this.form.pay = [...this.form.pay,this.money]
        this.money = 0
      }
    },
    async handleProcessPayment() {
      try {
        const response = await this.insertTransaction(this.form)
        this.modal.success.status = true
        this.modal.success.header = "Success"
        this.modal.success.body = {
          text: response.message,
          total: this.total,
          paid: this.paid,
          change: this.paid - this.total
        }
      } catch (error: any) {
        this.modal.message.status = true
        this.modal.message.header = "Terjadi kesalahan"
        this.modal.message.body = error.response.data.message
      }
    },
    closeModalSuccess() {
      window.location.reload();
    }
  },
  mounted() {
    this.getAllProduct({search: this.search, page: this.page, limit: this.limit})
  },
})
</script>