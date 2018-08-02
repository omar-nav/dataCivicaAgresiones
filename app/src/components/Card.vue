<template>
  <div id="card">
  <!-- Display -->
    <p>Tarjetas</p>
    <!-- Card -->
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="state in states" v-bind:key="state.alias">
        <!-- Card -->
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title"> {{ state.name }} </div>
              <div class="md-subhead">Con efectos hover</div>
            </md-card-header>
            <md-card-content>
               {{ state.alias }}
            </md-card-content>
            <md-card-actions>
              <md-button>Botón</md-button>
              <md-button>Botón</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "card",
  components: {},
  data: function() {
    return {
      states: this.$store.state.states
    };
  }
};
</script>

<style scoped lang="scss">
#card {
  .md-display-1 {
    margin-bottom: 15px;
  }
  .md-card {
    margin-bottom: 15px;
  }
}
</style>
