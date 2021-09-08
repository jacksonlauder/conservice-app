<template>
  <v-app>
    <v-app-bar app color="#333" dark flat>
      <v-toolbar-title>Conservice HR Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
