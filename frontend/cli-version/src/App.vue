<template>
    <div id="app">
      <NavHeader></NavHeader>
      <router-view></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
import NavHeader from "./components/NavHeader"
import Footer from "./components/Footer"
export default {
    name: "App",
    components: { 
        NavHeader,
        Footer
    }
}
</script>

<style>
  body {
      background-color: #f85f06
  }
</style>