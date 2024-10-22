export interface Question {
    question: string
    type: string|'multiple'|'open'
    answer?: string | number
}