<script setup>
import { submitBase64 } from "../utils/services";
const $router = useRouter();

const inputFile = ref(null);
const imgFile = reactive([
  {
    name: "",
    base64: "",
    error: "",
    success: false,
  },
]);

const triggerUpload = () => {
  inputFile.value.click();
};

const back = () => {
  $router.push({
    path: "/",
  });
};
const redirectPrizeList = () => {
  $router.push({
    path: "/prizeList",
  });
};

const photoOnload = () => {
  // submitBase64(imgFile.base64);
};

const changeFile = async (event) => {
  const target = event.target;

  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    const fileSize = file.size;
    imgFile.name = file.name;

    if (fileSize > 5 * 1024 * 1024) {
      imgFile.error = ERRPhotoTooLarge;
      target.value = "";
      return;
    }

    try {
      reader.onload = () => {
        if (inputFile.value) {
          const base64String = reader.result;
          imgFile.base64 = base64String;
          inputFile.value.onload = photoOnload;
          target.value = "";
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error();
    }
  }
};
</script>

<template>
  <h2 class="text-xl font-bold my-6">Your chosen prize</h2>
  <div class="aspect-square">
    <img src="../public/assets/images/bottle2.png" class="w-full" />
  </div>

  <div class="bg-black p-8">
    <h3 class="text-xl font-bold my-2 mb-8 text-white">
      Upload your receipt and win prize
    </h3>

    <div class="bg-white p-4 mb-2">
      <input
        type="file"
        class="hidden"
        ref="inputFile"
        accept="image/*"
        @change="(e) => changeFile(e)"
      />
      <div class="py-4 flex justify-center items-center">
        <img v-if="imgFile.base64" :src="imgFile.base64" alt="image" />
        <IconsUpload v-else />
      </div>
      <p class="mb-8">{{ imgFile.name || "Upload your receipt" }}</p>
      <Button class="my-2" @click="triggerUpload">
        Select Image to upload
      </Button>
      <p
        class="cursor-pointer font-bold underline mt-2"
        @click="redirectPrizeList"
      >
        Choose other prize
      </p>
    </div>

    <div class="bg-white p-4 mb-2" v-if="imgFile.error">
      <div class="py-4 flex justify-center items-center">
        <IconsClose />
      </div>
      <h3 class="font-bold text-xl px-2 mb-2">
        {{ img.error || "Upload failed" }}
      </h3>
      <p class="mb-8">{{ imgFile.name || "Upload your receipt" }}</p>
      <Button class="my-2" @click="triggerUpload">
        Select Image to upload
      </Button>
      <p
        class="cursor-pointer font-bold underline mt-2"
        @click="redirectPrizeList"
      >
        Choose other prize
      </p>
    </div>

    <div class="bg-white p-4 mb-2" v-if="imgFile.success">
      <div>
        <h3 class="text-xl font-bold px-2 mb-2">Thank you for entering</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor ut.
        </p>
        <Button class="my-2" @click="triggerUpload">
          Upload other receipt
        </Button>
        <Button theme="white" class="my-2" @click="redirectPrizeList">
          Discover more prizes
        </Button>
      </div>
    </div>
  </div>

  <Faq />
  <Button type="full" class="mb-10" @click="back">Back to main page</Button>
</template>

<style scoped lang="scss"></style>
