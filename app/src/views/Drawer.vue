<template>
  <div id="drawer">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Dashboards</span>
        <md-badge md-content="1" md-dense>
          <md-button class="md-icon-button">
            <md-icon>notifications</md-icon>
          </md-button>
        </md-badge>

        <md-badge class="md-primary" md-content="12" md-dense>
          <md-button class="md-icon-button" to="/">
            <md-icon>home</md-icon>
          </md-button>
        </md-badge>
      </md-app-toolbar>

      <md-app-drawer md-permanent="clipped">
        <md-list>
          <md-list-item to="/buttons">
            <md-icon>radio_button_checked</md-icon>
            <span class="md-list-item-text">Botones</span>
          </md-list-item>

          <md-list-item to="/card">
            <md-icon>description</md-icon>
            <span class="md-list-item-text">Tarjetas</span>
          </md-list-item>

          <md-list-item to="/table">
            <md-icon>table_chart</md-icon>
            <span class="md-list-item-text">Tablas</span>
          </md-list-item>

          <md-list-item to="/map">
            <md-icon>map</md-icon>
            <span class="md-list-item-text">Mapas</span>
          </md-list-item>

          <md-list-item to="/chart">
            <md-icon>bar_chart</md-icon>
            <span class="md-list-item-text">Gráficas</span>
          </md-list-item>

          <md-list-item to="/dashboard">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  props: {}
};
</script>

<style scoped lang="scss">
#drawer {
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, 0.12);
    .md-title {
      margin-right: 15px;
    }
    .md-drawer {
      width: 230px;
      max-width: calc(100vw - 125px);
      a span {
        color: black;
      }
    }
  }
}
</style>
