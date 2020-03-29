<template>
  <div>
    <SettingsBox @change="changedSettings">
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
</template>

<script>
import SettingsBox from '~/components/SettingsBox'
import AsideSection from '~/components/AsideSection'
import ImageBox from '~/components/ImageBox'

export default {
  components: {
    AsideSection,
    ImageBox,
    SettingsBox
  },
  data:()=>({
    loading: false,
    thresholdSrc:"",
    widthVal: 12
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
      this.loading = true
      console.log(e)
      const urlStr = "threshold/"+
                    this.$store.state.selected+
                    "/"+
                    this.$store.state.selectedName+
                    "/"+
                    e.threshold+
                    "/"+
                    e.minWidth+
                    "/"+
                    e.minHeight

      const url = this.getUrl(urlStr)
      const imageUrl = await this.loadImage(url)
      this.thresholdSrc = imageUrl
      this.loading = false

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
