<template>
  <div class="preview-container">
    <div class="preview-toolbar">
      <el-button-group>
        <el-button type="primary" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出 PDF
        </el-button>
        <el-button @click="handleBack">
          <el-icon><Back /></el-icon>
          返回编辑
        </el-button>
      </el-button-group>
    </div>
    
    <div class="preview-content">
      <resume-preview />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Download, Back } from '@element-plus/icons-vue'
import ResumePreview from '@/components/preview/ResumePreview.vue'
import { useExport } from '@/composables/useExport'

const router = useRouter()
const { exportToPDF } = useExport()

const handleExport = () => {
  exportToPDF()
}

const handleBack = () => {
  router.push('/')
}
</script>

<style scoped>
.preview-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.preview-toolbar {
  margin-bottom: 20px;
  text-align: center;
}

.preview-content {
  max-width: 210mm;
  margin: 0 auto;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 