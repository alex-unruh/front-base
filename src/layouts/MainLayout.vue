<template>
  <q-layout view="hHh Lpr lFf" :class="{ 'bg-grey-1': !app.dark.isActive }">
    <TopBar />

    <SideBar />

    <q-page-container>
      <q-page class="q-px-lg q-py-sm">
        <router-view />
      </q-page>
    </q-page-container>

    <FooterBar />
  </q-layout>
</template>

<script setup>
import SideBar from './SideBar.vue';
import TopBar from './TopBar.vue';
import FooterBar from './FooterBar.vue';
import { useLayoutStore } from 'src/stores/layout';
import { useQuasar } from 'quasar';

const store = useLayoutStore();
const app = useQuasar();
</script>


