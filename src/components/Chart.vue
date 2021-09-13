<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js";
import planetChartData from "../components/planet-data";

export default {
  name: "Chart",
  data() {
    return {
      planetChartData: planetChartData,
    };
  },
    mounted() {
    const ctx = document.getElementById('planet-chart');
    new Chart(ctx, this.planetChartData);
  }
};
</script>
