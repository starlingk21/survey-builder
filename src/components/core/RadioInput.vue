<script setup lang="ts">
	import { computed, ref } from "vue"
	
	const props = defineProps({
		name: {
			type: String,
			required: true
		},
		
		modelValue: {
			type: [String, Number, Boolean],
			required: false,
			default: null
		},
		
		radioValue: {
			type: [String, Number, Boolean],
			required: false,
			default: ''
		},
		
		label: {
			type: String,
			required: false,
			default: ''
		},
		
		disabled: {
			type: Boolean,
			required: false,
			default: false
		}
	})
	
	const emit = defineEmits(['update:modelValue'])
	const $input = ref<HTMLInputElement|undefined>()
	
	const toggle = () => {
		if (props.disabled) {
			return
		}
		
		emit('update:modelValue', props.radioValue)
	}
	
	const radioLabelId: string = self.crypto.randomUUID()
	
	const isChecked = computed(() => props.modelValue === props.radioValue)
</script>

<template>
	<span :class="['edurio-radio-input', { disabled, checked: isChecked }]"
	      role="radio"
	      :aria-labelledby="radioLabelId"
	      :aria-checked="isChecked"
	      :aria-disabled="disabled"
	      :data-value="radioValue"
	      @click="toggle">
		<input type="radio"
		       :name="name"
		       :id="radioLabelId"
		       :value="radioValue"
		       :disabled="disabled"
		       ref="$input"
		       :checked="isChecked" />
		
		<label :for="radioLabelId">
			<span class="box" :aria-hidden="true" />
			<span class="label" role="presentation">{{ label }}</span>
		</label>
	</span>
</template>

<style scoped lang="scss">
	.edurio-radio-input {
		position: relative;
		
		label {
			position: relative;
			display: inline-flex;
			align-items: flex-start;
			gap: 8px;
			cursor: pointer;
			
			.box {
				position: relative;
				display: block;
				margin-left: 8px;
				
				width: 16px;
				height: 16px;
				
				cursor: pointer;
				
				border: 1px solid #fff;
				border-radius: 100%;
				
				transition: all 0.2s;
				
				&::after {
					content: '';
					display: block;
					position: absolute;
					width: 8px;
					height: 8px;
					top: calc(50% - 4px);
					left: calc(50% - 4px);
					
					border-radius: 100%;
					background: #fff;
					
					transform: scale(0);
					transition: all 0.2s;
				}
			}
			
			.label {
				display: block;
				padding-right: 8px;
			}
		}
		
		&:focus {
			outline: 0;
		}
		
		&.checked {
			
			label {
				
				.box::after {
					transform: scale(1);
				}
			}
		}
		
		&.disabled {
			
			label {
				
				.box {
					background-color: #a9a9a9;
					border-color: transparent;
					
					&::after {
						background: #808080;
					}
				}
			}
		}
		
		input[type="radio"] {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>