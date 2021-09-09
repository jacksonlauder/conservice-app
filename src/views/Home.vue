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
      <v-data-table :headers="headers" :items="users" :search="search">
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
              <v-dialog
                v-model="dialog"
                scrollable
                fullscreen
                persistent
                hide-overlay
                transition="dialog-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item link v-bind="attrs" v-on="on">
                    <v-list-item-icon>
                      <v-icon color="blue-grey darken-2">
                        mdi-square-edit-outline
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-card>
                  <v-container fluid fill-height>
                    <v-row>
                      <v-col cols="4" class="ml-5">
                        <v-avatar size="15em">
                          <v-icon color="grey" size="15em">
                            mdi-account-circle
                          </v-icon>
                        </v-avatar>
                      </v-col>

                      <v-col cols="6">
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <label>Name</label>
                          <v-text-field
                            v-model="item.name"
                            outlined
                            dense
                            hide-details
                            single-line
                            required
                            color="#77bc1e"
                          ></v-text-field>

                          <label>Address</label>
                          <v-text-field
                            v-model="item.address"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-text-field>

                          <label>E-mail</label>
                          <v-text-field
                            v-model="item.email"
                            outlined
                            dense
                            hide-details
                            single-line
                            required
                            color="#77bc1e"
                          ></v-text-field>

                          <label>Preferred Contact Phone Number</label>
                          <v-text-field
                            v-model="item.phoneNumber"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-text-field>

                          <label>Position</label>
                          <v-select
                            v-model="item.position"
                            :items="positions"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-select>

                          <label>Department</label>
                          <v-text-field
                            v-model="item.department"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-text-field>

                          <label>Start Date</label>
                          <v-menu
                            ref="menu"
                            v-model="startDateMenu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="item.startDate"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                dense
                                hide-details
                                single-line
                                color="#77bc1e"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="#77bc1e" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="#77bc1e"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>

                          <label>End Date</label>
                          <v-menu
                            ref="menu"
                            v-model="endDateMenu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="item.endDate"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                dense
                                hide-details
                                single-line
                                color="#77bc1e"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="#77bc1e" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="#77bc1e"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>

                          <label>Employment Status</label>
                          <v-select
                            v-model="item.empStatus"
                            :items="status"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-select>

                          <label>Shift</label>
                          <v-text-field
                            v-model="item.shift"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-text-field>

                          <label>Manager</label>
                          <v-text-field
                            v-model="item.manager"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-text-field>

                          <label>Favorite Color</label>
                          <v-text-field
                            v-model="item.favColor"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                          ></v-text-field>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-divider />

                  <v-card-actions>
                    <v-btn outlined depressed large @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      depressed
                      large
                      color="green"
                      dark
                      @click="dialog = false"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item link v-bind="attrs" v-on="on">
                    <v-list-item-icon>
                      <v-icon color="blue-grey darken-2"> mdi-delete </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-card>
                  <v-card-title class="headline"> Delete User? </v-card-title>

                  <v-divider />

                  <v-card-text class="mt-4">
                    This action may not be undone.
                  </v-card-text>

                  <v-divider />

                  <v-card-actions>
                    <v-btn
                      outlined
                      depressed
                      large
                      @click="deleteDialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      depressed
                      large
                      color="red"
                      dark
                      @click.prevent="deleteUser(item._id)"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
    positions: ['Employee', 'Manager'],
    status: ['Active', 'Inactive', 'Terminated'],
    users: [],
    dialog: false,
    deleteDialog: false,
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
      this.deleteDialog = false;
      this.getUsers();
    },
  },
};
</script>
