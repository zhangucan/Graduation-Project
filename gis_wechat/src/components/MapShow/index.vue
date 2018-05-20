<template>
  <div style='height:100%;width:100%;text-align:left;'>
    <div ref='basicMapbox' :style='mapSize'></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    },
    mapUrl: {
      type: String
    },
    lon: {
      type: String
    },
    lat: {
      type: String
    },
    vectorList: {
      type: Array
    },
    chooseList: {
      type: Array
    }
  },
  data() {
    return {
      map: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() { //
      const _this = this
      const url = 'http://127.0.0.1:8090/iserver/services/map-baiguihu/rest/maps/baiguihu'
      const lon = this.lon || 113.24
      const lat = this.lat || 33.73
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
      _this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: {
          'version': 8,
          'sources': {
            'raster-tiles': {
              'type': 'raster',
              'tiles': [url + '/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
              'tileSize': 256
            }
          },
          'layers': [{
            'id': 'simple-tiles',
            'type': 'raster',
            'source': 'raster-tiles'
          }]
        },
        center: [lon, lat],
        maxZoom: 18,
        zoom: 16
      })
      _this.map.on('load', function() {
        _this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
        if (_this.vectorList && _this.vectorList.length > 0) {
          console.log(_this.vectorList)
          _this.vectorList.forEach((item, index) => {
            _this.map.addSource(`customeFeature${item._id}`, {
              type: 'geojson',
              data: item.vectorFeatures
            })
          })
        }
      })
    },
    changeStyle(url) {
      const _this = this
      _this.map.setStyle({
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [url + '/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles'
        }]
      })
      if (_this.vectorList && _this.vectorList.length > 0) {
        _this.vectorList.forEach((item, index) => {
          _this.map.addSource(`customeFeature${item._id}`, {
            type: 'geojson',
            data: item.vectorFeatures
          })
        })
      }
    },
    removeVector(id) {
      const _this = this
      if (_this.map.getLayer(`line${id}`)) {
        _this.map.removeLayer(`line${id}`)
      }
      if (_this.map.getLayer(`area${id}`)) {
        _this.map.removeLayer(`area${id}`)
      }
      if (_this.map.getLayer(`point${id}`)) {
        _this.map.removeLayer(`point${id}`)
      }
    },
    addGeoJson(id) {
      const _this = this
      _this.map.addLayer({
        'id': `line${id}`,
        'type': 'line',
        'source': `customeFeature${id}`,
        'paint': {
          'line-color': '#888',
          'line-width': 8
        },
        'filter': ['==', '$type', 'LineString']
      })
      _this.map.addLayer({
        'id': `area${id}`,
        'type': 'fill',
        'source': `customeFeature${id}`,
        'paint': {
          'fill-color': '#888888',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      })
      _this.map.addLayer({
        'id': `point${id}`,
        'type': 'circle',
        'source': `customeFeature${id}`,
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      })
    }
  },
  computed: {
    mapSize() {
      const styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  },
  watch: {
    mapUrl(val) {
      this.changeStyle(val)
    },
    chooseList(val, oldVal) {
      const _this = this
      if (oldVal && oldVal.length > 0) {
        oldVal.forEach((item, index) => {
          _this.removeVector(item._id)
        })
      }
      if (val && val.length > 0) {
        val.forEach((item, index) => {
          _this.addGeoJson(item._id)
        })
      }
    }
  }
}
</script>
<style>
@import url('../../styles/mapbox-gl.css');
</style>