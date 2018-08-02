<template>
  <div id="map">
    <p>Mapas</p>
    <SVGMap />
    <D3Map />
    <LeafletMap />
  </div>
</template>

<script>
import SVGMap from "@/components/SVGMap.vue";
import D3Map from "@/components/D3Map.vue";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "Map",
  components: {
    SVGMap,
    D3Map,
    LeafletMap
  },
  data: function() {
    return {

    };
  }
};
</script>

<style scoped lang="scss">
#map {

}
</style>
