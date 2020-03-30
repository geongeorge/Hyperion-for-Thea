<template>
  <div>
      <h2 class="text-3xl">Settings</h2>
    
    <div class="mt-8">
        <span class="demo-input-label">API Url:</span>
        <el-input 
        @change="onChange"
        placeholder="Please input API url" v-model="apiUrl"></el-input>
        <p class="text-sm text-gray-500">Include forward slash(/) at the end</p>
    </div>
        
  </div>
</template>

<script>

export default {
    data:()=>({
        apiUrl:""
    }),
    mounted() {
        this.apiUrl = this.$store.state.options.apiUrl?
                    this.$store.state.options.apiUrl:
                    this.$store.state.options.defaultUrl
    },
    methods:{
        onChange() {
            this.$store.commit("options/setUrl",this.apiUrl)
        }
    }
}
</script>

<style>
</style>