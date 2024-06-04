<script setup>
const { theme, type, disabled } = defineProps({
  theme: {
    default: "yellow",
  },
  type: {
    default: "normals",
  },
  disabled: {
    default: false,
  },
});

const classButton = computed(() => {
  const classType = type === "full" ? " w-full" : "";
  let classTheme = "";

  switch (theme) {
    case "black":
      classTheme = "border-white border-2 bg-black text-white";
      break;
    case "white":
      classTheme = "border-black border-2 bg-white text-black";
      break;
    default:
      classTheme = "border-yellow border-2 bg-yellow text-black";
      break;
  }

  disabled && (classTheme = "bg-gray text-gray-light");

  return `p-2 px-6 my-2 ${classTheme} text-center font-bold rounded-[40px] ${classType}`;
});
</script>

<template>
  <button :class="classButton">
    <slot />
  </button>
</template>
