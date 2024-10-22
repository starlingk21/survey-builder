<script setup lang="ts">
	import { computed, PropType, ref } from "vue"
	import FormSection from "@/components/core/FormSection.vue"
	import { Question } from "@/types/questions.ts"
	
	const props = defineProps({
		formType: {
			type: String,
			required: true,
			default: 'multiple'
		},
		
		questions: {
			type: Array as PropType<Question[]>,
			required: false,
			default: () => []
		}
	})
	
	const newQuestion = ref<string>('')
	const questionsList = ref<Question[]>(props.questions)
	
	const isEmpty = computed(() => newQuestion.value.trim() === '')
	
	const handleCreate = () => {
		if (!isEmpty.value) {
			questionsList.value.push({ question: newQuestion.value, type: props.formType, answer: null })
			newQuestion.value = ''
		}
	}
</script>

<template>
	<FormSection @submit="handleCreate" class="create-question-form">
		<template #form>
			<div class="field" role="presentation">
				<textarea v-model="newQuestion" placeholder="Question" name="create-question-input" required />
			</div>
		</template>
		
		<template #actions>
			<button class="btn primary" :disabled="isEmpty">Create Question</button>
		</template>
	</FormSection>
</template>

<style scoped lang="scss">
	.create-question-form {
		
		&:deep(.actions-wrapper) {
			margin-top: 16px;
		}
		
		.btn {
			
			&.primary {
				color: #fff;
				background-color: #7f6531;
				border: 0;
				font-weight: 600;
				cursor: pointer;
				padding: 12px 24px;
				
				&:disabled {
					background-color: #d3d3d3;
					border: 0;
					color: #808080;
				}
			}
		}
	}
</style>