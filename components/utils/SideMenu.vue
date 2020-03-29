<template>
  <div>
      <el-col :span="24">
        <el-menu
        :default-active="activeIndex"
        class="w-full border-none"
        @open="handleOpen"
        @close="handleClose">

        <el-menu-item index="1" @click="$router.push('/')">
            <i class="el-icon-menu"></i>
            <span>Home</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/settings')">
            <i class="el-icon-setting"></i>
            <span>Settings</span>
        </el-menu-item>
        </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
 methods: {
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
 },
 computed: {
     activeIndex() {
         if(this.$route.path == "/settings"){
             return "2"
         }
         if(this.$route.path == "/"){
             return "1"
         }
         return ""
     }
 }
}
</script>

<style>
.el-footer {
    padding:0;
    flex:0;
}
.el-menu {
    @apply  border-none;
}
</style>