<template>
  <div class="custome-container" ref="mapcontainer">
    <el-row>
      <div class='map-overlay-container'>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <div style="margin-left:20px;">影像图层</div>
            </template>
            <el-radio-group style="padding: 10px;" v-model="currentRaster">
              <el-radio  v-for="(item, index) in component.rasterList" :key="index" :label="item.id">{{item.title}}</el-radio>
            </el-radio-group>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <div style="margin-left:20px;">矢量图层</div>
            </template>
            <el-checkbox-group v-model="checkedVector" style="padding: 5px 15px;">
              <el-checkbox v-for="item in component.vectorList" :label="item.id" :key="item.id">
                {{item.title}}
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <div style="margin-left:20px;">影像对比</div>
            </template>
            <el-button style="margin-left:22%;" @click="setView" plain>
              两期影像对比
            </el-button>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div ref="basicMapbox" id="basicMapbox" :style="mapSize"></div>
    </el-row>
  </div>
</template>
<script>
import CompareMap from '../CompareMap'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import mapboxgl from 'mapbox-gl'
// import * as bigscreenApi from '../../api/bigscreen'
export default {
  props: {
    component: Object,
    height: Number
  },
  components: {
    CompareMap
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
      checkedVector: [],
      compareMap: true,
      temp1: '',
      temp2: '',
      mapInfo: this.$store.state.bigscreen.currentLayout
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
      const language = new MapboxLanguage({
        defaultLanguage: 'zh'
      })
      this.map.addControl(language)
      _this.map.on('load', function() {
        _this.map.flyTo(_this.mapInfo.camera)
        _this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
        if (_this.component.rasterList && _this.component.rasterList.length > 0) {
          _this.component.rasterList.forEach((item, index) => {
            _this.fetchRasterLayer(item)
          })
        }
        if (_this.component.vectorList && _this.component.vectorList.length > 0) {
          _this.component.vectorList.forEach((item, index) => {
            _this.fetchVectorLayer(item)
          })
        }
      })
    },
    setView() {
      const obj = {
        view: 'CompareMap'
      }
      this.$store.dispatch('SetCurrentMapView', obj)
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
    fetchVectorLayer(item) {
      this.map.addSource(`vector${item.id}`, {
        type: 'geojson',
        data: item.vectorFeatures
      })
      this.map.addLayer({
        'id': `line${item.id}`,
        'type': 'line',
        'source': `vector${item.id}`,
        'paint': {
          'line-color': '#B42222',
          'line-width': 1
        },
        'filter': ['==', '$type', 'LineString']
      })
      this.map.addLayer({
        'id': `area${item.id}`,
        'type': 'fill',
        'source': `vector${item.id}`,
        'paint': {
          'fill-color': '#B42222',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      })
      this.map.addLayer({
        'id': `point${item.id}`,
        'type': 'circle',
        'source': `vector${item.id}`,
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      })
      this.map.setLayoutProperty(`area${item.id}`, 'visibility', 'none')
      this.map.setLayoutProperty(`point${item.id}`, 'visibility', 'none')
      this.map.setLayoutProperty(`line${item.id}`, 'visibility', 'none')
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
.el-radio {
  line-height: 2;
  margin-left: 10px;
}
.el-radio+.el-radio {
  margin-left: 10px;
}
</style>
