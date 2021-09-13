<template>
  <v-app>
    <v-app-bar app color="#333" dark flat clipped-left>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
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
      <v-list nav flat>
        <v-list-item @click="$router.push('/')" :ripple="false" class="pl-5">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Team & Members</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item
          @click="$router.push('/reports')"
          :ripple="false"
          class="pl-5 mt-2"
        >
          <v-list-item-icon>
            <v-icon>mdi-chart-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Reports</v-list-item-title>
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
    selectedItem: 0,
  }),
};
</script>
