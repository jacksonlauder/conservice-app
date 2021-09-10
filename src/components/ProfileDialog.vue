<template>
  <v-container fluid>
    <v-row>
      <v-dialog
        v-model="show"
        fullscreen
        persistent
        hide-overlay
        transition="dialog-transition"
      >
        <v-card>
          <v-container fluid fill-height>
            <v-row>
              <v-col cols="4" class="ml-5">
                <v-avatar size="15em">
                  <v-icon color="grey" size="15em"> mdi-account-circle </v-icon>
                </v-avatar>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn fab icon absolute v-bind="attrs" v-on="on">
                      <v-icon color="primary" large>mdi-camera-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Photo</span>
                </v-tooltip>
              </v-col>

              <v-col cols="6">
                <v-form ref="form" lazy-validation>
                  <label>Name</label>
                  <v-text-field
                    v-model="user.name"
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
                    v-model="user.address"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>

                  <label>E-mail</label>
                  <v-text-field
                    v-model="user.email"
                    outlined
                    dense
                    hide-details
                    single-line
                    required
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>

                  <label>Preferred Contact Phone Number</label>
                  <v-text-field
                    v-model="user.phoneNumber"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>

                  <label>Position</label>
                  <v-select
                    v-model="user.position"
                    :items="positions"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-select>

                  <label>Department</label>
                  <v-text-field
                    v-model="user.department"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>

                  <label>Start Date</label>
                  <v-menu
                    ref="menu"
                    v-model="startDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="startDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="user.startDate"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        dense
                        hide-details
                        single-line
                        color="#77bc1e"
                        class="mb-2"
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
                        @click="$refs.menu.save(startDate)"
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
                    :return-value.sync="endDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="user.endDate"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        dense
                        hide-details
                        single-line
                        color="#77bc1e"
                        class="mb-2"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="#77bc1e" @click="endDateMenu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="#77bc1e"
                        @click="$refs.menu.save(endDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                  <label>Employment Status</label>
                  <v-select
                    v-model="user.empStatus"
                    :items="status"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-select>

                  <label>Shift</label>
                  <v-text-field
                    v-model="user.shift"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>

                  <label>Manager</label>
                  <v-text-field
                    v-model="user.manager"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>

                  <label>Favorite Color</label>
                  <v-text-field
                    v-model="user.favColor"
                    outlined
                    dense
                    hide-details
                    single-line
                    color="#77bc1e"
                    class="mb-2"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>

          <v-divider />

          <v-card-actions>
            <v-btn outlined depressed large @click="show = false">
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn depressed large color="green" dark @click="show = false">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProfileDialog",
  props: {
    value: Boolean,
  },

  data: () => ({
    user: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      position: "",
      department: "",
      startDate: "",
      endDate: "",
      empStatus: "",
      manager: "",
      favColor: "",
    },

    positions: ["Employee", "Manager"],
    status: ["Active", "Inactive", "Terminated"],
    startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISO,
    endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISO,
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
};
</script>
