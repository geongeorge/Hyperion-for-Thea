<template>
  <div>
      <div class="bg-gray-300 w-full rounded-lg min-h-full">
          <div v-if="imageUrl" class="img-magnifier-container">
              <v-zoomer style="width: 100%; height: auto;" :maxScale="8" :ref="'imager'+number">
                <img :src="imageUrl" alt="" class="img-viewer">
              </v-zoomer>
              <div class="text-center">
                <el-button-group>
                    <el-button size="small" type="primary" icon="el-icon-zoom-out"
                    @click="$refs['imager'+number.toString()].zoomOut()"
                    ></el-button>
                    <el-button size="small" type="primary" icon="el-icon-refresh-left"
                        @click="$refs['imager'+number.toString()].reset()"
                    ></el-button>
                    <el-button size="small" type="primary" icon="el-icon-zoom-in"
                        @click="$refs['imager'+number.toString()].zoomIn()"
                    ></el-button>
                </el-button-group>
                </div>
          </div>
          <div v-else class="h-64 text-center flex flex-col justify-center">
              <div class="flex-0 text-gray-500">No Image selected</div> 
          </div>
      </div>
  </div>
</template>

<script>

export default {
    components:{

    },
    props: {
        imageUrl: {required: true},
        number: {required: true, default:1}
    },  
}
</script>

<style>

</style>