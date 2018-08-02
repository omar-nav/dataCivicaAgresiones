<template>
  <div id="home">
    <h1>Tarjetas y botones</h1>
    <buttons />
    <card />
  </div>
</template>

<script>
// @ is an alias to /src
import buttons from "@/components/Buttons.vue";
import card from "@/components/Card.vue";

export default {
  name: "home",
  components: {
    buttons,
    card
  }
};
</script>

<style scoped lang="scss">
#home {
  .md-display-1 {
    margin-bottom: 15px;
  }
  .md-card {
    margin-bottom: 15px;
  }
}
</style>
