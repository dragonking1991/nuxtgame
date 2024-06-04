<script setup>
import "swiper/scss";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const { infos, theme, nav, page, shadow, overflow, space } = defineProps({
  theme: "black",
  infos: Array,
  nav: false,
  space: 0,
  page: false,
  shadow: false,
  overflow: false,
});

const $router = useRouter();

const redirect = () => {
  $router.push({
    path: "/wonNotification",
  });
};

const pageOption = {
  clickable: true,
};

const style = computed(() => {
  return theme === "black" ? "text-white bg-black" : "text-black bg-white";
});

const themeIcon = computed(() => {
  return theme === "black" ? "white" : "black";
});
</script>

<template>
  <Swiper
    class="mySwiper"
    :class="{ 'overflow-none': overflow }"
    :modules="[Pagination, Autoplay, Navigation]"
    :navigation="nav"
    :space-between="space"
    :pagination="page ? pageOption : false"
    centeredSlides
    slides-per-view="1"
    auto-height
    effect="fade"
  >
    <SwiperSlide v-for="(item, index) in infos" :key="index" :class="{ 'shadow-lg': shadow }">
      <div class="overflow-hidden relative bg-green aspect-[4/3]">
        <img
          v-if="item.img"
          :src="item.img"
          :alt="item.head"
          class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-full max-h-full object-cover"
        />
      </div>
      <div :class="['text-left p-5', style]">
        <h3 class="mb-3 text-xl font-bold" v-if="item.head">{{ item.head }}</h3>
        <p v-if="item.status" class="font-bold mb-2">{{ item.status }}</p>
        <p v-if="item.desc">{{ item.desc }}</p>
        <a
          :href="item.link"
          v-if="item.link"
          class="flex items-center mt-4 font-bold"
          @click="redirect"
        >
          Get prize
          <IconsArrowRight :theme="themeIcon" class="ml-2" />
        </a>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.overflow-none {
  overflow: visible !important;
}

:deep(.swiper-slide) {
  width: 100% !important;
  height: 100%;
}

:deep(.swiper-pagination) {
  display: flex;
  justify-content: center;
}

:deep(.swiper-pagination-bullet) {
  width: 18px;
  height: 18px;
  display: block;
  margin: 30px 5px 0;
  border: 1px solid #000;
  background: #fff;
  border-radius: 100%;
  transition: all 0.3s;
  cursor: pointer;
}

:deep(.swiper-pagination-bullet-active) {
  border: 1px solid #000;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 71%;
    height: 71%;
    background: #000;
    border-radius: 100%;
  }
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  border-radius: 100%;
  background: #ffd100;
  width: 40px;
  height: 40px;
  display: flex;
  top: 32%;
  justify-content: center;
  align-items: center;

  &::after {
    font-size: 16px;
    font-weight: bold;
    color: black;
  }
}
</style>