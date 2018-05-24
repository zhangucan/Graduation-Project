<template>
  <div class="custome-container" ref="mapcontainer">
    <div class='map-overlay-container'>
      <el-row>
        <div class="option-header">栅格图层</div>
        <div class="option-container">
          <el-select v-model="currentRaster" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in component.rasterList"
              :key="index"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-row>
      <el-row>
        <div class="option-header">矢量图层</div>
        <div class="option-container">
          <el-checkbox-group v-model="checkedVector">
            <el-checkbox style="margin-top:20px;" v-for="(item, index) in component.vectorList" :label="item._id" :key="index">{{item.title}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-row>
    </div>
    <div ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import * as bigscreenApi from '../../api/bigscreen'
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
      currentVector: '',
      map: null,
      vectorList: [],
      checkedVector: []
    }
  },
  watch: {
    currentRaster: {
      handler(val, oldVal) {
        if (oldVal !== '') {
          this.map.setLayoutProperty(`raster${oldVal}`, 'visibility', 'none')
        }
        if (val !== '') {
          this.map.setLayoutProperty(`raster${val}`, 'visibility', 'visible')
        }
      },
      deep: true
    },
    checkedVector(val, oldVal) {
      const _this = this
      oldVal.forEach(item => {
        _this.map.setLayoutProperty(`line${item}`, 'visibility', 'none')
        _this.map.setLayoutProperty(`point${item}`, 'visibility', 'none')
        _this.map.setLayoutProperty(`area${item}`, 'visibility', 'none')
      })
      val.forEach(item => {
        _this.map.setLayoutProperty(`line${item}`, 'visibility', 'visible')
        _this.map.setLayoutProperty(`point${item}`, 'visibility', 'visible')
        _this.map.setLayoutProperty(`area${item}`, 'visibility', 'visible')
      })
    }
  },
  methods: {
    init() {
      const _this = this
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmd1Y2FuIiwiYSI6ImNqaGhiMDNsOTA3bTQzNnJ4MWlvcnB3Z2sifQ.6TRDunIBxcLu9vuU4yuNhQ'
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [120.165, 20.74],
        zoom: 4
      })
      _this.map.on('load', function() {
        _this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
        if (_this.component.vectorList && _this.component.vectorList.length > 0) {
          _this.component.vectorList.forEach((item, index) => {
            _this.fetchVectorLayer(item._id)
          })
        }
        if (_this.component.rasterList && _this.component.rasterList.length > 0) {
          _this.component.rasterList.forEach((item, index) => {
            _this.fetchRasterLayer(item)
          })
        }
      })
    },
    fetchRasterLayer(item) {
      this.map.addLayer({
        'id': `raster${item.id}`,
        'source': {
          'type': 'raster',
          'tiles': [`${item.address}` + '/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
          'tileSize': 256
        },
        'type': 'raster'
      })
      this.map.setLayoutProperty(`raster${item.id}`, 'visibility', 'none')
    },
    async fetchVectorLayer(id) {
      const _this = this
      let data = await bigscreenApi.fetchVectors({ _id: id })
      data = data.vectors[0]
      _this.map.addSource(`${id}`, {
        type: 'geojson',
        data: data[data.featureType]
      })
      _this.map.addLayer({
        'id': `line${id}`,
        'type': 'line',
        'source': `${id}`,
        'paint': {
          'line-color': '#888',
          'line-width': 8
        },
        'filter': ['==', '$type', 'LineString']
      })
      _this.map.addLayer({
        'id': `area${id}`,
        'type': 'fill',
        'source': `${id}`,
        'paint': {
          'fill-color': '#888888',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      })
      _this.map.addLayer({
        'id': `point${id}`,
        'type': 'circle',
        'source': `${id}`,
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      })
      _this.map.setLayoutProperty(`area${id}`, 'visibility', 'none')
      _this.map.setLayoutProperty(`point${id}`, 'visibility', 'none')
      _this.map.setLayoutProperty(`line${id}`, 'visibility', 'none')
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
// .el-select{
//     position: absolute;
//     z-index: 1;
//     border: none;
//     background: rgba(255,255,255,0.2);
// }
.map-overlay-container{
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  padding: 10px;
  z-index: 1;
  width: 20%;
}
.el-checkbox+.el-checkbox {
    margin-left: 0px;
}
.option-header{
  font-weight: 700;
  font-size: 12px;
  padding: 5px;
  padding-left: 15px;
  background-color: #29244f;
  color: #fff;
  font-family: Helvetica;
  height: 34px;
  padding-top: 10px;
}
.option-container{
  background-color: #fff;
  min-height: 50px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
}
</style>
