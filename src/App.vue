<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home'}" >Kossie Coder</router-link>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'Todos'}">Todos</router-link>
        </li>
      </ul>

  </nav>

  <div class="container">
    <router-view />
  </div>
  <transition name="slide">
      <Toast />
  </transition>


</template>

<script>
  import Toast from '@/components/Toast';

  export default {
    components : {
      Toast
    },
  }
</script>

<style>
</style>