<template>
  <v-container fluid>
    <v-card v-show="show">
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
                  <v-icon color="grey" size="15em"> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
              <div class="d-flex justify-center">
                <v-btn text color="primary" style="text-transform: none">
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
                          $refs.startDateMenuRef.save(editedUser.startDate)
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
                      <v-btn text color="#77bc1e" @click="endDateMenu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="#77bc1e"
                        @click="$refs.endDateMenuRef.save(editedUser.endDate)"
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
          <v-btn depressed large color="green" dark type="submit"> Save </v-btn>
          <v-spacer />
          <v-btn outlined depressed large @click="editDialog = false">
            Cancel
          </v-btn>

          <v-spacer />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import * as UserService from "../services/UserService";
export default {
  props: ["userID"],
  data: () => ({
    positions: ["Employee", "Manager"],
    status: ["Active", "Inactive", "Terminated"],
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
  }),

  // mounted() {
  //   this.getUserData(this.userId);
  // },

  // created() {
  //   this.getUserData(this.userId);
  // },

  watch: {
    userData: [
      {
        handler: "getUserData(this.userID)",
      },
    ],
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    getUserData: async function (id) {
      await UserService.getUser(id).then((res) => {
        this.editedUser = res.data.user;
      });
      console.log(this.editedUser);
    },
  },
};
</script>

<style></style>
