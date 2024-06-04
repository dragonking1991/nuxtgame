<script setup>
import "swiper/scss";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
const $router = useRouter();

const back = () => {
  $router.push({
    path: "/",
  });
};

const list = [
  {
    title: "March winners",
    winners: [
      {
        img: "assets/images/bottle2.png",
        name: "Winner name",
        desc: "Prize description",
      },
      {
        img: "assets/images/bottle2.png",
        name: "Winner name",
        desc: "Prize description",
      },
    ],
  },
  {
    title: "April winners",
    winners: [
      {
        img: "assets/images/bottle2.png",
        name: "Winner name",
        desc: "Prize description",
      },
      {
        img: "assets/images/bottle2.png",
        name: "Winner name",
        desc: "Prize description",
      },
    ],
  },
];
</script>

<template>
  <div class="bg-green p-4">
    <img src="../public/assets/images/chill2.png" />
  </div>

  <Swiper
    :modules="[Navigation]"
    :centeredSlides="true"
    :slides-per-view="1"
    :navigation="true"
  >
    <SwiperSlide v-for="(item, index) in list" :key="index">
      <h3 class="text-xl font-bold my-10">{{item.title}}</h3>
      <div class="mb-10" v-for="(person, idx) in item.winners" :key="idx">
        <div class="ratio-square mb-4">
          <img :src="person.img" class="w-full" />
        </div>
        <h3 class="text-xl font-bold">{{person.name}}</h3>
        <p>{{person.desc}}</p>
      </div>
    </SwiperSlide>
  </Swiper>

  <Button class="my-8" @click="back"> Back to main page </Button>
</template>

<style scoped lang="scss">
:deep() {
  .swiper-slide {
    width: 100% !important;
  }

  .swiper-button-next,
  .swiper-button-prev {
    border-radius: 100%;
    background: #ffd100;
    width: 40px;
    height: 40px;
    display: flex;
    top: 60px;
    justify-content: center;
    align-items: center;
    &::after {
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
  }
}
</style>
