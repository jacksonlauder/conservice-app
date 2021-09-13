<template>
  <v-container fluid class="pa-8">
    <v-row class="mb-5 align-center">
      <v-col cols="4">
        <h1 class="v-heading text-h4 text-sm-h4">Reports</h1>
      </v-col>
    </v-row>
    <v-card>
      <!-- <Chart /> -->
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-header
        hide-default-footer
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
// import Chart from "../components/Chart.vue";
export default {
  name: "Reports",
  components: {
    // Chart
  },

  data: () => ({
    headers: [
      {
        text: "name",
        align: "start",
        sortable: false,
        value: "name",
        width: "50%",
      },
      { text: "Number", value: "number", width: "50%" },
    ],
    items: [
      {
        name: "Weekly Hired",
        number: 5,
      },
      {
        name: "Terminated for current year",
        number: 5,
      },
    ],
  }),
};
</script>
