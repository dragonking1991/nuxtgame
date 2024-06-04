<script setup>
import {
  acceptReservedVouchers,
  rejectReservedVoucher,
} from "../utils/servicesAdmin";

const inputAccept = ref(null);
const inputReject = ref(null);
</script>

<template>
  <div
    class="fixed w-full h-full top-0 left-0 bg-green flex justify-center items-center p-4"
  >
    <div class="flex flex-col">
      <h2 class="text-center font-bold mb-10">ADMIN PAGE</h2>


      <h3>Accept</h3>
      <input class="border" type="text" ref="inputAccept" />
      <button
        class="p-2 px-4 my-2 bg-black text-white uppercase font-bold rounded-lg"
        @click="acceptReservedVouchers(inputAccept.value)"
      >
        Accept Vouchers
      </button>
      <h3 class="mt-10">Reject</h3>
      <input class="border" type="text" ref="inputReject" />
      <button
        class="p-2 px-4 my-2 bg-black text-white uppercase font-bold rounded-lg"
        @click="rejectReservedVoucher(inputReject.value)"
      >
        Reject Vouchers
      </button>
    </div>
  </div>
</template>
