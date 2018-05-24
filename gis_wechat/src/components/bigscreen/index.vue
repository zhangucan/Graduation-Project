<template>
  <div class="container" >
    <div class="header"></div>
    <div class="content" ref="screenContainer">
      <grid-layout
        :layout='layout'
        :col-num='12'
        :row-height='40'
        :is-draggable='false'
        :is-resizable='false'
        :is-mirrored='false'
        :vertical-compact='true'
        :margin='[10,10,10,10]'
        :use-css-transforms='true'
      >
        <grid-item class="grid-border" v-for='(item, index) in layout'
          :x='item.x'
          :y='item.y'
          :w='item.w'
          :h='item.h'
          :i='item.i'
          :key='index'>
          <component :width="componentWigth(item.w)" :height="componentHeight(item.h)" :is="showView(item.gridType)" :component="item.component"></component>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import ScreenMap from '../ScreenMap'
import ScreenChart from '../ScreenChart'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem
export default {
  components: {
    GridLayout,
    GridItem,
    ScreenMap,
    ScreenChart
  },
  methods: {
    showView(type) {
      if (type === 'map') {
        return 'screenMap'
      } else {
        return 'screenChart'
      }
    },
    componentHeight(h) {
      return h * 50 - 40
    },
    componentWigth(w) {
      return w / 12
    }
  },
  computed: {
    layout() {
      return [...this.$store.state.bigscreen.gridItems]
    }
  },
  beforeCreate() {
  }
}
</script>
  
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 10%;
  background-image: url(../../../static/monitor/header.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content{
  width: 100%;
  height: 100%;
  position: inherit;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display:none
}

.container{
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: url(../../../static/monitor/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.grid-border{
  border-radius: 0px;
  border-style: solid;
  border-width: 12px 12px 12px;
  border-image-source: url(../../../static/monitor/border.png);
  border-image-slice: 20 20 20 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
}
.top-30{
  top: -30px;
}
.right10{
  right: 10px;
}
.margin-bottom50{
  margin-bottom: 50px;
}
</style>
