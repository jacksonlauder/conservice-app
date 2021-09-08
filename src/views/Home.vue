<template>
  <Team />
</template>

<script>
import Team from "../views/Team.vue";

export default {
  name: "Home",

  components: {
    Team,
  },
  beforeCreate: function () {
    fetch(this.$store.state.apiUrl + "/api/user").then((res) =>
      console.log(res)
    );
  },
};
</script>
