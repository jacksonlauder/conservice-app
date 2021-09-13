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
        <v-container fluid>
          <v-row class="mb-2">
            <v-card-title>
              <h1 class="v-heading text-h4 text-sm-h4">Account Activity Log</h1>
            </v-card-title>
            <v-btn
              icon
              fab
              absolute
              right
              color="black"
              style="top: 0.5em"
              @click="cancel"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-row>

          <v-data-table
            :headers="headers"
            :items="logs"
            :search="search"
            height="100%"
          >
            <!-- eslint-disable-next-line -->
          <template v-slot:item="{ item }">
              <tr style="height: max-content">
                <td>{{ item.action }}</td>
                <td>{{ item.date }}</td>
                <td class="py-5">{{ item.message }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "ProfileDialog",
  props: {
    value: Boolean,
  },

  data: () => ({
    search: "",
    headers: [
      {
        text: "Action",
        align: "start",
        sortable: false,
        value: "action",
        width: "25%",
      },
      { text: "Date", value: "date", width: "25%" },
      { text: "Message", value: "message", sortable: false, width: "50%" },
    ],
    logs: [
      {
        action: "Modified Permissions",
        date: "2021-01-02",
        message:
          "Modified Permission 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque doloremque blanditiis dolorem quo minus, animi modi veniam fugit earum? Illum ratione ducimus ipsam, asperiores veritatis itaque distinctio optio eveniet!",
      },
      {
        action: "Modified Manager",
        date: "2021-01-02",
        message:
          "Modified Manager Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque doloremque blanditiis dolorem quo minus, animi modi veniam fugit earum? Illum ratione ducimus ipsam, asperiores veritatis itaque distinctio optio eveniet!",
      },
      {
        action: "Modified Position",
        date: "2021-01-02",
        message:
          "Modified Position Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque doloremque blanditiis dolorem quo minus, animi modi veniam fugit earum? Illum ratione ducimus ipsam, asperiores veritatis itaque distinctio optio eveniet!",
      },
    ],
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
    cancel: function () {
      this.show = false;
    },
  },
};
</script>
