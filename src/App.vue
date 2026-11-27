<template>
  <el-container class="layout">
    <el-header class="header">
      <span class="logo">图书借阅系统</span>
      <el-menu mode="horizontal" :default-active="$route.path" router
               class="menu">
        <el-menu-item index="/books">图书列表</el-menu-item>
        <el-menu-item index="/borrows">借阅记录</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<style>
body { margin: 0; }
.layout { min-height: 100vh; }
.header { display: flex; align-items: center; gap: 32px;
          border-bottom: 1px solid #eee; padding: 0 24px; }
.logo { font-size: 18px; font-weight: 600; color: #2f5496; }
.menu { border-bottom: none !important; }
</style>