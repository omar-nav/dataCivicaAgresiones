<template>
  <div id="leaflet-map">
    <div id="mapid"></div>
  </div>
</template>

<script>
import L from "leaflet";
import * as d3 from "d3";
import axios from "axios";

export default {
  name: "LeafletMap",
  data() {
    return {
      agresiones: [],
      mymap: undefined
    };
  },
  mounted() {
    if (this.mymap != undefined || this.mymap != null) {
      this.mymap.off();
      this.mymap.remove();
    }

    this.mymap = L.map("mapid", {
      center: [19.4326, -99.1332],
      zoom: 6
    });

    this.mymap.scrollWheelZoom.disable();
    let tileLayer =
      "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}@2x.png";
    let accessToken =
      "pk.eyJ1Ijoiam9yYW5kcmFkZWZpZyIsImEiOiJjamV0bm9vczAzMTc3MnlvMG4wMTBlaXY0In0.6Te0HBRHyNH0TAVIQNT89w";

    L.tileLayer(`${tileLayer}?access_token=${accessToken}`, {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox"
    }).addTo(this.mymap);

    //L.marker([19.4326, -99.1332]).addTo(this.mymap);

    axios.get('http://localhost:3000/agresiones')
    .then((response) => {
      this.agresiones = response.data;
      //console.log(this.agresiones);

      this.agresiones.forEach(agresion => {
        //console.log(agresion["Estado"], agresion["Latitud"], agresion["Longitud"])
        L.marker([agresion["Latitud"], agresion["Longitud"]]).addTo(this.mymap);
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
</script>

<style lang="scss">
#leaflet-map {
  #mapid {
    height: 600px;
    z-index: 0;
  }
}
</style>
