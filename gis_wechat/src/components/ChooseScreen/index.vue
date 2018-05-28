<template>
  <div class="content">
    <div ref="basicMapbox" style="height:100%;"></div>
    <div class='map-overlay-container'>
      <el-row>
        <el-col>
          <el-card :body-style="{ padding: '0px',width: '20vw', height: '30vh'}" >
            <div slot="header" class="clearfix">
              <span>{{currentScreen.title}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="showMoitor(currentScreen)">查看</el-button>
            </div>
            <div class="desc">{{currentScreen.description}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import * as userApi from '../../api/login'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
export default {
  data() {
    return {
      map: null,
      bigscreenList: [],
      currentScreen: {}
    }
  },
  methods: {
    init() {
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
      this.map.on('load', () => {
        this.playback(0)
      })
    },
    playback(index) {
      const _this = this
      this.map.flyTo(this.bigscreenList[index].camera)
      this.currentScreen = this.bigscreenList[index]
      this.map.once('moveend', function() {
        // Duration the slide is on screen after interaction
        window.setTimeout(function() {
          // Increment index
          index = (index + 1 === _this.bigscreenList.length) ? 0 : index + 1
          _this.playback(index)
        }, 3000) // After callback, show the location for 3 seconds.
      })
    },
    async showMoitor(item) {
      this.loading = true
      const obj = {
        view: 'BigScreen'
      }
      console.log(123)
      await this.$store.dispatch('FetchLayout', item)
      this.loading = false
      await this.$store.dispatch('SetScreenView', obj)
    }
  },
  mounted() {
    const _this = this
    userApi.getInfo().then(result => {
      if (result.data.gridLayouts.length === 0) {
        this.$message({
          message: '您没有权限，请向管理员领取权限！',
          type: 'warning'
        })
      } else {
        this.$socket.emit('bigscreentList', this.$store.state.user.gridLayouts)
        this.$socket.on('fetchGridLayoutList', result => {
          if (result.length !== 0) {
            result.forEach((item, index) => {
              const obj = {}
              obj.title = item.data.title
              obj.id = index
              obj.gridLayoutId = item.gridLayoutId
              obj.description = item.data.desc
              obj.camera = {}
              obj.camera.center = [item.data.lon, item.data.lat]
              obj.camera.bearing = Math.floor(Math.random() * 50)
              obj.camera.pitch = Math.floor(Math.random() * 50)
              obj.camera.zoom = 11.64
              _this.bigscreenList.push(obj)
            })
            _this.init()
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style>
@import url('../../../node_modules/mapbox-gl/dist/mapbox-gl.css');
</style>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display:none
}
.content{
  width: 100%;
  height: 100%;
  position: inherit;
  overflow-y: scroll;
}
.map-overlay-container{
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
  padding: 10px;
  z-index: 1;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.desc{
  padding: 20px;
}

</style>
