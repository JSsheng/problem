<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { getSubList } from "../../api/monitor";
import router from "../../router";
import { SubListReq } from "../../api/types";

const route = useRoute();
const type = route.query?.name as string || "";

const state = reactive({
  subData: []
});

let param = {
  sn: 1
} as SubListReq;

switch (type) {
  case "acc":
    param.itemPath = "/Monitor/Account";
    break;
  case "st":
    param.itemPath = "/Monitor/Strategy";
    break;
  case "cfg":
    param.itemPath = "/Monitor/Configs";
    break;
  case "tables":
  default:
    param.itemPath = "/Monitor/Tables";

}

getSubList(param).then(async ({ data }) => {
  state.subData = data || [];
});

const previewCSV = (url: string, key: any) => {
  let path = "/monitor/csv";
  let param = {
    url,
    title: key
  }  as any;

  if (url.endsWith(".html")) {
    path = "/monitor/preview";
    param = { id: encodeURIComponent(url), title: key }
  }

  router.push({
    path,
    query: {
      parent: JSON.stringify({
        name: type
      }),
      ...param
    }
  })
}

</script>

<template>
  <ul>
    <li v-for="(url, key) of state.subData" @click="previewCSV(url, key)">
      <el-link>{{ key }}</el-link>
    </li>
  </ul>
</template>

<style scoped>
li {
  padding: 10px;
  cursor: pointer;
}
</style>
