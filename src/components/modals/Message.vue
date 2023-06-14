<template>
  <div>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                      {{ header }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ body }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white border px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                  @click="handleClose"
                  type="button" 
                  class="inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 sm:ml-3 sm:w-auto">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    header: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('on-close')
    }
  },
})
</script>