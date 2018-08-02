<template>
  <div id="chart">
    <p>Gráficas</p>
    <Bar />
    <Timeline />
  </div>
</template>

<script>
import Bar from "@/components/Bar.vue";
import Timeline from "@/components/Timeline.vue";

export default {
  name: "Chart",
  components: {
    Bar,
    Timeline
  },
  data: function() {
    return {

    };
  }
};
</script>

<style scoped lang="scss">
#chart {

}
</style>
