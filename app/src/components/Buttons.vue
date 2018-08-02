<template>
  <div id="buttons">
    <p>Botones</p>
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
      <md-button class="md-primary md-raised" @click="clicked">Hacer algo</md-button>
      <md-switch v-model="show" @change="switched">Mostrar</md-switch>
      <md-radio v-model="option" @change="doSomething" value="option1">Opción 1</md-radio>
      <md-radio v-model="option" @change="doSomething" value="option2">Opción 2</md-radio>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "buttons",
  components: {},
  data: () => ({
    show: true,
    option: "option"
  }),
  methods: {
    clicked: function() {
      console.log("Clicked!");
    },
    switched: function() {
      console.log(this.show, "!");
    },
    doSomething: function() {
      console.log(this.option, "!");
    }
  }
};
</script>

<style scoped lang="scss">
#buttons {
  .md-display-1 {
    margin-bottom: 15px;
  }
  .md-card {
    margin-bottom: 15px;
  }
}
</style>
