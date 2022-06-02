<script setup lang="ts">
import { Ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const emit = defineEmits<{
  (e: "toComp", num: Ref<string>): void;
}>();

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log('handleOpen',key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log('handleClose',key, keyPath)
}
// 选择左侧菜单
const getMenu = (url) => {
  emit("toComp", url);
}
</script>

<template>
  <div class="left-nav">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1" text-color="#fff" @open="handleOpen" @close="handleClose">
          <el-menu-item @click="getMenu('dataDisplay')" index="1">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>数据展示</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item @click="getMenu('userManage')" index="2-1">人员管理</el-menu-item>
            <!-- <el-menu-item index="1-2">item one</el-menu-item> -->
          </el-sub-menu>

          <el-menu-item @click="getMenu('goodsManage')" index="3">
            <el-icon>
              <document />
            </el-icon>
            <span>商品管理</span>
          </el-menu-item>
                  <el-menu-item @click="getMenu('orderManage')" index="4">
            <el-icon>
              <document />
            </el-icon>
            <span>订单中心</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>

</template>

<style lang="less">
.left-nav {
  width: 14%;
  min-height: 100vh;
  background-color: #545c64;

  .el-row {
    width: 100%;

    .el-menu {
      border: none;
      .el-sub-menu .el-menu-item{
        width: 100%;
        min-width: 0;
      }
    }
  }

}
</style>
