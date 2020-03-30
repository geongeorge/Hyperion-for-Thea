<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isFullLoading" 
        color="#409EFF"
        :is-full-page="true"></loading>
    </div>
    <div v-if="!responseData">
      <SettingsBox @change="changedSettings"
      @save="dataSaved()"
      >
      </SettingsBox>
      <div>
        <el-slider v-model="widthVal"  :min="0" :max="24"
            ></el-slider>
      </div>
      <el-row :gutter="20">
        <el-col :span="widthVal">
          <ImageBox :number='1'></ImageBox>
        </el-col>
        <el-col :span="24-widthVal">
          <ImageBox :number='2' :src="thresholdSrc" :loading="loading"></ImageBox>
        </el-col>
      </el-row>
    </div>
    <div v-else>
        <el-button type="text" @click="responseData=null">Back</el-button>
        <div>
          <canvasBox :src="responseData"></canvasBox>
        </div>
    </div>
  </div>
</template>

<script>
import SettingsBox from '~/components/SettingsBox'
import AsideSection from '~/components/AsideSection'
import ImageBox from '~/components/ImageBox'
import CanvasBox from '~/components/CanvasBox'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';


export default {
  components: {
    AsideSection,
    ImageBox,
    SettingsBox,
    Loading,
    CanvasBox
  },
  data:()=>({
    loading: false,
    isFullLoading: false,
    thresholdSrc:"",
    widthVal: 12,
    settings: null,
    responseData : null
  }),
  methods: {
    loadImage(src){
      return new Promise((resolve,reject)=>{
        var img = new Image;
        img.onload = function() {
            resolve(src)
        }
        img.src = src;

      })
    },
    async changedSettings(e) {
      this.settings = e
      this.loading = true
      console.log(e)
      const urlStr = this.urlValue

      const url = this.getUrl(urlStr)
      const imageUrl = await this.loadImage(url)
      this.thresholdSrc = imageUrl
      this.loading = false
    },
    async dataSaved() {
      this.isFullLoading = true
      const urlStr = this.getUrl(this.urlValue+"/data")
      this.$axios.get(urlStr).then((response) => {
        // handle success
        this.responseData = response.data
        console.log(response.data);
        this.isFullLoading = false
      })
    }
  },
  computed:{
    urlValue() {
      if(this.settings.threshold && this.settings.minWidth && this.settings.minHeight) {
        return "threshold/"+
                    this.$store.state.selected+
                    "/"+
                    this.$store.state.selectedName+
                    "/"+
                    this.settings.threshold+
                    "/"+
                    this.settings.minWidth+
                    "/"+
                    this.settings.minHeight
      }
      return ""
      
    }
  }
}
</script>

<style>
.top-title {
   margin-top: 2em;
}
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
