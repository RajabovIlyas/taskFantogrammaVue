import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Canvas from "@/components/Canvas.vue";
import Table from "@/components/Table.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/table",
      name: "table",
      component: Table,
      props: true
    },
    {
      path: "/canvas",
      name: "canvas",
      component: Canvas,
      props: true
    }
  ]
});
