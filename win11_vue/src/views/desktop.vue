<template>
  <div class="desktop-shade" :style="{ '--opacity': Lightness }">
    <div
      class="desktop"
      :style="{ backgroundImage: 'url(' + bgArr[bgIdx] + ')' }"
      :class="{ 'night-light': isOpenLightmode }"
    >
      <div class="main" @click="closeClick" @contextmenu.prevent="rightClick">
        <!-- 鼠标右键出现的列表 -->
        <Click @clickMenu="menuJudge"></Click>
        <!-- 鼠标右键图标出现的列表 -->
        <IconMenu @iconMenu="iconEvent"></IconMenu>
        <!-- 桌面图标列表组件 -->
        <AppList
          :displayMode="displayMode"
          :Display="Display"
          :sortMethod="sortMethod"
          @contextmenu.stop.prevent="iconMenu"
          @winStateChange="winStateChange"
          @changeDeskIconSize="changeDeskIconSize"
          @openTxtFile="openTxtFile"
          @newTxtFile="newTxtFile"
          ref="appList"
        ></AppList>
        <!-- Edge应用窗口 -->
        <EdgeApp
          :zIndex="{ 'z-index': zIndex['edge'] }"
          :winMax="winMax['edge']"
          :winHide="winHide['edge']"
          :winSize="winSize['edge']"
          @winStateChange="winStateChange"
        ></EdgeApp>
        <!-- VSCode应用窗口 -->
        <VscodeApp
          :zIndex="{ 'z-index': zIndex['vscode'] }"
          :winMax="winMax['vscode']"
          :winHide="winHide['vscode']"
          :winSize="winSize['vscode']"
          @winStateChange="winStateChange"
        ></VscodeApp>
        <!-- Notepad应用窗口 -->
        <NotepadApp
          :zIndex="{ 'z-index': zIndex['notepad'] }"
          :winMax="winMax['notepad']"
          :winHide="winHide['notepad']"
          :winSize="winSize['notepad']"
          :currentFile="currentFile"
          ref="notepadApp"
          @winStateChange="winStateChange"
          @saveTxtFile="saveTxtFile"
        ></NotepadApp>
        <!-- Markdown应用窗口 -->
        <MarkdownApp
          :zIndex="{ 'z-index': zIndex['markdown'] }"
          :winMax="winMax['markdown']"
          :winHide="winHide['markdown']"
          :winSize="winSize['markdown']"
          @winStateChange="winStateChange"
        ></MarkdownApp>
        <!-- Computer应用窗口 -->
        <ComputerApp
          :zIndex="{ 'z-index': zIndex['computer'] }"
          :winMax="winMax['computer']"
          :winHide="winHide['computer']"
          :winSize="winSize['computer']"
          @winStateChange="winStateChange"
        ></ComputerApp>
        <!-- Explorer应用窗口 -->
        <ExplorerApp
          :zIndex="{ 'z-index': zIndex['explorer'] }"
          :winMax="winMax['explorer']"
          :winHide="winHide['explorer']"
          :winSize="winSize['explorer']"
          @winStateChange="winStateChange"
        ></ExplorerApp>
        <!-- Bin应用窗口 -->
        <BinApp
          :zIndex="{ 'z-index': zIndex['bin'] }"
          :winMax="winMax['bin']"
          :winHide="winHide['bin']"
          :winSize="winSize['bin']"
          @winStateChange="winStateChange"
        />
        <!--Pdf文件窗口-->
        <PdfApp
          :zIndex="{ 'z-index': zIndex['pdf'] }"
          :winMax="winMax['pdf']"
          :winHide="winHide['pdf']"
          :winSize="winSize['pdf']"
          @winStateChange="winStateChange"
        >
        </PdfApp>
        <!---->
        <StoreApp
          :zIndex="{ 'z-index': zIndex['store'] }"
          :winMax="winMax['store']"
          :winHide="winHide['store']"
          :winSize="winSize['store']"
          @winStateChange="winStateChange"
        >
        </StoreApp>
      </div>

      <!-- 状态栏弹框+护眼模式 -->
      <transition name="el-fade-in">
        <div v-show="isShowControls" style="z-index: 999">
          <ControlCenter
            @toggleLightMode="toggleLightMode"
            @changeLightnesss="getLightnesss"
          ></ControlCenter>
        </div>
      </transition>
      <!-- 任务栏 -->
      <BarTask
        @showControls="showControls"
        @responseTaskbarAction="responseTaskbarAction"
        @getActiveWin="getActiveWin"
        ref="taskBar"
      ></BarTask>
      <!-- 开始栏 -->
      <BeginBar
        @winStateChange="winStateChange"
        :isShowStartMenu="isShowStartMenu"
        @showStartmenu="showStartmenu"
      ></BeginBar>
    </div>
  </div>
</template>

<script>
import BarTask from "@/components/Bar/BarTask.vue";
import ControlCenter from "@/components/Bar/ControlCenter.vue";
import AppList from "@/components/DeskApp/DesktopAppList.vue";
import Click from "@/components/Click/click.vue";
import IconMenu from "@/components/Click/iconMenu";
import EdgeApp from "@/components/DeskApp/EdgeApp.vue";
import VscodeApp from "@/components/DeskApp/VscodeApp.vue";
import NotepadApp from "@/components/DeskApp/NotepadApp.vue";
import MarkdownApp from "@/components/KeyApp/MarkdownApp.vue";
import BinApp from "@/components/KeyApp/BinApp.vue";
import ExplorerApp from "@/components/LoginActivity/FileExplorer.vue";
import PdfApp from "@/components/LoginActivity/PdfApp.vue";
import ComputerApp from "@/components/KeyApp/ComputerApp.vue";
import BeginBar from "@/components/Bar/BeginBar.vue";
import StoreApp from "@/components/LoginActivity/StoreApp.vue";
import CalculatorApp from "@/components/DeskApp/CalculatorApp.vue";
export default {
  name: "desktop",
  components: {
    AppList,
    Click,
    IconMenu,
    EdgeApp,
    BarTask,
    VscodeApp,
    ControlCenter,
    NotepadApp,
    MarkdownApp,
    BinApp,
    ComputerApp,
    ExplorerApp,
    PdfApp,
    BeginBar,
    StoreApp,
    CalculatorApp,
  },
  data() {
    return {
      //#region  DeskApp 控制的 data
      displayMode: "small", // 控制桌面图标大小：small 小图标（默认） middle 中图标 big 大图标
      Display: true, // 控制桌面图标是否显示
      sortMethod: "date", // 控制图标排序方式：size 按大小 date 按时间 name 按名称
      currentZIndex: 1,
      currentFile: {}, // 记事本当前文件
      noteFiles: {
        // 记事本保存的内容
        "项目介绍.txt": {
          fileName: "项目介绍.txt",
          content: "# Win11 in Vue! \n\n## 你从未体验过的全新版本！\n\n",
        },
      },
      winMax: {
        // 窗口是否最大化：false 否 true 是
        // 通过改变对应 app 的该数组项来控制窗口的**最小化和显示**：
        // * true -> false : 从显示状态最小化
        // * false -> true : 从最小化状态显示窗口
        edge: "true",
        vscode: "true",
        markdown: "true",
        notepad: "true",
        computer: "true",
        explorer: "true",
        bin: "true",
        pdf: "true",
        store: "true",
      },
      winHide: {
        // 窗口是否隐藏：false 否 true 是
        // 通过改变对应 app 的该数组项来控制窗口的**打开和关闭**：
        // * true -> false : 从关闭状态到打开
        // * false -> true : 从打开状态到关闭
        edge: "true",
        vscode: "true",
        markdown: "true",
        notepad: "true",
        computer: "true",
        explorer: "true",
        bin: "true",
        pdf: "true",
        store: "true",
      },
      winSize: {
        // 窗口尺寸：normal 还原窗口 max 最大化窗口
        // 通过改变对应 app 的该数组项来控制窗口的**最大化和还原**：
        // * normal -> max : 从还原状态到最大化
        // * max -> normal : 从最大化状态到还原
        edge: "max",
        vscode: "max",
        markdown: "normal",
        notepad: "normal",
        computer: "normal",
        explorer: "normal",
        bin: "normal",
        pdf: "max",
        store: "true",
      },
      zIndex: {
        edge: 0,
        vscode: 0,
        markdown: 0,
        notepad: 0,
        computer: 0,
        explorer: 0,
        bin: 0,
        pdf: 0,
        store: 0,
      },
      //#endregion

      isShowControls: false, //是否展示状态栏
      isOpenLightmode: false, //是否开启夜间模式
      Lightness: 0, //亮度
      isShowStartMenu: false, //是否展示开始栏
      bgIdx: 0, // 背景图片
      bgArr: [
        require("@/assets/img/wallpapers/light.jpg"),
        require("@/assets/img/wallpapers/light2.jpg"),
      ],
    };
  },
  methods: {
    //#region  Click控制的 method
    // 1. 鼠标右键点击出现 小弹框
    rightClick(e) {
      const { clientX, clientY } = e;
      this.$store.commit("setClick", {
        clientX,
        clientY,
        vis: true,
        iconVis: false,
      });
    },
    // 2.
    iconMenu(e) {
      const { clientX, clientY } = e;
      this.$store.commit("setClick", {
        clientX,
        clientY,
        vis: false,
        iconVis: true,
      });
    },
    // 2. 鼠标左键点击关闭小弹框
    closeClick() {
      this.$store.commit("setClick", {
        vis: false,
        iconVis: false,
      });
      // 任务栏
      this.$refs["taskBar"].closeDateAndControls();
      // 记事本
      this.$refs["notepadApp"].closeFileMenu();
      if (this.isShowStartMenu) {
        this.showStartmenu();
      }
    },
    // 3. clickMenu的事件回调
    menuJudge(arr) {
      const type = arr[0];
      const idx = arr[1];
      switch (type) {
        case 0:
          this.changeDeskIconSize(idx); // 切换图标
          break;
        case 1:
          this.changeDeskIconSort(idx); // 排序
          break;
        case 4:
          if (idx == 0) this.newFile("folder");
          if (idx == 2) this.newFile("txt");
          if (idx == 3) this.newFile("markdown");
          break;
        case 5:
          this.changeBg();
          break;
      }
    },
    // 4.iconMenu 图标右键菜单回调
    iconEvent(idx) {
      switch (idx) {
        case 0:
          break;
      }
    },
    // 5. changeBg 更换背景
    changeBg() {
      this.bgIdx += 1;
    },
    //#endregion

    //#region DeskApp 回调函数
    // 1 提供给**窗口子组件**的回调函数
    // 请在窗口子组件的右上角三个按钮的事件函数中使用 $emit 调用该函数以调整窗口状态
    winStateChange(appname, e) {
      // appname 应用名称的唯一标识符
      // e 事件编码：0 关闭按钮被按下 1 最小化按钮被按下 2 最大化/还原按钮被按下
      //            3 任务栏图标被按下 4 桌面图标或开始菜单被按下
      if (e === 0) {
        // 关闭按钮被按下
        this.winHide[appname] = "true";
        if (appname === "notepad") this.currentFile = {};
        this.$refs["taskBar"].changeApp(appname, 0);
        this.setZIndex(appname, 0);
      } else if (e === 1) {
        // 最小化按钮被按下
        this.winMax[appname] = "false";
        this.$refs["taskBar"].changeApp(appname, 1);
      } else if (e === 2) {
        // 最大化/还原按钮被按下
        if (this.winSize[appname] === "normal") this.winSize[appname] = "max";
        else this.winSize[appname] = "normal";
      } else if (e === 3) {
        // 任务栏图标被按下
        if (this.winHide[appname] === "false") {
          // 切换逻辑
          if (this.winMax[appname] === "false") {
            // 当应用处于最小化状态时
            this.setZIndex(appname);
            this.winMax[appname] = "true";
            this.$refs["taskBar"].changeApp(appname, 2);
          } else {
            // 当应用处于非最小化状态时
            if (this.getActiveWin() === appname) {
              // 应用为当前活动窗口，最小化它并切换下一个窗口为活动窗口
              this.winMax[appname] = "false";
              this.setZIndex(appname, 0);
              this.$refs["taskBar"].changeApp(appname, 1);
            } else {
              // 否则，切换它
              this.setZIndex(appname);
              this.$refs["taskBar"].changeApp(appname, 2);
            }
          }
        } else {
          // 打开逻辑
          this.setZIndex(appname);
          this.winHide[appname] = "false";
          this.$refs["taskBar"].changeApp(appname, 3);
        }
      } else {
        // 桌面图标或开始菜单被按下
        this.setZIndex(appname);
        this.winHide[appname] = "false";
        if (this.$refs["taskBar"].getAppState(appname)) {
          if (this.winMax[appname] === "false") this.winMax[appname] = "true";
        }
        this.$refs["taskBar"].changeApp(appname, 3);
      }
    },

    // 2 提供给**右键菜单**子组件的回调函数
    // 请在右键菜单子组件的切换大中小图标的事件函数中使用 $emit 调用该函数以调整桌面图标大小
    changeDeskIconSize(iconSize) {
      // iconSize 要切换成的图标尺寸：0 小图标 1 中图标 2 大图标
      if (iconSize === 0) this.displayMode = "small";
      else if (iconSize === 1) this.displayMode = "middle";
      else if (iconSize === 2) this.displayMode = "big";
      else this.Display = !this.Display;
    },
    // 请在右键菜单子组件的切换图标排列方式的事件函数中使用 $emit 调用该函数以调整桌面图标排列方式
    changeDeskIconSort(sortMethod) {
      // sortMethod 要切换成的图标排序方式：0 按时间 1 按名称 2 按大小
      if (sortMethod === 3) this.sortMethod = "date";
      else if (sortMethod === 0) this.sortMethod = "name";
      else if (sortMethod === 1) this.sortMethod = "size";
    },
    // 请在右键菜单子组件的新建文件、文件夹的事件函数中使用 $emit 调用该函数
    newFile(fileType) {
      // fileType 新建的文件类型："folder" 文件夹 "txt" txt文件 "md" markdown文件
      this.$refs["appList"].createNewItem(fileType);
    },

    // 3 提供给桌面图标列表的回调函数
    openTxtFile(filename) {
      this.currentFile = this.noteFiles[filename];
    },
    newTxtFile(filename) {
      this.noteFiles[filename] = {
        fileName: filename,
        content: "",
      };
    },

    // 4 提供给记事本的回调函数
    saveTxtFile(filename, filecontent) {
      this.noteFiles[filename].content = filecontent;
      this.$refs["appList"].alterTxtFileSize(filename, filecontent.length);
    },

    // 5 提供给任务栏的回调函数
    responseTaskbarAction(appname) {
      if (appname === "home") {
        this.showStartmenu();
      } else if (appname === "search") {
        // console.log("todo: 打开搜索栏");
      } else if (appname === "widget") {
        // console.log("todo: 打开资讯栏");
      } else {
        if (appname === "settings") return;
        this.winStateChange(appname, 3);
      }
    },

    // 6 窗口调度
    setZIndex(appname, val) {
      if (typeof val === "undefined") {
        this.zIndex[appname] = this.currentZIndex;
        this.currentZIndex++;
      } else {
        this.zIndex[appname] = val;
      }
    },
    getActiveWin() {
      let appname = "";
      let zindex;
      for (let i in this.zIndex) {
        if (!appname) {
          appname = i;
          zindex = this.zIndex[i];
          continue;
        }
        if (this.zIndex[appname] < this.zIndex[i]) {
          appname = i;
          zindex = this.zIndex[i];
        }
      }
      if (zindex === 0) return "";
      this.currentZIndex = zindex + 1;
      return appname;
    },

    //#endregion

    //以下为Bar开发的
    //是否出现状态栏
    showControls(isShow) {
      this.isShowControls = isShow;
    },
    //切换护眼模式
    toggleLightMode(isOpen) {
      this.isOpenLightmode = isOpen;
    },
    //获取亮度
    getLightnesss(Lightness) {
      this.Lightness = 1 - Lightness / 100;
    },
    showStartmenu() {
      this.isShowStartMenu = !this.isShowStartMenu;
    },
  },
  watch: {
    bgIdx() {
      const n = this.bgArr.length;
      this.bgIdx == n && (this.bgIdx = 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  user-select: none;
  position: relative;
  .main {
    flex: 1;
    // background-color: green;
    height: calc(100vh - 40px);
  }
}
.desktop::after {
  content: "";
  background: rgba(255, 0, 0, 0.15);
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  pointer-events: none;
  transition: 2s;
}

.desktop.night-light::after {
  opacity: 1;
}

.desktop-shade {
  --opacity: 0;
}
.desktop-shade::after {
  content: "";
  background: black;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  pointer-events: none;
  transition: 0.5s;
}

.desktop-shade::after {
  opacity: var(--opacity);
}
</style>
