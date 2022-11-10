import {
  createApp
} from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/utils/px2rem.js"; // px转rem
import "element-plus/dist/index.css";
import "@/assets/scss/reset.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount("#app");