import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Card from "@/components/Card.vue";
import Buttons from "@/components/Buttons.vue";
import Table from "@/components/Table.vue";
import Map from "@/components/Map.vue";
import Chart from "@/components/Chart.vue";
import Dashboard from "@/components/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/buttons",
      name: "buttons",
      component: Buttons
    },
    {
      path: "/card",
      name: "Card",
      component: Card
    },
    {
      path: "/table",
      name: "Table",
      component: Table
    },
    {
      path: "/map",
      name: "Map",
      component: Map
    },
    {
      path: "/chart",
      name: "Chart",
      component: Chart
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    }
  ]
});
