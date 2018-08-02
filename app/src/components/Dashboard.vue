<template>
  <div id="dashboard">
    <p>Dashboard</p>
    <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 center">
      <SVGMap />
    </div>
    <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 center">
      <D3Map />
    </div>
    <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 center">
      <LeafletMap />
    </div>
    <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 center">
      <Bar />
    </div>
    <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100 center">
      <Timeline />
    </div>
        <div class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100">
      <Table/>
    </div>
  </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import SVGMap from "@/components/SVGMap.vue";
import D3Map from "@/components/D3Map.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import Bar from "@/components/Bar.vue";
import Timeline from "@/components/Timeline.vue";

export default {
  name: "Dashboard",
  components: {
    Table,
    SVGMap,
    D3Map,
    LeafletMap,
    Bar,
    Timeline
  },
  data: function() {
    return {};
  }
};
</script>

<style scoped lang="scss">
#dashboard {
  display: flex;
  justify-content: center;
}
</style>
