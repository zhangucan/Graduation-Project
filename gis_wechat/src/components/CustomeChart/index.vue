<template>
  <transition name="component-fade" mode="out-in">
    <component v-bind:is="view"></component>
  </transition>
</template>
<script>
import ChooseChart from '../ChooseChart'
import EditChart from '../EditChart'
export default {
  components: {
    ChooseChart,
    EditChart
  },
  data() {
    return {
      view: ''
    }
  },
  mounted() {
    this.$store.state.bigscreen.gridItem.component.name === '' ? this.view = 'ChooseChart' : this.view = 'EditChart'
    this.$root.Bus.$on('changeChartView', content => {
      this.view = content
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
