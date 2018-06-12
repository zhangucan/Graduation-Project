<template>
  <div>
    <el-row class="option">
      <el-select v-model="leftValue" size="mini" style="marign-right:20px;" clearable placeholder="请选择">
        <el-option
          v-for="(item, index) in component.rasterLayers"
          :key="index"
          :label="item.displayTime"
          :value="item.address">
        </el-option>
      </el-select>
      <el-select v-model="rightValue"  size="mini" style="marign-left:20px;" clearable placeholder="请选择">
        <el-option
          v-for="(item, index) in component.rasterLayers"
          :key="index"
          :label="item.displayTime"
          :value="item.address">
        </el-option>
      </el-select>
      <el-button  icon="el-icon-arrow-left" style="marign:5px;padding:5px;" @click="setView" circle></el-button>
    </el-row>
    <div ref='before' class='map' :style="mapSize"></div>
    <div ref='after' class='map' :style="mapSize"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl' // mapbox-gl-compare
import Compare from 'mapbox-gl-compare'
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
  methods: {
    init() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmd1Y2FuIiwiYSI6ImNqZ2t4d2hybTFoczEzM3BxZHNiZmx5ODEifQ.cRxbqbN3MrW454UdMfoc6w'
      this.beforeMap = new mapboxgl.Map({
        container: this.$refs.before,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: this.map.camera.center,
        zoom: 11
      })
      this.afterMap = new mapboxgl.Map({
        container: this.$refs.after,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: this.map.camera.center,
        zoom: 11
      })
      new Compare(this.beforeMap, this.afterMap, {
        // mousemove: true
      })
    },
    setView() {
      const obj = {
        view: 'MapShow'
      }
      this.$store.dispatch('SetCurrentMapView', obj)
    }
  },
  watch: {
    leftValue(val) {
      const style = {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [`${val}/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}`],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles'
        }]
      }
      if (val !== '') {
        this.beforeMap.setStyle(style)
      }
    },
    rightValue(val) {
      const style = {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [`${val}/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}`],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles'
        }]
      }
      if (val !== '') {
        this.afterMap.setStyle(style)
      }
    }
  },
  data() {
    return {
      beforeMap: {},
      afterMap: {},
      leftValue: '',
      rightValue: '',
      map: this.$store.state.bigscreen.currentLayout
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style>
@import url('../../../node_modules/mapbox-gl-compare/dist/mapbox-gl-compare.css');
</style>
<style lang="scss" scoped>
.map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
.option {
  text-align: center;
  z-index: 1;
}
</style>
