<script setup lang="ts">
	defineEmits(['submit'])
</script>

<template>
	<form class="edurio-form" @submit.prevent="$emit('submit')">
		<slot name="form" />
		
		<div v-if="$slots.actions" class="actions-wrapper" role="presentation">
			<slot name="actions" />
		</div>
	</form>
</template>

<style scoped lang="scss">

</style>