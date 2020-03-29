<template>
  <div class="border shadow my-3 p-2 rounded" v-if="editable">
    <vue-element-loading :active="!editable" spinner="spinner" color="#409EFF"/>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="block">
          <span class="demonstration">Threshold Value</span>
          <el-slider v-model="threshold" show-input :min="0" :max="255"
          @change="changedVal"
          ></el-slider>
        </div>
      </el-col>
      <el-col :span="12" class>
        <div>Character sizes:</div>
        <div class="text-gray-500 text-xs">
          Min Width:
          <el-input-number
            controls-position="right"
            size="small"
            label="Minimum Width"
            v-model="minWidth"
            @change="changedVal"
          ></el-input-number>&nbsp; Min Height:
          <el-input-number
            controls-position="right"
            size="small"
            label="Minimum Height"
            v-model="minHeight"
            @change="changedVal"
          ></el-input-number>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data: ()=>({
        threshold:150,
        minHeight: 60,
        minWidth: 60,
        ebounceTimer : null
    }),
    methods:{
    emitChange() {
        const val = {
           threshold: this.threshold,
           minHeight: this.minHeight,
           minWidth: this.minWidth
        }
        this.$emit("change",val)
    },
    changedVal(){
        // console.log("hello")
        let delay = 1000 //update every 2 sec

        clearTimeout(this.debounceTimer) 
        this.debounceTimer = setTimeout(() => {
            console.log("emit change")
            this.emitChange()
        }, delay) 
    } 
    },
    computed: {
      editable(){
        if(this.$store.state.selected != 0 && this.$store.state.selectedName != "") {
          return true
        }
        return false
      },
      selectedName() {
        return this.$store.state.selectedName
      }
    },
    watch:{
      selectedName(){
        this.emitChange()
      }
    }
    ,mounted(){
      this.emitChange()
    }
}
</script>

<style>
</style>