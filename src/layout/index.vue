<script lang="ts" setup>
import { MainContent, NavBar, SideBar } from './components/index';
import { useRoute } from 'vue-router';
import router from '../router';
import { computed } from 'vue';
import { useMenuStore } from '../store/modules/menu';

const route = useRoute();
const menu = useMenuStore();

menu.getMenuList()

const select = (index: string) => {
  if (index.indexOf("/") > -1) {
    router.push(index).catch(err => err);
  }
}

const matchPath = computed(() => {
  const path = route.path.split("/")[1];
  const suffix = route.path.split("/")[2];
  const fullParam = route.query;
  let param = ""

  // TODO: need to be improved
  // Maybe there are two or more properties in the parent object. Or the parent parameter is not named 'name'.
  if (fullParam.parent) {
    const o = JSON.parse(fullParam.parent as string);
    param = `name=${o.name}`
  }

  if (param) {
    return `/${path}?${param}`;
  }

  // case of suffix
  if (suffix) {
    return `/${path}`;
  }
  return route.fullPath;
})

</script>

<template>
  <div class="container">
      <el-scrollbar style="height:100%;">
        <SideBar :menuList="menu.menuList" :default-active="matchPath" @select="select" class="side-bar-container" />
      </el-scrollbar>
    </div>

    <div class="main-container">
      <NavBar />

      <MainContent class="main" />
    </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}
.side-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100vh;
  flex-shrink: 0;
  flex-grow: 0;
  overflow-x: hidden;
  // overflow-y: auto;
 
}

.main-container {
  width: calc(100% - 180px);
  position: absolute;
  top: 0;
  left: 180px;
  height: 100%;
}

.main {
  height: calc(100% - 54px);
}
</style>
