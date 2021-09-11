<template>
  <v-app>
    <v-app-bar app color="#333" dark flat clipped-left>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Conservice HR Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="$vuetify.breakpoint.mdAndUp"
      floating
      clipped
      hide-overlay
      color="grey lighten-4"
    >
      <v-list nav>
        <v-list-item
          @click="$router.push('/')"
          :ripple="false"
          class="pl-5"
        >
          <v-list-item-title>Team Member View</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          @click="$router.push('/permissions')"
          :ripple="false"
          class="pl-5 mt-2"
        >
          <v-list-item-title>Permissions</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          @click="$router.push('/reporting')"
          :ripple="false"
          class="pl-5 mt-2"
        >
          <v-list-item-title>Reporting</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
  }),
};
</script>
