<template>
  <div class="">
      <loading :active.sync="isFullLoading" 
        color="#409EFF"
        :is-full-page="true"></loading>
       <div class="mb-1">
           <el-row :gutter="20">
               <el-col :span="16">
                <el-button type="text" @click="selectX(1)" icon="el-icon-check">Select All</el-button>
                &nbsp;
                <el-button type="text" @click="selectX(0)" icon="el-icon-close">Deselect All</el-button>
               </el-col>
               <el-col :span="8">
                   <el-button 
                   @click="confirmSubmit()"
                   type="success" class="w-full px-2" size="large">
                    Save 
                    <i  class="el-icon-upload2"></i>
                    </el-button>
               </el-col>
           </el-row>
           <el-row>
               <div class="block">
                <el-slider
                v-model="widthCol"
                :min="1"
                :max="24"
                @input="resizing=true"
                @change="resized()"
                :step="1">
                </el-slider>
            </div>
           </el-row>
       </div>
       <el-row>
           <el-col :span="widthCol">
                <div class="outer-canv">
                    <img :src="imageUrl" ref="canvImg">
                    <div class="inner-canv text-white"
                    v-if="!resizing"
                    >
                        <div v-for="(val,key) in contours" :key="key"
                        class="canv-box hover:border-green-500 hover:bg-green-500"
                        :style="styleObj(val)"
                        :class="[val.selected? 'selected':'deselected' ]"
                        @click="val.selected = !val.selected"
                        >
                        </div>
                    </div>
                </div>
            </el-col>
      </el-row>
      <div>
          {{selectedcontours.length}} / {{contours.length}} selections made
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
        widthCol:12,
        resizing: false,
        contours: [],
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
        },
        selectX(x){
            if(x==1){
                this.contours.forEach((el)=>{
                    el.selected=true
                })
            }else if(x==0){
                this.contours.forEach((el)=>{
                    el.selected=false
                })
            }
        },
        async resized() {
            await this.loadImage(this.imageUrl)
            this.resizing = false
        },
        confirmSubmit() {
            this.$confirm('This will save the dataset according to the selections made. Are you sure?', 'Warning', {
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
            }).then(() => {
                this.submitData()
            }).catch(() => {        
            });
        },
        submitData() {
            // pass 4 things
                // selected folder name - selected
                // selected image name
                // tmp image name
                // contours [selected only]
            let data= {
                selected: this.$store.state.selected,
                selectedName: this.$store.state.selectedName,
                tmpImage: this.src.image,
                contours: this.selectedcontours
            }

            let apiUrl = this.getUrl('save')

            console.log("sending",data)

            this.$axios.post(apiUrl,data)
            .then((response)=>{
                this.$message({
                    message: 'Saved!',
                    type: 'Success! Select a new image from the sidebar!'
                });
                this.$bus.$emit("savedOne");
            })
            .catch((error) => {
                this.$message.error('Oops, there was an error');
                console.log(error)
            })
            // console.log(data)
        }
    },
    computed: {
        imageUrl() {
            if(!this.src.image) return ""
            return this.getUrl('temp/'+this.src.image)
        },
        selectedcontours() {
            return this.contours.filter(el=> el.selected)
        }
    },
    async mounted() {
        this.src.contours.forEach(element => {
            this.contours.push({
                l: element[0],
                t: element[1],
                w: element[2],
                h: element[3],
                selected: true
            })
        })
            
       await this.loadImage(this.imageUrl)
       await this.resized()

        // Listen for resize event
       window.addEventListener('resize',this.resized)
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