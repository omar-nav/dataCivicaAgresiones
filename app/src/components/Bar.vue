<template>
  <div id="bar">
    <svg width="960" height="500"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";

export default {
  name: "Bar",
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
          dataset.push({
            state: state.name,
            total: total
          });
        });

        console.log(dataset);

        /* dibujar el svg con los datos */

        const svg = d3.select("#bar svg"),
          margin = { top: 20, right: 20, bottom: 100, left: 40 },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

        const x = d3
            .scaleBand()
            .rangeRound([0, width])
            .padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]);

        const g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        x.domain(dataset.map(d => d.state));
        y.domain([0, d3.max(dataset, d => d.total)]);

        g
          .append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("x", -10)
          .attr("transform", "rotate(270)")
          .style("text-anchor", "end");

        g
          .append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10));

        g
          .selectAll(".bar")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d.state))
          .attr("y", d => y(d.total))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.total));
      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
#bar {
  .bar {
    fill: #bd4763;
  }

  .bar:hover {
    fill: #e1b6a9;
  }
}
</style>
