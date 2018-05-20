<template>
  <el-row>
    <el-col :span="5" class="margin15" v-for="(item, index) in mapList" :key="index" >
      <el-card :body-style="{ padding: '0px' }">
        <img src="../../../static/bigscreen/baiguihu.png" class="image">
        <div style="padding: 14px;">
          <span>{{item.title}}</span>
          <div class="bottom clearfix">
            <time class="time">2018-05-05 20:20</time>
            <el-button type="text" class="button" @click="setView(item._id)">查看</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="5" class="margin15" style="text-align: center; cursor:pointer">
      <el-card :body-style="{ padding: '0px' }">
        <i class="el-icon-plus add-srceen" @click="addMap()"></i>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  computed: {
    mapList() {
      return this.$store.state.map.mapLsit
    }
  },
  methods: {
    async setView(id) {
      this.loading = true
      const obj = {
        view: 'AddMap'
      }
      await this.$store.dispatch('FetchMap', { _id: id })
      this.loading = false
      await this.$store.dispatch('SetMapView', obj)
    },
    addMap() {
      const obj = {
        view: 'AddMap',
        title: '地图'
      }
      this.$store.dispatch('SetMapView', obj).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    initMapView() {

    }
  },
  beforeCreate() {
    this.loading = true
    this.$store.dispatch('FetchAllMap').then(() => {
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  }
}
</script>
<style lang="scss" scoped>
.grid-demo {
  background: #d3dce6;
  border-radius: 4px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.add-srceen {
  font-size: 255px;
  color: #ccc;
}
.add-srceen:hover {
  color: #989898 
}
.margin15{
  margin: 15px;
}
</style>

