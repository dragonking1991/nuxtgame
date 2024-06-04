<script setup>
const { type, label, modelValue, placeholder } = defineProps({
	type: {
		default: "text",
	},
	label: {
		default: "",
	},
	modelValue: {},
	placeholder: {},
});
defineEmits(["update:modelValue"]);
</script>
<template>
	<label class="block" for="">
		<div v-if="label" class="text-sm">{{ label }}</div>
		<input
			class="mt-1"
			:type="type"
			:placeholder="placeholder"
			type="phone"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</label>
</template>
