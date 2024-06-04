<script setup>
const $router = useRouter();

const redirectWallet = () => {
  $router.push({
    path: "/giftWallet",
  });
};
</script>

<template>
  <div class="bg-black text-white text-center p-4 m-4 mt-10">
    <h3 class="mb-4 text-xl font-uh">Have you redeemed your prize yet?</h3>
    <Button theme="black" type="full" @click="redirectWallet"
      >Check your wallet</Button
    >
  </div>
</template>
