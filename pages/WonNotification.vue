<script setup>
const $router = useRouter();

const redirect = () => {
  $router.push({
    path: "/uploadReceipt",
  })
};
</script>

<template>
  <div class="bg-green p-4">
    <div class="ratio-square mb-4">
      <img src="../public/assets/images/voucher.png" />
    </div>
    <h2 class="text-xl font-bold mb-4">Wait, we have a surprise for you!</h2>
    <p>
      You just won a prize for being one of the 140,000 earliest participants.
    </p>
    <Button type="full" class="my-8" @click="redirect"
      >Continue to upload receipt</Button
    >
  </div>
</template>

<style scoped lang="scss"></style>
