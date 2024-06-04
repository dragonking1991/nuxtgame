<script setup>
const $router = useRouter();

const back = () => {
  $router.push({
    path: "/",
  });
};

const sliders = [
  {
    img: "assets/images/lid.png",
    head: "One year's supply of Coca-Cola",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Claimed",
  },
  {
    img: "assets/images/sprite-bottle.png",
    head: "Set of Fanta Merch",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Available",
  },
  {
    img: "assets/images/lid.png",
    head: "Tickets for Coachella",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Claimed",
  },
];
</script>

<template>
  <div class="bg-green p-4">
    <img src="../public/assets/images/chill2.png" />
  </div>
  <div class="p-10">
    <h3 class="text-xl font-bold">Your rewards</h3>
    <p>Explore your current prizes.</p>
  </div>
  <div class="px-4 mb-8">
    <SwiperSlider
      :infos="sliders"
      theme="white"
      :page="true"
      shadow="true"
      overflow="true"
      :space="20"
    />
  </div>

  <Button type="full" @click="back">Back to main page</Button>
</template>

<style scoped lang="scss"></style>
