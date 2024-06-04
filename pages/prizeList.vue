<script setup>
import {
  loginRedirect,
  signUpRedirect,
  getProfile,
  redeemPrize,
} from "../utils/services";

const $router = useRouter();

const redirectWinner = () => {
  $router.push({
    path: "/winner",
  });
};

const back = () => {
  $router.push({
    path: "/",
  });
};

const sliders = [
  {
    img: "assets/images/Hero.png",
    head: "Prize Product",
    sub: "Subtitle",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    status: "100",
    link: "#",
  },
  {
    img: "assets/images/can.jpg",
    head: "Prize Product",
    sub: "Subtitle",
    desc: "Lorem issum",
    status: "0",
    link: "#",
  },
  {
    img: "assets/images/lid.png",
    head: "Prize Product",
    sub: "Subtitle",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "70",
    link: "#",
  },
];
</script>

<template>
  <div class="flex flex-col relative overflow-x-hidden bg-green py-5">
    <img src="../public/assets/images/chill.jpg" />

    <div class="text-center p-4">
      <h3 class="mb-4 text-xl font-uh font-bold">April Special Prize</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
      </p>
      <Button theme="yellow" type="full" @click="redirectWinner" class="mt-5"
        >View March winners</Button
      >
    </div>
  </div>

  <div class="py-8">
    <h2 class="text-xxl font-bold">
      Discover more prizes and pick out your favourite drink.
    </h2>
    <h3 class="text-xl my-8 font-bold">Categories name</h3>
    <div class="px-0">
      <SwiperPrize
        :infos="sliders"
        theme="white"
        :page="true"
        :nav="true"
        :space="20"
        overflow="true"
        aspectImg="square"
      />
    </div>

    <h3 class="text-xl my-8">Categories name</h3>
    <div class="px-0">
      <SwiperPrize
        :infos="sliders"
        theme="white"
        :page="true"
        :nav="true"
        :space="20"
        overflow="true"
        aspectImg="square"
      />
    </div>

    <h3 class="text-xl my-8">Categories name</h3>
    <div class="px-0">
      <SwiperPrize
        :infos="sliders"
        theme="white"
        :page="true"
        :nav="true"
        :space="20"
        overflow="true"
        aspectImg="square"
      />
    </div>
  </div>

  <Faq />

  <Button @click="back">Back to main page</Button>
</template>

<style scoped lang="scss"></style>
