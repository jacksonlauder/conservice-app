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
        <v-list-item-group color="#77bc1e">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            class="pl-5"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title">Team & Members</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
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
    items: [
      {
        icon: "mdi-account-group",
        title: "Team & Members",
        to: "/",
      },
      {
        icon: "mdi-chart-box",
        title: "Reports",
        to: "/reports",
      },
    ],
  }),
};
</script>
