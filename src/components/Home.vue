<template>
  <div id="home">
    <router-link :to="{ name: 'table' }">
      <el-button type="primary" v-bind:style="{ margin: '0 20px' }"
        >Таблица</el-button
      >
    </router-link>
    <router-link :to="{ name: 'canvas' }">
      <el-button type="primary" v-bind:style="{ margin: '0 20px' }"
        >Холст</el-button
      >
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
