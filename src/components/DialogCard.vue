<template>
  <div class="card-container">
    <div class="center">
      <div class="card">
        <div class="card" style="width: 30rem;">
          <div class="card-body">
            <h5 class="card-title">{{ cardTitle }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ cardSubtitle }}</h6>
            <p class="card-text">{{ cardMessage }}</p>
            <v-btn
              block
              @click="close(confirmText)"
            >
              {{ confirmText }}
            </v-btn>
            <v-btn
              block
              @click="close('Cancel')"
            >
              Cancelar
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'cardTitle',
    'cardSubtitle',
    'cardMessage',
    'confirmText'
  ],
  methods: {
    close (value) {
      this.$emit('closeCard', value)
    }
  }
}

</script>

<style>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.message-card {
  background-color: white;
  padding: 20px 40px;
  border-radius: 15px;
}
</style>