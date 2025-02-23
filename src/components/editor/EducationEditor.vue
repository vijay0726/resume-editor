<template>
  <div class="education-editor">
    <div class="editor-header">
      <h3>教育经历</h3>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加教育经历
      </el-button>
    </div>

    <el-empty v-if="!education.length" description="暂无教育经历" />

    <template v-else>
      <el-card v-for="(item, index) in education" :key="index" class="mb-4">
        <template #header>
          <div class="card-header">
            <span>{{ item.school || '未填写学校' }}</span>
            <el-button type="danger" link @click="handleRemove(index)">
              删除
            </el-button>
          </div>
        </template>

        <el-form :model="item" label-width="100px">
          <el-form-item label="学校">
            <el-input v-model="item.school" placeholder="学校名称" />
          </el-form-item>

          <el-form-item label="学位">
            <el-input v-model="item.degree" placeholder="学位" />
          </el-form-item>

          <el-form-item label="专业">
            <el-input v-model="item.field" placeholder="专业名称" />
          </el-form-item>

          <el-form-item label="时间">
            <el-date-picker
              v-model="dateRange[index]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM"
              :shortcuts="dateShortcuts"
              @change="handleDateChange(index, $event)"
            />
          </el-form-item>

          <el-form-item label="描述">
            <el-input
              v-model="item.description"
              type="textarea"
              :rows="3"
              placeholder="在校经历描述"
            />
          </el-form-item>
        </el-form>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useResumeStore } from '@/stores/resume'
import { ref, computed } from 'vue'
import type { ResumeState } from '@/types/resume'

const store = useResumeStore()
const { data } = storeToRefs(store)
const education = computed(() => data.value.education)

const dateRange = ref<[string, string][]>([])

const dateShortcuts = [
  {
    text: '2020-2024',
    value: () => ['2020-09', '2024-06']
  },
  {
    text: '2016-2020',
    value: () => ['2016-09', '2020-06']
  }
]

const handleAdd = () => {
  store.addEducation({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  })
  dateRange.value.push(['', ''])
}

const handleRemove = (index: number) => {
  store.removeEducation(index)
  dateRange.value.splice(index, 1)
}

const handleDateChange = (index: number, dates: [string, string] | null) => {
  if (dates) {
    data.value.education[index].startDate = dates[0]
    data.value.education[index].endDate = dates[1]
  }
}

// 初始化日期范围
education.value.forEach((edu: ResumeState['data']['education'][0]) => {
  dateRange.value.push([edu.startDate, edu.endDate])
})
</script>

<style scoped>
.education-editor {
  max-width: 800px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-4 {
  margin-bottom: 16px;
}
</style> 