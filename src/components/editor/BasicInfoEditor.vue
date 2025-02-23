<template>
  <div class="basic-info-editor">
    <el-form :model="basics" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="basics.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="职位">
        <el-input v-model="basics.title" placeholder="期望职位" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="basics.contact.email" placeholder="联系邮箱" />
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="basics.contact.phone" placeholder="联系电话" />
      </el-form-item>

      <el-form-item label="所在地">
        <el-input v-model="basics.contact.location" placeholder="所在城市" />
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input
          v-model="basics.summary"
          type="textarea"
          :rows="4"
          placeholder="简单介绍自己"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useResumeStore } from '@/stores/resume'
import { computed } from 'vue'

const store = useResumeStore()
const { data } = storeToRefs(store)
const basics = computed(() => data.value.basics)
</script>

<style scoped>
.basic-info-editor {
  max-width: 600px;
  margin: 0 auto;
}
</style> 