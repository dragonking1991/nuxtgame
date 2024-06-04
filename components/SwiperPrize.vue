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
    :class="overflow && 'overflow-none'"
    :modules="[Pagination, Autoplay, Navigation]"
    :navigation="nav"
    :space-between="space"
    :pagination="page ? pageOption : false"
    :centeredSlides="true"
    :slides-per-view="1"
  >
    <SwiperSlide
      v-for="(item, index) in infos"
      :key="index"
      :class="shadow && 'shadow-lg'"
    >
      <div class="relative">
        <div class="overflow-hidden relative bg-green aspect-square">
          <img
            v-if="item.img"
            :src="item.img"
            :alt="item.head"
            class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-full max-h-full object-fit"
          />
        </div>
        <div class="text-left p-5 pt-10 mt-5" :class="style">
          <h3 class="mb-3 text-xl font-bold" v-if="item.head">
            {{ item.head }}
          </h3>
          <p v-if="item.sub" class="font-bold">{{ item.sub }}</p>
          <p v-if="item.desc">{{ item.desc }}</p>

          <div
            class="rounded-[40px] mt-8 mb-2 h-5 bg-[#EFEEED] relative"
            v-if="item.status > 0"
          >
            <span class="absolute right-2 bottom-[100%] text-red">
              {{ `${item.status}% left` }}
            </span>
            <div
              class="absolute top-0 left-0 h-full bg-black rounded-[40px]"
              :style="{ width: `${item.status}%` }"
            ></div>
          </div>

          <Button
            type="full"
            :disabled="~~item.status === 0"
            class="mt-4"
            @click="redirect"
          >
            Action
            <!-- <IconsArrowRight :theme="themeIcon" class="ml-2" /> -->
          </Button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.overflow-none {
  overflow: visible !important;
}
:deep() {
  .swiper-slide {
    width: 100% !important;
    height: 100%;
  }
  .swiper-pagination {
    display: flex;
    justify-content: center;
    z-index: 10;
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    width: 100%;
  }
  .swiper-pagination-bullet {
    width: 18px;
    height: 18px;
    display: block;
    margin: 0 5px;
    border: 1px solid #000;
    background: #fff;
    border-radius: 100%;
    transition: all 0.3s;
    cursor: pointer;
    pointer-events: all;
  }
  .swiper-pagination-bullet-active {
    border: 1px solid #000;
    position: relative;
    &:after {
      content: "";
      display: block;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 71%;
      height: 71%;
      background: #000;
      border-radius: 100%;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    border-radius: 100%;
    background: #ffd100;
    width: 40px;
    height: 40px;
    display: flex;
    top: 30%;
    justify-content: center;
    align-items: center;
    &::after {
      font-size: 15px;
      font-weight: 900;
      color: black;
    }
  }
}
</style>
