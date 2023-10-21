<template>
  <q-card style="width: 27vw; min-width: 350px">
    <q-card-section class="row items-center justify-center">
      <span class="text-uppercase text-weight-bold">{{ title }}</span>
    </q-card-section>

    <q-separator />

    <q-card-section class="text-center q-mt-sm text-subtitle2">
      <slot>{{ message }}</slot>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Confirm" color="green-9" @click="$emit('onConfirm')" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineEmits(['onConfirm']);
defineProps({
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: 'Do you really want to proceed?' }
});
</script>
