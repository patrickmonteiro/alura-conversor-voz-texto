<template>
  <div class="grid">
    <div class="col-12 md:col-6 md:col-offset-3 lg:col-4 lg:col-offset-4">
      <p-card v-if="recognition">
        <template #title>
          <div class="text-center">
            Conversor de voz para texto
          </div>
        </template>
        <template #content>
          <div class="text-center">
            Pressione o botão e aguarde para iniciar a gravação
          </div>
          <div class="w-full pt-2 text-center">
            <p-textarea class="w-full" v-model="text" />
            <p-button icon="pi pi-copy" class="p-button-text" @click="handleCopyText" />
            <p-button icon="pi pi-times" class="p-button-text" @click="handleClear" />
            <p-message v-if="showMessage" severity="success">Texto copiado com sucesso!</p-message>
          </div>
        </template>
        <template #footer>
          <p-button icon="pi pi-stop" class="w-full p-button-text p-button-danger" v-if="load" />
          <p-button icon="pi pi-play" class="w-full p-button-text" @click="handleConvertTextToVoice" v-else  />
        </template>
      </p-card>
      <p-card v-else>
        <template #title>
          <div class="text-center">
            Seu navegador não tem suporte ao conversor de voz
          </div>
        </template>
      </p-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition ? new SpeechRecognition() : false
    const text = ref('')
    const load = ref(false)
    const showMessage = ref(false)
    if (recognition) {
      recognition.continous = false
      recognition.lang = 'pt-BR'
      recognition.interimResults = false
      recognition.maxAlternatives = 1
    }

    const handleConvertTextToVoice = () => {
      recognition.start()
      load.value = true
      recognition.onresult = (event) => {
        let current = event.resultIndex
        let transcript = event.results[current][0].transcript
        text.value = transcript
        load.value = false
      }
    }

    const handleCopyText = () => {
      navigator.clipboard.writeText(text.value)
      showMessage.value = true
      setTimeout(() => {
        showMessage.value = false
      }, 3000)
    }

    const handleClear = () => {
      text.value = ''
    }

    return {
      recognition,
      handleConvertTextToVoice,
      text,
      handleClear,
      load,
      handleCopyText,
      showMessage
    }
  }
})
</script>
