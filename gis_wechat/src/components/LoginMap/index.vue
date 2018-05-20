<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
const d3 = require('d3')
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [120.165, 20.74],
        zoom: 4
      })
      map.on('load', function() {
        d3.json('http://127.0.0.1:9528/static/hike.geojson', function(err, data) {
          console.log(map)
          if (err) throw err
          const coordinates = data.features[0].geometry.coordinates
          data.features[0].geometry.coordinates = [coordinates[0]]
          map.addSource('trace', { type: 'geojson', data: data })
          map.addLayer({
            'id': 'trace',
            'type': 'line',
            'source': 'trace',
            'paint': {
              'line-color': 'yellow',
              'line-opacity': 0.75,
              'line-width': 5
            }
          })
          map.jumpTo({ 'center': coordinates[0], 'zoom': 14 })
          map.setPitch(30)
          let i = 0
          const timer = window.setInterval(function() {
            if (i < coordinates.length) {
              data.features[0].geometry.coordinates.push(coordinates[i])
              map.getSource('trace').setData(data)
              map.panTo(coordinates[i])
              i++
            } else {
              window.clearInterval(timer)
            }
          }, 10)
        })
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
  }
}
</script>
<style>
@import url('../../styles/mapbox-gl.css');
</style>