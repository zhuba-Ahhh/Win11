<template>
  <div
    class="calculator floatTab dpShadow"
    :style="zIndex"
    :win-size="winSize"
    :win-max="winMax"
    :win-hide="winHide"
    @click="closeFileMenu"
    @keydown.ctrl.s.prevent="saveBtnClick"
  >
    <div class="standard-main" id="std-main">
      <div class="title">
        <div class="toolbar">
          &nbsp;&nbsp;计算器
          <div class="actbtns">
            <div class="minbtn" @click="clickMinBtn">
              <img width="8" src="@/assets/img/appIcons/minimize.png" alt="" />
            </div>
            <div class="maxbtn" @click="clickMaxBtn">
              <img width="8" src="@/assets/img/appIcons/maximize.png" alt="" />
            </div>
            <div class="closebtn" @click="clickCloseBtn">
              <img width="8" src="@/assets/img/appIcons/close.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!--结果显示区域-->
      <div class="result">
        <!--显示类型信息-->
        <div class="type" id="std-show-bar">☰&nbsp;&nbsp;&nbsp;Standard</div>
        <!--上一步的结果-->
        <div class="pre" id="std-pre-step">&nbsp;</div>
        <!--第二个/运算结果-->
        <div class="second" id="std-show-input">0</div>
      </div>
      <ul id="std-top-symbol">
        <li value="17">%</li>
        <li value="18">√</li>
        <li value="19">
          <img
            src="@/assets/img/newapp/calculator/x_2.png"
            style="height: 18px"
          />
        </li>
        <li value="20">
          <img src="@/assets/img/newapp/calculator/1_x.png" />
        </li>
      </ul>
      <!--数字和符号-->
      <ul id="std-num-symbol">
        <li value="37">CE</li>
        <li value="38">C</li>
        <li value="39">Back</li>
        <li value="16">÷</li>
        <li class="number" value="7">7</li>
        <li class="number" value="8">8</li>
        <li class="number" value="9">9</li>
        <li value="15">×</li>
        <li class="number" value="4">4</li>
        <li class="number" value="5">5</li>
        <li class="number" value="6">6</li>
        <li value="14">-</li>
        <li class="number" value="1">1</li>
        <li class="number" value="2">2</li>
        <li class="number" value="3">3</li>
        <li value="13">+</li>
        <li value="11">±</li>
        <li class="number" value="0">0</li>
        <li value="10">.</li>
        <li value="12"><div class="equal">=</div></li>
      </ul>
      <!--侧边栏，选择计算器类型-->
      <ul class="type-bar" id="std-type-bar">
        <li class="active">标准</li>
        <li value="2">科学</li>
        <li value="3">程序员</li>
      </ul>
    </div>
    <!--科学型-->
    <div class="science-main" id="sci-main">
      <div class="toolbar">
        &nbsp;&nbsp;计算器
        <div class="actbtns">
          <div class="minbtn" @click="clickMinBtn">
            <img width="8" src="@/assets/img/appIcons/minimize.png" alt="" />
          </div>
          <div class="maxbtn" @click="clickMaxBtn">
            <img width="8" src="@/assets/img/appIcons/maximize.png" alt="" />
          </div>
          <div class="closebtn" @click="clickCloseBtn">
            <img width="8" src="@/assets/img/appIcons/close.png" alt="" />
          </div>
        </div>
      </div>
      <!--结果显示区域-->
      <div class="sci-result">
        <!--显示类型信息-->
        <div class="type" id="sci-show-bar">☰&nbsp;&nbsp;&nbsp;Science</div>
        <!--上一步的结果-->
        <div class="pre" id="sci-pre-step">&nbsp;</div>
        <!--第二个/运算结果-->
        <div class="second" id="sci-show-input">0</div>
      </div>
      <!--上面的3行运算符-->
      <ul id="sci-top-symbol">
        <li value="21">(</li>
        <li value="22">)</li>
        <li value="23">
          <img
            src="@/assets/img/newapp/calculator/x_y_sqrt.png"
            style="height: 18px; width: 22px"
          />
        </li>
        <li value="24">n!</li>
        <li value="25">Exp</li>
        <li value="19">
          <img
            src="@/assets/img/newapp/calculator/x_2.png"
            style="height: 18px"
          />
        </li>
        <li value="26">
          <img
            src="@/assets/img/newapp/calculator/x_y.png"
            style="height: 18px"
          />
        </li>
        <li value="27">sin</li>
        <li value="28">cos</li>
        <li value="29">tan</li>
        <li value="30">
          <img src="@/assets/img/newapp/calculator/10_x.png" />
        </li>
        <li value="31">log</li>
        <li value="32">sinh</li>
        <li value="33">cosh</li>
        <li value="34">tanh</li>
      </ul>
      <!--数字和符号-->
      <ul id="sci-num-symbol">
        <li value="35">π</li>
        <li value="37">CE</li>
        <li value="38">C</li>
        <li value="39">Back</li>
        <li value="16">÷</li>
        <li value="18">√</li>
        <li value="7" class="number">7</li>
        <li value="8" class="number">8</li>
        <li value="9" class="number">9</li>
        <li value="15">×</li>
        <li value="17">%</li>
        <li value="4" class="number">4</li>
        <li value="5" class="number">5</li>
        <li value="6" class="number">6</li>
        <li value="14">-</li>
        <li value="20">
          <img src="@/assets/img/newapp/calculator/1_x.png" />
        </li>
        <li value="1" class="number">1</li>
        <li value="2" class="number">2</li>
        <li value="3" class="number">3</li>
        <li value="13">+</li>
        <li value="36">↑</li>
        <li value="11">±</li>
        <li value="0" class="number">0</li>
        <li value="10">.</li>
        <li value="12"><div class="equal">=</div></li>
      </ul>
      <!--侧边栏，选择计算器类型-->
      <ul class="type-bar" id="sci-type-bar">
        <li value="1">标准</li>
        <li class="active">科学</li>
        <li value="3">程序员</li>
      </ul>
    </div>
    <!--程序员型-->
    <div class="programmer-main" id="pro-main">
      <div class="toolbar">
        &nbsp;&nbsp;计算器
        <div class="actbtns">
          <div class="minbtn" @click="clickMinBtn">
            <img width="8" src="@/assets/img/appIcons/minimize.png" alt="" />
          </div>
          <div class="maxbtn" @click="clickMaxBtn">
            <img width="8" src="@/assets/img/appIcons/maximize.png" alt="" />
          </div>
          <div class="closebtn" @click="clickCloseBtn">
            <img width="8" src="@/assets/img/appIcons/close.png" alt="" />
          </div>
        </div>
      </div>
      <!--结果显示区域-->
      <div class="pro-result">
        <!--显示类型信息-->
        <div class="type" id="pro-show-bar">☰&nbsp;&nbsp;&nbsp;Programmer</div>
        <!--上一步的结果-->
        <div class="pre" id="pro-pre-step">&nbsp;</div>
        <!--第二个/运算结果-->
        <div class="second" id="pro-show-input">0</div>
        <!--显示16、10、8、2进制的值-->
        <div id="pro-scales">
          <div scale="16">HEX&nbsp;&nbsp;&nbsp;<span>0</span></div>
          <div scale="10" class="scale-active">
            DEC&nbsp;&nbsp;&nbsp;<span>0</span>
          </div>
          <div scale="8">OCT&nbsp;&nbsp;&nbsp;<span>0</span></div>
          <div scale="2">BIN&nbsp;&nbsp;&nbsp;&nbsp;<span>0</span></div>
        </div>
      </div>
      <!--上面的一行十六进制数字，因为默认是10进制，所以这些按钮默认禁用-->
      <ul id="pro-top-symbol">
        <li class="disable-btn" value="40">A</li>
        <li class="disable-btn" value="41">B</li>
        <li class="disable-btn" value="42">C</li>
        <li class="disable-btn" value="43">D</li>
        <li class="disable-btn" value="44">E</li>
        <li class="disable-btn" value="45">F</li>
      </ul>
      <!--数字和符号-->
      <ul id="pro-num-symbol">
        <li value="36">↑</li>
        <li value="37">CE</li>
        <li value="38">C</li>
        <li value="39">Back</li>
        <li value="16">÷</li>
        <li value="46">And</li>
        <li value="7" class="number" bin-disable="1">7</li>
        <li value="8" class="number" oct-disable="1" bin-disable="1">8</li>
        <li value="9" class="number" oct-disable="1" bin-disable="1">9</li>
        <li value="15">×</li>
        <li value="47">Or</li>
        <li value="4" class="number" bin-disable="1">4</li>
        <li value="5" class="number" bin-disable="1">5</li>
        <li value="6" class="number" bin-disable="1">6</li>
        <li value="14">-</li>
        <li value="48">Not</li>
        <li value="1" class="number">1</li>
        <li value="2" class="number" bin-disable="1">2</li>
        <li value="3" class="number" bin-disable="1">3</li>
        <li value="13">+</li>
        <li value="21">(</li>
        <li value="22">)</li>
        <li value="0" class="number">0</li>
        <li value="10" class="disable-btn" id="pro-point">.</li>
        <li value="12"><div class="equal">=</div></li>
      </ul>
      <!--侧边栏，选择计算器类型-->
      <ul class="type-bar" id="pro-type-bar">
        <li value="1">标准</li>
        <li value="2">科学</li>
        <li class="active">程序员</li>
      </ul>
    </div>
  </div>
</template>

<script>
import "@/plugins/calculator.js";
export default {
  name: "CalculatorApp",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_window.scss";
.equal {
  background-color: #91dbe0;
}
.actbtns {
  height: 100%;
  align-items: center;
  display: flex;
}
.toolbar {
  background: white;
  display: flex;
  width: 100%;
  height: 26px;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.actbtns .minbtn,
.actbtns .maxbtn,
.actbtns .closebtn {
  transition: all 60ms ease-in-out;
  height: 100%;
  padding: 0 14px;
  position: relative;
  display: grid;
  place-items: center;
}
.minbtn:hover,
.maxbtn:hover {
  background-color: rgb(80, 80, 80);
}
.closebtn:hover {
  background-color: rgb(255, 65, 65);
}
.floatTab[win-size="normal"] {
  top: 10%;
  left: 20%;
  width: 60%;
  height: 80%;
}

.floatTab[data-size="full"] {
  border-radius: 0;
}

// win-max : 窗口是否最大化

.floatTab[win-max="false"] {
  top: calc(100% + 10px);
  -webkit-transform: scale(0.6);
  transform: scale(0.6);
  -webkit-transform-origin: bottom;
  transform-origin: bottom;
  opacity: 0;
  pointer-events: none;
}

// win-hide : 窗口是否隐藏

.floatTab[win-hide="true"] {
  top: 0;
  left: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
  opacity: 0;
  pointer-events: none;
}
* {
  font-family: "微软雅黑";
}
.standard-main,
.science-main,
.programmer-main {
  background-color: #f2f2f2;
  margin: 40px auto 0px;
  box-shadow: 0px 0px 15px #4d4d4d;
}

ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

li {
  float: left;
  text-align: center;
  cursor: pointer;
}

li img {
  height: 14px;
}

.title {
  height: 30px;
  line-height: 30px;
}

.result {
  height: 120px;
  text-align: right;
}

.second {
  font-size: 40px;
  font-weight: bold;
  padding-right: 10px;
}

.pre {
  color: #a7a7a7;
  padding-right: 10px;
}

/*计算器类型*/
.type {
  height: 20px;
  text-align: left;
  margin-left: 10px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
}

/*类型选择侧边栏*/
.type-bar {
  display: none;
  height: 90px;
  width: 100px;
  position: absolute;
  top: 110px;
  background-color: #e6e6e6;
}

.type-bar li {
  float: left;
  width: 100px;
  text-align: center;
  line-height: 30px;
}

.active {
  background-color: #cfcfcf;
}

/*数字加粗*/
.number {
  font-weight: bold;
}

/*共用部分结束*/

/*计算器标准版界面开始*/
.standard-main {
  width: 350px;
  height: 480px;
}

#std-top-symbol {
  border-top: 1px #a7a7a7 solid;
  height: 52px;
}

#std-num-symbol {
  background-color: #e6e6e6;
  height: 270px;
  font-size: 20px;
}

#std-top-symbol li,
#std-num-symbol li {
  line-height: 52px;
  width: 87.5px;
  border: #4d4d4d 0px solid;
}

/*标准界面结束*/

/*科学型界面开始*/
.science-main {
  display: none;
  width: 350px;
}

.sci-result {
  height: 120px;
  text-align: right;
}

#sci-top-symbol {
  border-top: 1px #a7a7a7 solid;
  height: 135px;
}

#sci-top-symbol li,
#sci-num-symbol li {
  line-height: 45px;
  width: 70px;
}

#sci-num-symbol {
  height: 235px;
  background-color: #e6e6e6;
}

/*科学型界面结束*/

/*程序员型界面开始*/
.programmer-main {
  display: none;
  width: 350px;
}

.pro-result {
  height: 220px;
  text-align: right;
}

#pro-top-symbol {
  border-top: 1px #a7a7a7 solid;
  height: 45px;
}

#pro-top-symbol li {
  line-height: 45px;
  width: 58px;
}

#pro-num-symbol li {
  line-height: 45px;
  width: 70px;
}

#pro-num-symbol {
  height: 235px;
  background-color: #e6e6e6;
}

/*四个进制*/
#pro-scales {
  margin-left: 20px;
}

#pro-scales div {
  text-align: left;
  margin-top: 5px;
  cursor: pointer;
}

/*当前使用的进制*/
.scale-active {
  color: cornflowerblue;
}

/*按键不可用*/
.disable-btn {
  color: #cacaca;
}

/*程序员型界面结束*/
</style>
