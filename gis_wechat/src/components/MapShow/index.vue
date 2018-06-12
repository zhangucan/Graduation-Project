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
              <el-radio  v-for="(item, index) in component.rasterLayers" :key="index" :label="item._id">{{item.displayTime}}</el-radio>
            </el-radio-group>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <div style="margin-left:20px;">矢量图层</div>
            </template>
            <el-checkbox-group v-model="checkedVector" style="padding: 5px 15px;">
              <el-checkbox v-for="item in component.vectorLayers" :label="item._id" :key="item._id">
                {{item.type}}{{item.displayTime}}
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
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import mapboxgl from 'mapbox-gl'
// import * as bigscreenApi from '../../api/bigscreen'
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
      console.log(val)
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
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmd1Y2FuIiwiYSI6ImNqZ2t4d2hybTFoczEzM3BxZHNiZmx5ODEifQ.cRxbqbN3MrW454UdMfoc6w'
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        attributionControl: false,
        style: 'mapbox://styles/mapbox/satellite-v9',
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
        _this.map.addControl(new mapboxgl.FullscreenControl())
        if (_this.component.rasterLayers && _this.component.rasterLayers.length > 0) {
          _this.notifyMessage(`当前影像数量${_this.component.rasterLayers.length}`)
          _this.component.rasterLayers.forEach((item, index) => {
            _this.fetchRasterLayer(item)
          })
        }
        if (_this.component.vectorLayers && _this.component.vectorLayers.length > 0) {
          _this.notifyMessage(`当前矢量图层数量${_this.component.vectorLayers.length}`, 100)
          _this.component.vectorLayers.forEach((item, index) => {
            _this.fetchVectorLayer(item)
          })
        }
        _this.map.addLayer({
          'id': 'maine',
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [[[-67.13734351262877, 45.137451890638886],
                  [-66.96466, 44.8097],
                  [-68.03252, 44.3252],
                  [-69.06, 43.98],
                  [-70.11617, 43.68405],
                  [-70.64573401557249, 43.090083319667144],
                  [-70.75102474636725, 43.08003225358635],
                  [-70.79761105007827, 43.21973948828747],
                  [-70.98176001655037, 43.36789581966826],
                  [-70.94416541205806, 43.46633942318431],
                  [-71.08482, 45.3052400000002],
                  [-70.6600225491012, 45.46022288673396],
                  [-70.30495378282376, 45.914794623389355],
                  [-70.00014034695016, 46.69317088478567],
                  [-69.23708614772835, 47.44777598732787],
                  [-68.90478084987546, 47.184794623394396],
                  [-68.23430497910454, 47.35462921812177],
                  [-67.79035274928509, 47.066248887716995],
                  [-67.79141211614706, 45.702585354182816],
                  [-67.13734351262877, 45.137451890638886]]]
              }
            }
          },
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
          }
        })
      })
    },
    notifyMessage(msg, offset) {
      this.$notify.info({
        title: '提示',
        message: msg,
        offset: offset
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
        'id': `raster${item._id}`,
        'source': {
          'type': 'raster',
          'tiles': [`${item.address}` + '/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
          'tileSize': 256
        },
        'type': 'raster'
      })
      this.map.setLayoutProperty(`raster${item._id}`, 'visibility', 'none')
    },
    fetchVectorLayer(item) {
      this.map.addSource(`vector${item._id}`, {
        type: 'geojson',
        data: item.featurecollection
      })
      this.map.addLayer({
        'id': `line${item._id}`,
        'type': 'line',
        'source': `vector${item._id}`,
        'paint': {
          'line-color': '#B42222',
          'line-width': 1
        },
        'filter': ['==', '$type', 'LineString']
      })
      this.map.addLayer({
        'id': `area${item._id}`,
        'type': 'fill',
        'source': `vector${item._id}`,
        'paint': {
          'fill-color': '#B42222',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      })
      this.map.addLayer({
        'id': `point${item._id}`,
        'type': 'circle',
        'source': `vector${item._id}`,
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      })
      // this.map.setLayoutProperty(`area${item._id}`, 'visibility', 'none')
      // this.map.setLayoutProperty(`point${item._id}`, 'visibility', 'none')
      // this.map.setLayoutProperty(`line${item._id}`, 'visibility', 'none')
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
  padding: 25px;
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
