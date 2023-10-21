<template>
  <q-card style="width: 25vw; min-width: 350px">
    <q-card-section>
      <div class="ext-body2 text-uppercase text-bold">Select Users</div>
    </q-card-section>

    <q-separator class="q-mx-md" />

    <q-card-section class="q-px-none">
      <q-list>
        <q-item class="q-px-sm" tag="label" v-ripple v-for="item in users" :key="item.id">
          <q-item-section avatar>
            <q-checkbox v-model="checkeds" :val="item.id" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              #{{ item.id }} - {{ item.name }} -
              <span class="text-caption">{{ item.profile }}</span>
            </q-item-label>
            <q-item-label caption>{{ item.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-section align="right" class="q-gutter-x-md">
      <q-btn color="grey-8" label="Cancel" type="reset" v-close-popup size="sm" />
      <q-btn color="green-9" label="Submit" @click="$emit('onSubmit', checkeds)" size="sm" />
    </q-card-section>

    <q-inner-loading :showing="loading" label="Please wait..." />
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['onSubmit']);
const props = defineProps({ users: Array, selecteds: Array });

const checkeds = ref([]);
const loading = ref(true);

onMounted(() => selectIds());

function selectIds() {
  for (let i = 0; i < props.selecteds.length; i++) {
    checkeds.value.push(props.selecteds[i].id);
  }
  loading.value = false;
}
</script>
