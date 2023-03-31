<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { BaseinsReq, StinsReq, AccinsReq } from "../../api/types"
import { reactive,createApp } from "vue";
import { useRoute } from "vue-router";
import { genTable } from "../../utils/common"
import { config } from "./config"
import { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions";

export interface ColItem {
  headerName: string;
  field: string;
}

const route = useRoute();
const type = route.query?.name as string || "";
const state = reactive({
  rowData: [],
  columnDefs: [] as ColItem[],
  gridApi: null,
  columnApi :  null,
  gridColumnApi:null
});

let param = {} as BaseinsReq | StinsReq | AccinsReq;

switch (type) {
  case "strategy":
    param = { stIns: "*", sn: 1 };
    state.columnDefs = config.strategy;
    break;
  case "account":
    param = { accIns: "*", sn: 1 };
    state.columnDefs = config.account;
    break;
  case "base":
  default:
    param = { ins: "*", sn: 1 };
    state.columnDefs = config.base;
}

genTable(type, param).then(({ data: rowData }) => {
  state.rowData = rowData;
})

const gridOptions = <GridOptions>{
        defaultColDef: {
            flex: 1,
            editable: true,
            autoHeight: true,
            resizable: true,
            sortable: true,
            groupHeaders: true,
            filter: 'agTextColumnFilter',
            rowSelection:'multiple'
        },
        rowSelection: 'multiple'
};

const getContextMenuItems = (params:any) =>{
        var result = [
          {
            // custom item
            name: 'Alert ' + params.value,
            action: () => {
              window.alert('Alerting about ' + params.value);
            },
            cssClasses: ['redFont', 'bold'],
          },
          {
            // custom item
            name: 'Always Disabled',
            disabled: true,
            tooltip:
              'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
          },
          {
            name: 'Country',
            subMenu: [
              {
                name: 'Ireland',
                action: () => {
                  console.log('Ireland was pressed');
                },
              },
              {
                name: 'UK',
                action: () => {
                  console.log('UK was pressed');
                },
              },
              {
                name: 'France',
                action: () => {
                  console.log('France was pressed');
                },
              },
            ],
          },
          {
            name: 'Person',
            subMenu: [
              {
                name: 'Niall',
                action: () => {
                  console.log('Niall was pressed');
                },
              },
              {
                name: 'Sean',
                action: () => {
                  console.log('Sean was pressed');
                },
              },
              {
                name: 'John',
                action: () => {
                  console.log('John was pressed');
                },
              },
              {
                name: 'Alberto',
                action: () => {
                  console.log('Alberto was pressed');
                },
              },
              {
                name: 'Tony',
                action: () => {
                  console.log('Tony was pressed');
                },
              },
              {
                name: 'Andrew',
                action: () => {
                  console.log('Andrew was pressed');
                },
              },
              {
                name: 'Kev',
                action: () => {
                  console.log('Kev was pressed');
                },
              },
              {
                name: 'Will',
                action: () => {
                  console.log('Will was pressed');
                },
              },
              {
                name: 'Armaan',
                action: () => {
                  console.log('Armaan was pressed');
                },
              },
            ],
          },
          'separator',
          {
            // custom item
            name: 'Windows',
            shortcut: 'Alt + W',
            action: () => {
              console.log('Windows Item Selected');
            },
            icon:
              '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
          },
          {
            // custom item
            name: 'Mac',
            shortcut: 'Alt + M',
            action: () => {
              console.log('Mac Item Selected');
            },
            icon:
              '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
          },
          'separator',
          {
            // custom item
            name: 'Checked',
            checked: true,
            action: () => {
              console.log('Checked Selected');
            },
            icon:
              '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
          },
          'copy',
          'separator',
          'chartRange',
        ];
        return result;
}

const onGridReady = (params:any) => {
      state.gridApi = params.api;
      state.gridColumnApi = params.columnApi;

      const updateData = (data:any) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
}
</script>

<template>
  <AgGridVue
    class="ag-theme-alpine"
    :columnDefs="state.columnDefs"
    :rowData="state.rowData"
    :gridOptions="gridOptions"
    :enableRangeSelection="true"
    :allowContextMenuWithControlKey="true"
    :getContextMenuItems="getContextMenuItems"
    @grid-ready="onGridReady"
    >
    <!-- :defaultColDef="defaultColDef" -->
  </AgGridVue>
</template>
