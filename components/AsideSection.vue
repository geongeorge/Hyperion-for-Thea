<template>
  <div class="aside-main">
      <el-container class="container">
        <!-- <el-header>
          <h4>Select Image</h4>
        </el-header> -->
        <el-main class="flex flex-col" style="display:flex!important">
          <!-- <div class="flex flex-col" style="height:100%!important;"> -->
            <div class="pb-2">
              <el-select v-model="value" placeholder="Select" 
            class="font-bold" size="large"
            @change="optionChanged()"
            >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
            </el-select>
            </div>

            <el-container class="flex-1 flex flex-col bg-gray-100 border rounded p-3 h-64 overflow-scroll">
              <vue-element-loading :active="loadingData" spinner="spinner" color="#409EFF"/>
              <div class="flex-0 w-full overflow-scroll h-auto"
              >
                <div 
                v-for="(val,key) in fileList"
                :key="key+val"
                class="w-full my-1 px-1 rounded hover:bg-blue-200 cursor-pointer"
                @click="selectName(val)"
                :class="{'bg-blue-200 font-bold': selectedName === val}"
                >{{val}}</div>
              </div>
            </el-container>
          <!-- </div> -->
          <!-- end flex  -->
        </el-main>
        <el-footer class="">
            <SideMenu></SideMenu>
        </el-footer>
      </el-container>
  </div>
</template>

<script>
import SideMenu from "./utils/SideMenu"

export default {
  components: {
    SideMenu
  },
 data:()=>({
   options: [
     {
       value:1,
       label:"അ",
     },
     {
       value:2,
       label:"ആ",
     },
     {
       value:3,
       label:"എ",
     },
     {
       value:4,
       label:"ഇ",
     }
   ],
   value: null,
   loadingData: false,
 }),
 methods: {
   optionChanged() {
     this.loadingData = true
     this.$store.commit("setSelected",this.value)
     let url = this.getUrl("images/"+this.value)
     this.$axios.get(url)
      .then((response) => {
        // handle success
        this.loadingData = false
        console.log(response.data);
        this.$store.commit("setFiles",response.data)
      })
   },
   setValue() {
     let res = this.options.find((el)=> {
        return el.value === this.$store.state.selected
      })
      if(res && res.value) {
        this.value = res.value;
      }
   },
   selectName(val) {
     console.log(val)
     this.$bus.$emit("selectedNew");
    //  this.$bus.$on('selectedNew', () => {})
     this.$store.commit("setSelectedFileName",val)
   }
 },
 mounted() {
   console.log(this.$store.state)
    this.setValue()
 },
 computed: {
   selectedVal() {
     return this.$store.state.selected
   },
   fileList() {
     return this.$store.state.files
   },
   selectedName() {
     return this.$store.state.selectedName
   }
 },
 watch: {
   selectedVal() {
     this.setValue()
   }
 }

}
</script>

<style>
.aside-main {
    @apply border-r;
}
</style>