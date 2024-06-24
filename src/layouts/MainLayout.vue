<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> My files </q-toolbar-title>
        <q-btn flat round icon="+" @click="$router.push('/')" />
        <q-btn flat round icon="⌂" @click="$router.push('/grid')" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>
