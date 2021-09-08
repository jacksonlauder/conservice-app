<template>
  <v-container fluid class="pa-8">
    <v-row class="mb-5 align-center">
      <v-col cols="3">
        <h1 class="v-heading text-h4 text-sm-h4">Team Members</h1>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="search"
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
          color="#77bc1e"
        ></v-text-field>
      </v-col>

      <v-col cols="6">
        <v-btn color="#77bc1e" dark depressed>
          <v-icon left>mdi-plus</v-icon>
          Add Employee
        </v-btn>

        <v-btn color="primary" icon fab @click.prevent="getUsers">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        @click:row="openDialog(item._id)"
      >
        <template v-slot:item.photo="{ item }">
          <v-avatar size="3em">
            <img v-if="item.photo !== ''" :src="item.photo" alt="alt" contain />
            <v-icon v-else size="3.55em" color="grey"
              >mdi-account-circle</v-icon
            >
          </v-avatar>
        </template>

        <template v-slot:item.empStatus="{ item }">
          <v-chip :color="getColor(item.empStatus)" dark>
            {{ item.empStatus }}
          </v-chip>
        </template>

        <template v-slot:item.menu="{ item }">
          <v-menu rounded :close-on-click="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item link @click="editItem(item)">
                <v-list-item-icon>
                  <v-icon color="blue-grey darken-2">
                    mdi-square-edit-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="deleteUser(item._id)">
                <v-list-item-icon>
                  <v-icon color="blue-grey darken-2"> mdi-delete </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import * as UserService from "../services/UserService";
export default {
  name: "Home",

  data: () => ({
    search: "",
    headers: [
      {
        text: "",
        sortable: false,
        filterable: false,
        value: "photo",
        align: "right",
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Position",
        sortable: false,
        filterable: false,
        value: "position",
        align: "center",
      },
      {
        text: "Employment Status",
        sortable: false,
        filterable: false,
        value: "empStatus",
        align: "center",
      },
      {
        text: "",
        sortable: false,
        filterable: false,
        value: "menu",
      },
    ],
    users: [],
    dialog: false,
  }),

  beforeRouteEnter(to, from, next) {
    UserService.getAllUsers().then((res) => {
      next((vm) => {
        vm.users = res.data.users;
      });
    });
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getColor(status) {
      if (status == "Active") return "green";
      else return "red";
    },
    getUsers: async function () {
      await UserService.getAllUsers().then((res) => {
        this.users = res.data.users;
      });
    },
    deleteUser: async function (id) {
      await UserService.deleteUser(id);
      this.getUsers();
    },
  },
};
</script>
