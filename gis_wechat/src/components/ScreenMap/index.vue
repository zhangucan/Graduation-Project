<template>
  <transition name="component-fade" mode="out-in">
    <component v-bind:is="view" :component="component" :height="height"></component>
  </transition>
</template>
<script>
import CompareMap from '../CompareMap'
import MapShow from '../MapShow'
export default {
  props: {
    component: Object,
    height: Number
  },
  components: {
    CompareMap,
    MapShow
  },
  computed: {
    view() {
      return this.$store.state.bigscreen.currentMapView
    }
  }
}
</script>
<style lang="scss" scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>

