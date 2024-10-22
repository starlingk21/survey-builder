<script setup lang="ts">
	import RadioInput from "@/components/core/RadioInput.vue"
	import QuestionForm from "@/components/questions/QuestionForm.vue"
	import { ref } from "vue"
	import QuestionsPreview from "@/components/questions/QuestionsPreview.vue"
	import { Question } from "@/types/questions.ts"
	import { useStorage } from "@vueuse/core"
	
	const radioOption = ref<'multiple'|'open'>('multiple')
	
	const storedQuestions = useStorage<Question[]>('questions', [], localStorage, { mergeDefaults: true })
</script>

<template>
	<div class="questions-top-bar">
		<div class="title">
			Survey builder
		</div>
	</div>
	
	<div class="questions-content-container">
		<div class="create-questions-wrapper">
			<div class="subtitle">
				Create question
			</div>
			
			<div class="question-options" role="radiogroup">
				<RadioInput name="question-type"
				            class="radio-choice"
				            label="Multiple Choice (Single Selection)"
				            v-model="radioOption"
				            radio-value="multiple" />
				
				<RadioInput name="question-type"
				            class="radio-choice"
				            label="Open"
				            v-model="radioOption"
				            radio-value="open" />
			</div>
			
			<div class="form-wrapper" role="presentation">
				<QuestionForm :form-type="radioOption" :questions="storedQuestions" />
			</div>
		</div>
		
		<div class="questions-preview-wrapper" role="presentation">
			<QuestionsPreview :questions="storedQuestions" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/scss/mixins';
	
	.questions-top-bar {
		width: 100%;
		text-align: center;
		padding: 24px;
		background-color: #1b231c;
		font-weight: 700;
		font-size: 24px;
		margin-bottom: 36px;
	}
	
	.questions-content-container {
		display: flex;
		justify-content: space-between;
		margin: 0 120px;
		gap: 48px;
		
		.create-questions-wrapper {
			flex: 1 50%;
			
			.subtitle {
				margin-bottom: 24px;
				background: #1b231c;
				padding: 24px;
				font-size: 18px;
				border-radius: 4px;
			}
			
			.question-options {
				margin: 0 24px 16px 0;
			}
		}
		
		.questions-preview-wrapper {
			flex: 1 50%;
		}
	}
	
	@include breakpoint(medium) {
		.questions-content-container {
			flex-wrap: wrap;
		}
	}
	
	@include breakpoint(mobile) {
		.questions-content-container {
			margin: 0 24px;
		}
	}
</style>