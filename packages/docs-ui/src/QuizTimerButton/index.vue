<template>
  <QuizTimerButton
    :initial-time="10"
    :auto-start="true"
    @start="handleStart"
    ref="quizTimerButtonRef"
  />

  <div style="margin-top: 40px">
    <button @click="startCountdown">开始倒计时</button>
    <button @click="stopCountdown">暂停倒计时</button>
    <button @click="resetCountdown">重置倒计时</button>
  </div>
</template>

<script setup lang="ts" name="NQuizTimerButton">
import { ref } from 'vue'
import QuizTimerButton from './QuizTimerButton.vue'

const quizTimerButtonRef = ref<InstanceType<typeof QuizTimerButton> | null>(
  null
)

const startCountdown = () => {
  quizTimerButtonRef.value?.startCountdown()
}

const stopCountdown = () => {
  quizTimerButtonRef.value?.stopCountdown()
}

// 重置倒计时
const resetCountdown = () => {
  quizTimerButtonRef.value?.resetCountdown()
}

const handleStart = () => {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    }
  ]
}
</script>

<style scoped>
button {
  padding: 4px 8px;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
}
</style>
