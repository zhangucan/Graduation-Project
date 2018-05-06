<template>
  <grid-layout class="top-30 right10"
    :layout='layout'
    :col-num='12'
    :row-height='30'
    :is-draggable='true'
    :is-resizable='true'
    :is-mirrored='false'
    :vertical-compact='true'
    :margin='[30,30,30,30]'
    :use-css-transforms='true'
>
    <grid-item class="grid-border" v-for='(item, index) in layout'
      :x='item.x'
      :y='item.y'
      :w='item.w'
      :h='item.h'
      :i='item.i'
      :key='index'>
    </grid-item>
</grid-layout>
</template>
<script>
import testLine from '../components/charts/line'
// import io from 'socket.io-client'
// const testLayout = [
//   { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0' },
//   { 'x': 2, 'y': 0, 'w': 2, 'h': 4, 'i': '1' },
//   { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2' },
//   { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
//   { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' },
//   { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5' },
//   { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6' },
//   { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7' },
//   { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8' },
//   { 'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9' },
//   { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10' },
//   { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11' },
//   { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12' },
//   { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13' },
//   { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14' },
//   { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15' },
//   { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16' },
//   { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17' },
//   { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18' },
//   { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19' }
// ]
export default {
  layout: 'bigScreen',
  components: {
    testLine
  },
  data() {
    return {
    }
  },
  computed: {
    layout() {
      return [...this.$store.state.layout]
    }
  },
  beforeCreate() {
    // const socket = io('http://127.0.0.1:1337')
    // socket.on('news', data => {
    //   console.log(data)
    //   socket.emit('my other event', { my: 'data' })
    // })
    this.$store.dispatch('fetchLayout')
  }
}
</script>
<style lang='scss' scoped>
  .grid-border{
    border-radius: 0px;
    border-style: solid;
    border-width: 12px 12px 12px;
    border-image-source: url(../assets/img/border.png);
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
</style>
