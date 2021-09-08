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
        <v-btn color="#77bc1e" dark depressed
          ><v-icon left>mdi-plus</v-icon>Add Employee</v-btn
        >
      </v-col>
    </v-row>
    <v-card>
      <v-data-table :headers="headers" :items="teamMembers" :search="search">
        <template v-slot:item.avatar="{ item }">
          <v-avatar size="3em">
            <img
              v-if="item.avatar !== ''"
              :src="item.avatar"
              alt="alt"
              contain
            />
            <v-icon v-else size="3.55em">mdi-account-circle</v-icon>
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
              <v-list-item link @click="deleteItem(item)">
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
export default {
  name: "Team",

  data: () => ({
    search: "",
    headers: [
      {
        text: "",
        sortable: false,
        filterable: false,
        value: "avatar",
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
    teamMembers: [
      {
        name: "Steve Obrien",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        position: "Manager",
        empStatus: "Active",
      },
      {
        name: "John Doe",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Mirian Skoglund",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Adam Heyne",
        avatar: "",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Kevin Nordahl",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Jefferey Stange",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Kurt Casson",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Penelope Hougen",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Renae Strecker",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Sabrina Hooks",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Mertie Regal",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        position: "Employee",
        empStatus: "Active",
      },
      {
        name: "Palmira Goines",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        position: "Employee",
        empStatus: "Terminated",
      },
    ],
  }),
  methods: {
    getColor(status) {
      if (status == "Active") return "green";
      else return "red";
    },
  },
};
</script>
