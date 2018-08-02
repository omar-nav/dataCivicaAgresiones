<template>
  <div id="table">
    <p>Tablas</p>
    <md-table>
      <md-table-row>
        <md-table-head>Fecha</md-table-head>
        <md-table-head>Agresión específica</md-table-head>
        <md-table-head>Estado</md-table-head>
        <md-table-head>Nombre</md-table-head>
        <md-table-head>Medio/Colectivo</md-table-head>
      </md-table-row>

      <md-table-row v-for="agresion in agresiones" :key="agresion.id">
        <md-table-cell>{{agresion["Fecha"]}}</md-table-cell>
        <md-table-cell>{{agresion["Agresión específica"]}}</md-table-cell>
        <md-table-cell>{{agresion["Estado"]}}</md-table-cell>
        <md-table-cell>{{agresion["Nombre"]}}</md-table-cell>
        <md-table-cell>{{agresion["Medio/Colectivo"]}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Table",
  data: function() {
    return {
      agresiones: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/agresiones')
    .then((response) => {
      // handle success
      //console.log(response.data);
      this.agresiones = response.data;
      console.log(this.agresiones);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
};
</script>

<style scoped lang="scss">
#table {

}
</style>
