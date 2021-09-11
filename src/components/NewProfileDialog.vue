<template>
  <v-container fluid>
    <v-dialog
      v-model="show"
      fullscreen
      persistent
      hide-overlay
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title
          primary-title
          class="mx-auto"
          style="position: relative; justify-content: center"
        >
          <h1 class="v-heading text-h4 text-sm-h4">Add New Employee</h1>
        </v-card-title>
        <v-form ref="newUserForm" @submit.prevent="onSubmit">
          <v-container fluid fill-height>
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
                  <v-btn text color="primary" style="text-transform: none">
                    Add Photo
                  </v-btn>
                </div>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="name"
                  label="Name"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="my-5"
                ></v-text-field>

                <v-text-field
                  v-model="address"
                  label="Address"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  label="E-mail Address"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>

                <v-text-field
                  v-model="phoneNumber"
                  label="Preferred Contact Phone Number"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>

                <v-select
                  v-model="position"
                  label="Position"
                  :items="positions"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-select>

                <v-text-field
                  v-model="department"
                  label="Department"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>

                <v-row>
                  <v-col>
                    <v-menu
                      ref="startDateMenuRef"
                      v-model="startDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="startDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="startDate"
                          label="Start Date"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          hide-details
                          color="#77bc1e"
                          class="mb-5"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startDate" no-title scrollable>
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
                          @click="$refs.startDateMenuRef.save(startDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu
                      ref="endDateMenuRef"
                      v-model="endDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="endDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="endDate"
                          label="End Date"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          hide-details
                          color="#77bc1e"
                          class="mb-5"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endDate" no-title scrollable>
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
                          @click="$refs.endDateMenuRef.save(endDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-select
                  v-model="empStatus"
                  label="Employment Status"
                  :items="status"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-select>

                <v-text-field
                  v-model="shift"
                  label="Shift"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>

                <v-text-field
                  v-model="manager"
                  label="Manager"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>

                <v-text-field
                  v-model="favColor"
                  label="Favorite Color"
                  outlined
                  dense
                  hide-details
                  color="#77bc1e"
                  class="mb-5"
                ></v-text-field>
              </v-col>
              <v-col cols="1"></v-col>
            </v-row>
          </v-container>

          <v-card-actions class="mt-8 pb-8">
            <v-spacer />
            <v-btn depressed large color="green" dark type="submit">
              Register
            </v-btn>
            <v-spacer />
            <v-btn outlined depressed large @click="cancel"> Cancel </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as UserService from "../services/UserService";

export default {
  name: "ProfileDialog",
  props: {
    value: Boolean,
  },

  data: () => ({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISO,
    endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISO,
    empStatus: "",
    shift: "",
    photo: "",
    manager: "",
    favColor: "",
    positions: ["Employee", "Manager"],
    status: ["Active", "Inactive", "Terminated"],
    startDateMenu: false,
    endDateMenu: false,
  }),

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
    onSubmit: async function () {
      this.$refs.newUserForm.validate();
      const user = {
        name: this.name,
        address: this.address,
        email: this.email,
        phoneNumber: this.phoneNumber,
        position: this.position,
        department: this.department,
        startDate: this.startDate,
        endDate: this.endDate,
        empStatus: this.empStatus,
        shift: this.shift,
        photo: this.photo,
        manager: this.manager,
        favColor: this.favColor,
      };
      await UserService.registerUser(user);
      this.$refs.newUserForm.reset();
      this.show = false;
      this.$parent.getUsers();
    },

    cancel: function () {
      this.$refs.newUserForm.reset();
      this.show = false;
    },
  },
};
</script>
