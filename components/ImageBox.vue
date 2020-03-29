<template>
  <div>
      <vue-element-loading :active="loading" spinner="spinner" color="#409EFF"/>
      <ImageViewer :imageUrl="imageUrl" :number="number"></ImageViewer>
  </div>
</template>

<script>
import ImageViewer from './utils/ImageViewer'
export default {
    props:{
        number: {required: true, default:1},
        src: {default:""},
        loading: {default: false}
    },
    components:{
        ImageViewer
    },
    computed: {
        imageUrl: function(){
            // if source set use that
            if(this.src!="") return this.src

            if(this.$store.state.selected != 0 && this.$store.state.selectedName != "") {
                return this.getUrl("show/"+this.$store.state.selected+"/"+this.$store.state.selectedName)
            } 
            return ""
        }
    }
}
</script>

<style>

</style>