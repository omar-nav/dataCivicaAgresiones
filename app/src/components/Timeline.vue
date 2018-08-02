<template>
  <div id="timeline">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";

export default {
  name: "Timeline",
  data: function() {
    return {
      agresiones: [],
      states: this.$store.state.states
    };
  },
  mounted() {
    /* obtener los datos */
    axios
      .get("http://localhost:3000/agresiones")
      .then(response => {
        this.agresiones = response.data;
        //console.log(this.agresiones);

        /* preparar los datos */

        /* crear una variable para almacenar los datos procesados */
        const dataset = [];

        /* iterar entidad por entidad */
        this.states.forEach(state => {
          /* filtrar las agresiones entidad por entidad */
          const total = this.agresiones.filter(agresion => {
            /* si la entidad en las agresiones aparece como CDMX */
            if (
              state.name === "Ciudad de México" &&
              agresion["Estado"] === "CDMX"
            ) {
              return true;
            }
            /* selecciona sólo las agresiones que sean de la entidad */
            return agresion["Estado"] === state.name;
          }).length;

          /* almacenar el total para cada entidad */
          dataset.push(total);
        });

        console.log(dataset);

        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: this.states.map(state => state.name),
            datasets: [
              {
                label: "# of Votes",
                data: dataset,
                backgroundColor: "#E7C5BD",
                borderColor: "#E7C5BD",
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped lang="scss">
#timeline {
}
</style>
