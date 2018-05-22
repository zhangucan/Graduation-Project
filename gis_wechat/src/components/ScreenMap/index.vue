<template>
  <div class="custome-container" ref="mapcontainer">
    <el-select v-model="currentRaster" placeholder="请选择">
      <el-option
        v-for="(item, index) in component.rasterList"
        :key="index"
        :label="item.title"
        :value="item.address">
      </el-option>
    </el-select>
    <el-select style="left: 220px;" v-model="currentVector" placeholder="请选择">
      <el-option
        v-for="(item, index) in component.vectorList"
        :key="index"
        :label="item.title"
        :value="item._id">
      </el-option>
    </el-select>
    <div ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    component: Object,
    height: Number
  },
  computed: {
    mapSize() {
      const styleObj = {
        height: this.height + 'px'
      }
      return styleObj
    }
  },
  data() {
    return {
      currentRaster: '',
      currentVector: ''
    }
  },
  methods: {
    init() {
      console.log(this.component)
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmd1Y2FuIiwiYSI6ImNqaGhiMDNsOTA3bTQzNnJ4MWlvcnB3Z2sifQ.6TRDunIBxcLu9vuU4yuNhQ'
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [120.165, 20.74],
        zoom: 4
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.custome-container{
  height: 100%;
}
.el-select{
    position: absolute;
    z-index: 1;
    border: none;
    background: rgba(255,255,255,0.2);
}

</style>
