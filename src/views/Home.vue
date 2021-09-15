<template>
  <v-container fluid class="pa-8">
    <!-- <EmployeeRecord v-model="showEmployeeRecord" :userData="userData" /> -->
    <v-row class="mb-5 align-center">
      <v-col cols="5">
        <h1 class="v-heading text-h4 text-sm-h4">Team & Members</h1>
      </v-col>

      <v-col cols="4">
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

      <v-col cols="3">
        <v-btn
          color="#77bc1e"
          dark
          depressed
          small
          @click.stop="showProfileDialog = true"
        >
          <v-icon left>mdi-plus</v-icon>
          New Employee
        </v-btn>

        <!-- <v-btn color="primary" icon fab @click.prevent="getUsers">
          <v-icon>mdi-refresh</v-icon>
        </v-btn> -->
      </v-col>
    </v-row>
    <v-card>
      <v-data-table :headers="headers" :items="users" :search="search">
        <!-- TODO: Next iteration -->
        <!-- <template v-slot:item="{ item }">
          <tr @click="showAlert(item)">
            <td>
              <v-avatar size="3em">
                <img
                  v-if="item.photo !== ''"
                  :src="item.photo"
                  alt="alt"
                  contain
                />
                <v-icon v-else size="3.55em" color="grey"
                  >mdi-account-circle</v-icon
                >
              </v-avatar>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.position }}</td>
            <td>
              <v-chip :color="getColor(item.empStatus)" dark>
                {{ item.empStatus }}
              </v-chip>
            </td>
            <td>
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
                        <h1 class="v-heading text-h4 text-sm-h4">
                          Edit Employee
                        </h1>
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
                          <v-btn
                            depressed
                            large
                            color="green"
                            dark
                            type="submit"
                          >
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
                          <v-icon color="blue-grey darken-2">
                            mdi-delete
                          </v-icon>
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
            </td>
          </tr>
        </template> -->

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
            <v-list dense>
              <!-- <v-list-item link @click.prevent="editUserData(item._id)">
                <v-list-item-icon>
                  <v-icon color="blue-grey darken-2">
                    mdi-square-edit-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-dialog
                v-model="editDialog"
                fullscreen
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
                        mdi-account-edit
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>View & Edit Record</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-card>
                  <v-container fluid>
                    <v-card-title primary-title style="position: relative">
                      <v-row>
                        <v-card-title primary-title>
                          <h1 class="v-heading text-h4 text-sm-h4">
                            Employee Record
                          </h1>
                        </v-card-title>
                        <v-btn
                          icon
                          fab
                          absolute
                          right
                          color="black"
                          style="top: 0.5em"
                          @click="editDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </v-row>
                    </v-card-title>
                    <v-form ref="form" @submit.prevent="onSubmit">
                      <v-container fluid>
                        <v-row justify="space-around">
                          <v-col cols="4">
                            <div class="d-flex justify-center mb-1">
                              <v-avatar size="15em">
                                <v-icon color="grey" size="15em">
                                  mdi-account-circle
                                </v-icon>
                              </v-avatar>
                            </div>
                            <div class="d-flex justify-center mb-7">
                              <v-btn
                                text
                                color="primary"
                                style="text-transform: none"
                              >
                                Edit Photo
                              </v-btn>
                            </div>
                            <label>Position</label>
                            <v-select
                              v-model="editedUser.position"
                              :items="positions"
                              outlined
                              dense
                              hide-details
                              single-line
                              color="#77bc1e"
                              class="mb-5"
                            ></v-select>
                            <label>Permissions</label>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title
                                  >Permission 1
                                </v-list-item-title>
                                <v-switch v-model="switch1" inset></v-switch>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-title
                                  >Permission 2</v-list-item-title
                                >
                                <v-switch v-model="switch2" inset></v-switch>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-title
                                  >Permission 3</v-list-item-title
                                >
                                <v-switch v-model="switch3" inset></v-switch>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-title
                                  >Permission 4</v-list-item-title
                                >
                                <v-switch v-model="switch4" inset></v-switch>
                              </v-list-item>
                            </v-list>
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
                              class="mb-3"
                            ></v-text-field>

                            <label>Address</label>
                            <v-text-field
                              v-model="editedUser.address"
                              outlined
                              dense
                              hide-details
                              single-line
                              color="#77bc1e"
                              class="mb-3"
                            ></v-text-field>

                            <v-row>
                              <v-col>
                                <label>E-mail</label>
                                <v-text-field
                                  v-model="editedUser.email"
                                  outlined
                                  dense
                                  hide-details
                                  single-line
                                  required
                                  color="#77bc1e"
                                  class="mb-3"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <label>Preferred Contact Phone Number</label>
                                <v-text-field
                                  v-model="editedUser.phoneNumber"
                                  outlined
                                  dense
                                  hide-details
                                  single-line
                                  color="#77bc1e"
                                  class="mb-3"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <label>Department</label>
                            <v-text-field
                              v-model="editedUser.department"
                              outlined
                              dense
                              hide-details
                              single-line
                              color="#77bc1e"
                              class="mb-3"
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
                                      class="mb-3"
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
                                      class="mb-3"
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
                              class="mb-3"
                            ></v-select>

                            <label>Shift</label>
                            <v-text-field
                              v-model="editedUser.shift"
                              outlined
                              dense
                              hide-details
                              single-line
                              color="#77bc1e"
                              class="mb-3"
                            ></v-text-field>

                            <label>Manager</label>
                            <v-text-field
                              v-model="editedUser.manager"
                              outlined
                              dense
                              hide-details
                              single-line
                              color="#77bc1e"
                              class="mb-3"
                            ></v-text-field>

                            <label>Favorite Color</label>
                            <v-text-field
                              v-model="editedUser.favColor"
                              outlined
                              dense
                              hide-details
                              single-line
                              color="#77bc1e"
                              class="mb-3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-card-actions class="mt-2">
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
                  </v-container>
                </v-card>
              </v-dialog>

              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item link v-bind="attrs" v-on="on">
                    <v-list-item-icon>
                      <v-icon color="blue-grey darken-2"> mdi-delete </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        >Delete Employee Record</v-list-item-title
                      >
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

              <v-dialog
                v-model="showActivityLog"
                fullscreen
                persistent
                hide-overlay
                transition="dialog-transition"
                ><template v-slot:activator="{ on, attrs }">
                  <v-list-item
                    link
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="userActivityLog(item._id)"
                  >
                    <v-list-item-icon>
                      <v-icon color="blue-grey darken-2"
                        >mdi-account-clock</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>View Activity Log</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <v-card>
                  <v-container fluid>
                    <v-row class="mb-2">
                      <v-card-title>
                        <h1 class="v-heading text-h4 text-sm-h4">
                          Account Activity Log
                        </h1>
                      </v-card-title>
                      <v-btn
                        icon
                        fab
                        absolute
                        right
                        color="black"
                        style="top: 0.5em"
                        @click="showActivityLog = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-row>

                    <v-data-table
                      :headers="activityHeaders"
                      :items="editedUser.history"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                    >
                      <template v-slot:item="{ item }">
                        <tr style="height: max-content">
                          <td>{{ item.action }}</td>
                          <td>{{ time(item.date) }}</td>
                          <td class="py-5">{{ item.message }}</td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
    <NewProfileDialog v-model="showProfileDialog" />
    <!-- <ActivityLog v-model="showActivityLog" :userID="userId" /> -->
  </v-container>
</template>

<script>
import * as UserService from "../services/UserService";
import moment from "moment";
import NewProfileDialog from "../components/NewProfileDialog.vue";
// import ActivityLog from "../components/ActivityLog.vue";
// import EmployeeRecord from "../components/EmployeeRecord.vue";
export default {
  name: "Home",
  components: {
    NewProfileDialog,
    // ActivityLog,
    // EmployeeRecord,
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
      history: [
        {
          action: "",
          date: "",
          message: "",
        },
      ],
    },
    startDateMenu: false,
    endDateMenu: false,
    showProfileDialog: false,
    showEmployeeRecord: false,
    showActivityLog: false,
    sortDesc: true,
    sortBy: 'date',
    activityHeaders: [
      {
        text: "Action",
        align: "start",
        sortable: false,
        value: "action",
        width: "25%",
        filterable: false,
      },
      { text: "Date", value: "date", width: "25%", filterable: false },
      {
        text: "Message",
        value: "message",
        sortable: false,
        width: "50%",
        filterable: false,
      },
    ],
    editDialog: false,
    deleteDialog: false,
    userId: "",
    userData: null,
    switch1: true,
    switch2: false,
    switch3: true,
    switch4: false,
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
    time: function (timeRaw) {
      var timeParsed = moment(timeRaw).format("L");
      return timeParsed;
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == "Date") {
          if (!isDesc[0]) {
            return new Date(b[index]) - new Date(a[index]);
          } else {
            return new Date(a[index]) - new Date(b[index]);
          }
        }
      });
      return items;
    },
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
    userActivityLog: async function (id) {
      await UserService.getUser(id).then((res) => {
        this.editedUser = res.data.user;
      });
    },
    // editUserData: async function (id) {
    //   await UserService.getUser(id).then((res) => {
    //     this.userData = res.data.user;
    //   });
    //   this.showEmployeeRecord = true;
    // },
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
    // showAlert(a) {
    //   if (event.target.classList.contains("btn__content")) return;
    //   alert("Alert! \n" + a.name);
    // },
  },
};
</script>

<style>
.v-input--selection-controls {
  margin-top: 0px !important;
}
</style>
