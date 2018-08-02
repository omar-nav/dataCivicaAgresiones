<template>
  <div id="d3-map" />
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import mx from "@/assets/topojson/mx.json";
import axios from "axios";

export default {
  name: "D3Map",
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
            number: state.number,
            color: state.color,
            total: total
          });
        });

        console.log(dataset);

        const width = 960,
          height = 628;

        const projection = d3
          .geoConicConformal()
          .rotate([102, 0])
          .center([0, 24])
          .parallels([17.5, 29.5])
          .scale(1850)
          .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        const svg = d3
          .select("#d3-map")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        svg
          .append("g")
          .attr("class", "municipalities")
          .selectAll("path")
          .data(topojson.feature(mx, mx.objects.municipalities).features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", d => "est-" + d.properties.state)
          .append("title")
          .text(d => d.properties.name);

        /*svg.append("path")
          .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state !== b.properties.state; }))
          .attr("class", "state-boundary")
          .attr("d", path);*/

        /*svg.append("path")
          .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state === b.properties.state && a !== b; }))
          .attr("class", "municipality-boundary")
          .attr("d", path);*/

        d3.select(this.frameElement).style("height", height + "px");
        dataset.forEach(state => {
          d3
            .select("#d3-map svg")
            .selectAll(".est-" + state.number)
            .style("fill", state.color)
            .style("stroke", state.color);
        });
        /*         d3
          .select("#d3-map svg")
          .selectAll(".est-8")
          .style("fill", "#A23F60")
          .style("stroke", "#A23F60");
        d3
          .select("#d3-map svg")
          .selectAll(".est-20")
          .style("fill", "#BF4D63")
          .style("stroke", "#BF4D63");
        d3
          .select("#d3-map svg")
          .selectAll(".est-23")
          .style("fill", "#E1B6A9")
          .style("stroke", "#E1B6A9");
        d3
          .select("#d3-map svg")
          .selectAll(".est-26")
          .style("fill", "#CF7A6E")
          .style("stroke", "#CF7A6E");
        d3
          .select("#d3-map svg")
          .selectAll(".est-30")
          .style("fill", "#BD4763")
          .style("stroke", "#BD4763");
        d3
          .select("#d3-map svg")
          .selectAll(".est-31")
          .style("fill", "#E7C5BD")
          .style("stroke", "#E7C5BD");
        d3
          .select("#d3-map svg")
          .selectAll(".est-14")
          .style("fill", "#FF0000")
          .style("stroke", "#FF0000"); */
      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
#d3-map {
  .municipalities {
    fill: #222;
    stroke: #222;
  }

  /*.municipalities :hover {
    fill: orange;
  }

  .state-boundary {
    fill: none;
    stroke: #fff;
    pointer-events: none;
  }

  .municipality-boundary {
    fill: none;
    stroke: #fff;
    stroke-opacity: .25;
    stroke-width: .5px;
    pointer-events: none;
  }*/
}
</style>
