<template>
  <transition name="component-fade" mode="out-in">
    <component v-bind:is="view"></component>
  </transition>
</template>
<script>
import BigScreen from '../../components/BigScreen/index'
import ChooseScreen from '../../components/ChooseScreen/index'
export default {
  components: {
    BigScreen,
    ChooseScreen
  },
  computed: {
    view() {
      return this.$store.state.bigscreen.currentView
    }
  }
}
</script>
<style lang="scss" scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to{
  opacity: 0;
}
</style>
