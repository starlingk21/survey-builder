<script setup lang="ts">
	import RadioInput from "@/components/core/RadioInput.vue"
	import { computed, PropType, ref } from "vue"
	import { Question } from "@/types/questions.ts"
	
	const props = defineProps({
		questions: {
			type: Array as PropType<Question[]>,
			required: true,
			default: () => []
		}
	})
	
	const LIKERT_SCALE = [
		{ value: 1, label: 'Very often', color: '#1d7044' },
		{ value: 2, label: 'Quite often', color: '#75ad6f' },
		{ value: 3, label: 'Sometimes', color: '#ffbe00' },
		{ value: 4, label: 'Rarely', color: '#ff7e01' },
		{ value: 5, label: 'Never', color: '#c91414' }
	]
	
	const greenColor = computed(() => LIKERT_SCALE[0].color)
	const lightGreenColor = computed(() => LIKERT_SCALE[1].color)
	const yellowColor = computed(() => LIKERT_SCALE[2].color)
	const orangeColor = computed(() => LIKERT_SCALE[3].color)
	const redColor = computed(() => LIKERT_SCALE[4].color)
	
	const previewQuestions = ref<Question[]>(props.questions)
	
	const setColorClass = (radioIndex: number) => {
		let className = ''
		
		switch (radioIndex) {
			case 0:
				className = 'green'
				break
			case 1:
				className = 'light-green'
				break
			case 2:
				className = 'yellow'
				break
			case 3:
				className = 'orange'
				break
			case 4:
				className = 'red'
		}
		
		return className
	}
	
	const show = ref<null|number>(null)
	
	const toggle = (i: number) => {
		show.value === i ? show.value = null : show.value = i
	}
</script>

<template>
	<div class="questions-list" role="list">
		<div class="subtitle">
			Questions list
		</div>
		
		<div v-for="(item, index) of previewQuestions"
		     :key="index"
		     v-if="previewQuestions.length"
		     class="list-item"
		     role="listitem">
			<div :class="['question', { show: show === index }]"
			     @click="toggle(index)">
				<img src="@/assets/icons/core/help-circle-outline.svg"
				     alt="question-circle-icon" />
				<span>{{ item.question }}</span>
				<img src="@/assets/icons/core/chevron-left.svg"
				     class="chevron-icon"
				     alt="chevron-left-icon" />
			</div>
			
			<Transition v-if="item.type === 'multiple'">
				<div v-if="show === index" class="radio-group" role="radiogroup">
					<div v-for="(answer, i) of LIKERT_SCALE"
					     :key="answer.value"
					     class="field">
						<RadioInput :name="`likert-choice-radio-question-${index}`"
						            :class="setColorClass(i)"
						            :label="answer.label"
						            v-model="item.answer"
						            :radio-value="answer.value" />
					</div>
				</div>
			</Transition>
			
			<Transition v-else>
				<div v-if="show === index"
				     class="field open-choice"
				     role="presentation">
					<textarea name="open-choice-input"
				          class="open-choice-textarea"
				          placeholder="Answer"
				          v-model="item.answer"
				          rows="4"
				          required />
				</div>
			</Transition>
		</div>
		
		<div v-else class="questions-list-empty">
			No questions added yet...
		</div>
	</div>
</template>

<style scoped lang="scss">
	.questions-list {
		
		.subtitle {
			margin-bottom: 24px;
			background: #1b231c;
			padding: 24px;
			font-size: 18px;
			border-radius: 4px;
		}
		
		.list-item {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			margin-bottom: 24px;
			
			.question {
				position: relative;
				display: flex;
				align-items: center;
				gap: 8px;
				flex: 1 100%;
				background: #d9d438;
				color: #000;
				font-weight: 600;
				padding: 12px 48px 12px 8px;
				cursor: pointer;
				border-radius: 4px;
				
				img {
					width: 24px;
					height: 24px;
					
					&.chevron-icon {
						position: absolute;
						right: 0;
						padding: 12px 16px;
						box-sizing: content-box;
						transform: rotate(180deg);
						transition: all 0.2s;
						pointer-events: none;
					}
				}
				
				&.show {
					
					.chevron-icon {
						transform: rotate(270deg);
					}
				}
			}
			
			.radio-group {
				display: flex;
				flex-wrap: wrap;
				gap: 12px;
				align-items: center;
			}
			
			.field {
				margin-top: 4px;
				
				:deep(.checked) {
					padding: 12px 0 8px;
					border-radius: 4px;
					color: #fff;
				}
				
				:deep(.checked.green) {
					background-color: v-bind('greenColor');
				}
				:deep(.checked.light-green) {
					background-color: v-bind('lightGreenColor');
				}
				:deep(.checked.yellow) {
					background-color: v-bind('yellowColor');
				}
				:deep(.checked.orange) {
					background-color: v-bind('orangeColor');
				}
				:deep(.checked.red) {
					background-color: v-bind('redColor');
				}
				
				&.open-choice {
					flex: 1;
				}
			}
		}
	}
	
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}
	
	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
	
	.questions-list-empty {
		background-color: #d9d438;
		color: #000;
		font-weight: 600;
		padding: 24px 36px;
	}
</style>