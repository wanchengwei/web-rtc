<template>
  的观点
</template>
  
<script>
import { reactive, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue';
  
export default defineComponent({
  name: 'df-df',
  components: {},
  props: {},
  setup(props, context) {
    const internalInstance = getCurrentInstance(); 
    const self = internalInstance.proxy
    const state = reactive({})
    onMounted(() => {})
    return {
      ...toRefs(state)
    }
  }
})
</script>
  
<style lang="scss" scoped>
  
</style>