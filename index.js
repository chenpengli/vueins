import Vue from "vue";
import App from "./App";
import VueDragscroll from "vue-dragscroll";

import "bulma/css/bulma.css";

Vue.use(VueDragscroll);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
});
