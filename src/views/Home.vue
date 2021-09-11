<template>
  <v-container fluid class="pa-8">
    <v-row class="mb-5 align-center">
      <v-col cols="4">
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

      <v-col cols="5">
        <v-btn
          color="#77bc1e"
          dark
          depressed
          @click.stop="showProfileDialog = true"
        >
          <v-icon left>mdi-plus</v-icon>
          New Employee
        </v-btn>

        <v-btn color="primary" icon fab @click.prevent="getUsers">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-data-table :headers="headers" :items="users" :search="search">
        <!-- eslint-disable-next-line -->
        <template v-slot:item.photo="{ item }">
          <v-avatar size="3em">
            <img v-if="item.photo !== ''" :src="item.photo" alt="alt" contain />
            <v-icon v-else size="3.55em" color="grey"
              >mdi-account-circle</v-icon
            >
          </v-avatar>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.empStatus="{ item }">
          <v-chip :color="getColor(item.empStatus)" dark>
            {{ item.empStatus }}
          </v-chip>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.menu="{ item }">
          <v-menu rounded :close-on-click="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-dialog
                v-model="editDialog"
                fullscreen
                persistent
                hide-overlay
                transition="dialog-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item
                    link
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="editUser(item._id)"
                  >
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
                  <v-card-title
                    primary-title
                    style="position: relative; justify-content: center"
                  >
                    <h1 class="v-heading text-h4 text-sm-h4">Edit Employee</h1>
                  </v-card-title>
                  <v-form ref="form" @submit.prevent="onSubmit">
                    <v-container fluid>
                      <v-row justify="space-around">
                        <v-col cols="4">
                          <div class="d-flex justify-center">
                            <v-avatar size="15em">
                              <v-icon color="grey" size="15em">
                                mdi-account-circle
                              </v-icon>
                            </v-avatar>
                          </div>
                          <div class="d-flex justify-center">
                            <v-btn
                              text
                              color="primary"
                              style="text-transform: none"
                            >
                              Edit Photo
                            </v-btn>
                          </div>
                        </v-col>

                        <v-col cols="7">
                          <label>Name</label>
                          <v-text-field
                            v-model="editedUser.name"
                            outlined
                            dense
                            hide-details
                            single-line
                            required
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <label>Address</label>
                          <v-text-field
                            v-model="editedUser.address"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <label>E-mail</label>
                          <v-text-field
                            v-model="editedUser.email"
                            outlined
                            dense
                            hide-details
                            single-line
                            required
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <label>Preferred Contact Phone Number</label>
                          <v-text-field
                            v-model="editedUser.phoneNumber"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <label>Position</label>
                          <v-select
                            v-model="editedUser.position"
                            :items="positions"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-select>

                          <label>Department</label>
                          <v-text-field
                            v-model="editedUser.department"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <v-row>
                            <v-col>
                              <label>Start Date</label>
                              <v-menu
                                ref="startDateMenuRef"
                                v-model="startDateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="editedUser.startDate"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedUser.startDate"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                    hide-details
                                    single-line
                                    color="#77bc1e"
                                    class="mb-1"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedUser.startDate"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="#77bc1e"
                                    @click="startDateMenu = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="#77bc1e"
                                    @click="
                                      $refs.startDateMenuRef.save(
                                        editedUser.startDate
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>

                            <v-col>
                              <label>End Date</label>
                              <v-menu
                                ref="endDateMenuRef"
                                v-model="endDateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="editedUser.endDate"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedUser.endDate"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                    hide-details
                                    single-line
                                    color="#77bc1e"
                                    class="mb-1"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedUser.endDate"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="#77bc1e"
                                    @click="endDateMenu = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="#77bc1e"
                                    @click="
                                      $refs.endDateMenuRef.save(
                                        editedUser.endDate
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>

                          <label>Employment Status</label>
                          <v-select
                            v-model="editedUser.empStatus"
                            :items="status"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-select>

                          <label>Shift</label>
                          <v-text-field
                            v-model="editedUser.shift"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <label>Manager</label>
                          <v-text-field
                            v-model="editedUser.manager"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>

                          <label>Favorite Color</label>
                          <v-text-field
                            v-model="editedUser.favColor"
                            outlined
                            dense
                            hide-details
                            single-line
                            color="#77bc1e"
                            class="mb-1"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-card-actions class="mt-5 pb-8">
                      <v-spacer />
                      <v-btn depressed large color="green" dark type="submit">
                        Save
                      </v-btn>
                      <v-spacer />
                      <v-btn
                        outlined
                        depressed
                        large
                        @click="editDialog = false"
                      >
                        Cancel
                      </v-btn>

                      <v-spacer />
                    </v-card-actions>
                  </v-form>
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
                  <v-card-title class="headline">Delete User?</v-card-title>

                  <v-divider />

                  <v-card-text class="mt-4">
                    This action may not be undone.
                  </v-card-text>

                  <v-divider />

                  <v-card-actions>
                    <v-btn
                      depressed
                      large
                      color="red"
                      dark
                      @click.prevent="deleteUser(item._id)"
                    >
                      Delete
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      outlined
                      depressed
                      large
                      @click="deleteDialog = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
    <NewProfileDialog v-model="showProfileDialog" />
  </v-container>
</template>

<script>
import * as UserService from "../services/UserService";
import NewProfileDialog from "../components/NewProfileDialog.vue";
export default {
  name: "Home",
  components: {
    NewProfileDialog,
  },

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
    positions: ["Employee", "Manager"],
    status: ["Active", "Inactive", "Terminated"],
    users: [],
    editedUser: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      position: "",
      department: "",
      startDate: "",
      endDate: "",
      empStatus: "",
      shift: "",
      photo: "",
      manager: "",
      favColor: "",
    },
    startDateMenu: false,
    endDateMenu: false,
    showProfileDialog: false,
    editDialog: false,
    deleteDialog: false,
    userId: "",
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
      else if (status == "Inactive") return "orange";
      else if (status == "Terminated") return "red";
      else return "transparent";
    },
    getUsers: async function () {
      await UserService.getAllUsers().then((res) => {
        this.users = res.data.users;
      });
    },
    editUser: async function (id) {
      await UserService.getUser(id).then((res) => {
        this.editedUser = res.data.user;
      });
      this.userId = id;
    },
    onSubmit: async function () {
      const user = {
        user: this.editedUser,
      };
      await UserService.updateUser(user);
      this.editDialog = false;
      this.getUsers();
    },
    deleteUser: async function (id) {
      await UserService.deleteUser(id);
      this.deleteDialog = false;
      this.getUsers();
    },
  },
};
</script>
