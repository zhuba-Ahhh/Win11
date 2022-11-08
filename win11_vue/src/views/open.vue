<template>
  <div>
    <bootscreen v-show="!clock"></bootscreen>

    <transition name="el-fade-in-linear">
      <secpage
        v-show="clock && !showout"
        class="transition-box"
        @click="clickshow"
      ></secpage>
    </transition>
    <transition name="el-fade-in-linear">
      <login v-show="showout" class="transition-box"></login>
    </transition>
  </div>
</template>

<script>
import Bootscreen from "@/components/LoginActivity/Bootscreen.vue";
import Login from "@/components/LoginActivity/Login.vue";
import Secpage from "@/components/LoginActivity/Secpage.vue";
import preLoad from "@/utils/preLoad";

export default {
  name: "open",
  data() {
    return {
      clock: false,
      showout: false,
    };
  },
  components: {
    Login,
    Bootscreen,
    Secpage,
  },
  methods: {
    clickshow() {
      this.showout = true;
    },
  },
  mounted: function () {
    // 图片预加载完成后 2 s执行本地加载
    preLoad().then((res) => {
      setTimeout(() => {
        this.clock = true;
      }, 2000);
    });
  },
};
</script>

<style scoped></style>
