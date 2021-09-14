<template>
  <v-container fluid class="pa-8">
    <v-row class="mb-5 align-center">
      <v-col cols="4">
        <h1 class="v-heading text-h4 text-sm-h4">Reports</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="4" lg="2">
        <v-card>
          <chart :chart-data="data" :options="options" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title>Weekly Hired</v-card-title>
          <v-divider></v-divider>
          <v-card-text><h3>25</h3></v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title>Terminated for current year</v-card-title>
          <v-divider></v-divider>
          <v-card-text><h3>25</h3></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "../components/Chart.js";
export default {
  name: "Reports",
  components: { Chart },

  data: () => ({
    data: {
      labels: ["Hired", "Terminated"],
      datasets: [
        {
          label: "Number of Employees",
          backgroundColor: ["#0D47A1", "#880E4F"],
          data: [25, 25],
        },
      ],
    },
    options: {
      legend: { display: true },
      title: { display: false },
    },
  }),
};
</script>
