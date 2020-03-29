<template>
  <div>
    <el-container class="container">
    <el-aside class="aside" width="200px">
      <AsideSection></AsideSection>
    </el-aside>
    <el-container>
      <el-header style="height: 10px;">
        <div class="header-main">
          <h1 class="">
            <el-button @click="$router.push('/')" type="text">
            <i class="el-icon-picture-outline-round"></i> 
            Hyperion</el-button>
          </h1>
        </div>
      </el-header>
      <el-main>
        
        <nuxt />
      </el-main>
      <!-- <el-footer>Footer</!-->
    </el-container>
  </el-container>
  </div>
</template>

<script>
import AsideSection from '~/components/AsideSection'

export default {
  components: {
    AsideSection
  }
}
</script>

<style>
.header-main {
}
</style>
