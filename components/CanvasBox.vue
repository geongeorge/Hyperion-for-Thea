<template>
  <div class="">
      <loading :active.sync="isFullLoading" 
        color="#409EFF"
        :is-full-page="true"></loading>
        {{widthRatio}} - {{heightRatio}}
      <div class="outer-canv">
          <img :src="imageUrl" ref="canvImg">
          <div class="inner-canv text-white">
             <div v-for="(val,key) in countours" :key="key"
             class="canv-box hover:border-green-500 hover:bg-green-500"
             :style="styleObj(val)"
             :class="[val.selected? 'selected':'deselected' ]"
             @click="val.selected = !val.selected"
             >
             </div>
          </div>
      </div>
      <div class="text-xs">
        {{
         countours
        }}
        </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
export default {
    components:{
        Loading,
    },
    props:{
        src:{required:true}
    },
    data:()=>({
        countours: [],
        img: null,
        widthRatio: 1,
        heightRatio: 1,
        isFullLoading: false,
    }),
    methods:{
        reshapeVal(val) {
            // reshape value with respect to ratio 
            return {
                l: val.l/this.widthRatio,
                t: val.t/this.heightRatio,
                w: val.w/this.widthRatio,
                h: val.h/this.heightRatio,
            }
        },
        styleObj(inVal) {
            const val = this.reshapeVal(inVal)
            const retVal = {
                'left': val.l+"px",
                'top': val.t+"px",
                'width': val.w+"px",
                'height': val.h+"px"
            }
            // console.log(retVal)
            return retVal
        },
        loadImage(src){
            return new Promise((resolve,reject)=>{
                    var img = new Image;
                    img.onload = () => {
                        let placedImage = this.$refs.canvImg
                        this.widthRatio = img.width/placedImage.width
                        this.heightRatio = img.height/placedImage.height
                        resolve(src)
                    }
                    img.src = src;
                    this.img = img;
            })
        }
    },
    computed: {
        imageUrl() {
            if(!this.src.image) return ""
            return this.getUrl('temp/'+this.src.image)
        },
    },
    async mounted() {
        this.src.countours.forEach(element => {
            this.countours.push({
                l: element[0],
                t: element[1],
                w: element[2],
                h: element[3],
                selected: true
            })
        })
            
       await this.loadImage(this.imageUrl)
    },
}
</script>
<style>
.outer-canv {
    @apply relative;
}
.outer-canv img {
    @apply z-0;
}
.outer-canv .inner-canv {
    @apply absolute top-0 left-0 z-10;
    width: 100%;
    height: 100%;
}
.inner-canv .canv-box{
    @apply border border-white absolute opacity-50 cursor-pointer;
}
.inner-canv .selected {
    @apply bg-green-400;
}
.inner-canv .deselected {
    @apply bg-transparent;
}
</style>