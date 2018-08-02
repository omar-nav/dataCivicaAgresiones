<template>
  <div id="svg-map">
    <div ref="svg-map"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";

export default {
  name: "SVGMap",
  data: function() {
    return {
      agresiones: [],
      states: this.$store.state.states
    };
  },
  mounted() {
    this.$refs["svg-map"].innerHTML = this.$store.state.mexico;

    axios
      .get("http://localhost:3000/agresiones")
      .then(response => {
        this.agresiones = response.data;
        console.log(this.agresiones);

        // Contando cuántos del estado de Puebla
        /*       const puebla =
        this.agresiones
          .filter(agresion => agresion["Estado"] === "Puebla")
          .length

      console.log(puebla) */
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
          dataset.push({
            state: state.name,
            number: state.number,
            color: state.color,
            total: total
          });
        });
        console.log(dataset);

        dataset.forEach(state => {
          d3
            .select("#svg-map svg")
            .selectAll("#est_" + state.number)
            .style("fill", state.color)
            .style("stroke", state.color);
        });
        /* 
        d3
          .select("#svg-map svg")
          .select("#est_21")
          .style("fill", "#b095b3");
      }) */

        /*const colors = {
          "Sin pena"    : "#eeeeee",
          "15 días"     : "#ece6ec",
          "3 meses"     : "#cfbdd0",
          "4 meses"     : "#bba4be",
          "6 meses"     : "#b095b3",
          "1 año"       : "#8b628f",
          "2 años"      : "#44064c"
      }

      const data = [
        {
          state: "Chihuahua",
          number: "06",
          minimumPenalty: "6 meses"
        },
        {
          state: "Coahuila",
          number: "08",
          minimumPenalty: "1 año"
        },
        {
          state: "Colima",
          number: "09",
          minimumPenalty: "2 años"
        },
        {
          state: "Jalisco",
          number: 14,
          minimumPenalty: "4 meses"
        },
        {
          state: "Nuevo León",
          number: 19,
          minimumPenalty: "6 meses"
        },
        {
          state: "Sonora",
          number: 26,
          minimumPenalty: "1 año"
        },
        {
          state: "Veracruz",
          number: 30,
          minimumPenalty: "Sin pena"
        },
        {
          state: "Yucatán",
          number: 31,
          minimumPenalty: "6 meses"
        }
      ]

      data
      .forEach(state => {
        d3.select("#svg-map svg").select("#est_"+state.number).style("fill", colors[state.minimumPenalty]);
      })
  }*/
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped lang="scss">
#svg-map {
}
</style>
