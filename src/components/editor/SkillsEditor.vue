<template>
  <div class="skills-editor">
    <div class="editor-header">
      <h3>技能特长</h3>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加技能
      </el-button>
    </div>

    <el-empty v-if="!skills.length" description="暂无技能特长" />

    <template v-else>
      <el-card v-for="(item, index) in skills" :key="index" class="mb-4">
        <template #header>
          <div class="card-header">
            <span>{{ item.name || '未命名技能' }}</span>
            <el-button type="danger" link @click="handleRemove(index)">
              删除
            </el-button>
          </div>
        </template>

        <el-form :model="item" label-width="100px">
          <el-form-item label="技能名称">
            <el-input v-model="item.name" placeholder="技能名称" />
          </el-form-item>

          <el-form-item label="熟练程度">
            <el-slider
              v-model="item.level"
              :min="1"
              :max="5"
              :marks="{
                1: '了解',
                2: '掌握',
                3: '熟练',
                4: '精通',
                5: '专家'
              }"
            />
          </el-form-item>

          <el-form-item label="关键词">
            <el-tag
              v-for="(tag, tagIndex) in item.keywords"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleRemoveKeyword(index, tagIndex)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible[index]"
              ref="InputRef"
              v-model="inputValue[index]"
              class="w-100 mt-2"
              size="small"
              @keyup.enter="handleInputConfirm(index)"
              @blur="handleInputConfirm(index)"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">
              + 添加关键词
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
const { data } = storeToRefs(store)
const skills = computed(() => data.value.skills)

const inputVisible = reactive<Record<number, boolean>>({})
const inputValue = reactive<Record<number, string>>({})

const handleAdd = () => {
  data.value.skills.push({
    name: '',
    level: 3,
    keywords: []
  })
}

const handleRemove = (index: number) => {
  data.value.skills.splice(index, 1)
}

const showInput = (index: number) => {
  inputVisible[index] = true
  nextTick(() => {
    document.querySelector<HTMLInputElement>('.el-input__inner')?.focus()
  })
}

const handleInputConfirm = (index: number) => {
  if (inputValue[index]) {
    data.value.skills[index].keywords.push(inputValue[index])
  }
  inputVisible[index] = false
  inputValue[index] = ''
}

const handleRemoveKeyword = (skillIndex: number, keywordIndex: number) => {
  data.value.skills[skillIndex].keywords.splice(keywordIndex, 1)
}
</script>

<style scoped>
.skills-editor {
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

.mx-1 {
  margin: 0 4px;
}

.mt-2 {
  margin-top: 8px;
}

.w-100 {
  width: 100%;
}

.button-new-tag {
  margin-left: 4px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style> 