<template>
  <div class="experience-editor">
    <div class="editor-header">
      <h3>工作经历</h3>
      <el-button type="primary" @click="handleAdd">
        <el-icon>
          <Plus />
        </el-icon>
        添加工作经历
      </el-button>
    </div>

    <el-empty v-if="!experience.length" description="暂无工作经历" />

    <template v-else>
      <el-card v-for="(item, index) in experience" :key="index" class="mb-4">
        <template #header>
          <div class="card-header">
            <span>{{ item.company || '未填写公司' }}</span>
            <el-button type="danger" link @click="handleRemove(index)">
              删除
            </el-button>
          </div>
        </template>

        <el-form :model="item" label-width="100px">
          <el-form-item label="公司">
            <el-input v-model="item.company" placeholder="公司名称" />
          </el-form-item>

          <el-form-item label="职位">
            <el-input v-model="item.position" placeholder="担任职位" />
          </el-form-item>

          <el-form-item label="时间">
            <el-date-picker v-model="dateRange[index]" type="daterange" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" value-format="YYYY-MM" @change="handleDateChange(index, $event)" />
          </el-form-item>

          <el-form-item label="工作描述">
            <el-input v-model="item.description" type="textarea" :rows="3" placeholder="工作内容描述" />
          </el-form-item>

          <el-form-item label="工作亮点">
            <div class="highlights-wrapper">
              <div v-for="(_, hIndex) in item.highlights" :key="hIndex" class="highlight-item">
                <div class="highlight-index">#{{ hIndex + 1 }}</div>
                <div class="highlight-content">
                  <el-input 
                    v-model="item.highlights[hIndex]" 
                    placeholder="工作亮点"
                    type="textarea"
                    :rows="2"
                    resize="none"
                  />
                  <el-button 
                    class="highlight-delete-btn" 
                    type="danger" 
                    link
                    @click="removeHighlight(index, hIndex)"
                  >
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>
              <el-button 
                link 
                type="primary" 
                @click="addHighlight(index)"
                class="add-highlight-btn"
              >
                <el-icon class="mr-1"><Plus /></el-icon>
                添加亮点
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="项目经历">
            <div v-for="(project, pIndex) in item.projects" :key="pIndex" class="project-item">
              <div class="project-header">
                <div class="project-title">
                  <span class="project-index">#{{ pIndex + 1 }}</span>
                  <span>{{ project.name || '未命名项目' }}</span>
                </div>
                <div class="project-actions">
                  <el-button type="danger" link @click="removeProject(index, pIndex)">
                    <el-icon>
                      <Delete />
                    </el-icon>
                    删除项目
                  </el-button>
                </div>
              </div>

              <div class="project-form">
                <el-form-item label="项目名称">
                  <el-input v-model="project.name" placeholder="项目名称" />
                </el-form-item>

                <el-form-item label="担任角色">
                  <el-input v-model="project.role" placeholder="项目中担任的角色" />
                </el-form-item>

                <el-form-item label="项目描述">
                  <el-input v-model="project.description" type="textarea" :rows="3" placeholder="项目简介" />
                </el-form-item>

                <el-form-item label="项目亮点">
                  <div class="highlights-container">
                    <div v-for="(_, hIndex) in project.highlights" :key="hIndex" class="highlight-item">
                      <div class="highlight-content">
                        <div class="highlight-prefix">
                          <el-icon><Star /></el-icon>
                          <span class="highlight-number">{{ hIndex + 1 }}</span>
                        </div>
                        <el-input 
                          v-model="project.highlights[hIndex]" 
                          placeholder="项目亮点"
                        />
                        <el-button 
                          class="highlight-delete-btn" 
                          type="danger" 
                          link
                          @click="removeProjectHighlight(index, pIndex, hIndex)"
                        >
                          <el-icon><Delete /></el-icon>
                        </el-button>
                      </div>
                    </div>
                    <el-button link type="primary" @click="addProjectHighlight(index, pIndex)"
                      class="add-highlight-btn">
                      <el-icon>
                        <Plus />
                      </el-icon>
                      添加亮点
                    </el-button>
                  </div>
                </el-form-item>

                <el-form-item label="技术栈">
                  <div class="tech-stack-container">
                    <div class="tech-tags">
                      <el-tag v-for="(tech, tIndex) in project.technologies" :key="tech" class="tech-tag" closable
                        :disable-transitions="false" type="info" effect="plain"
                        @close="removeProjectTech(index, pIndex, tIndex)">
                        {{ tech }}
                      </el-tag>
                    </div>
                    <div class="tech-input">
                      <el-input v-if="techInputVisible[`${index}-${pIndex}`]" ref="TechInputRef"
                        v-model="techInputValue[`${index}-${pIndex}`]" size="small"
                        @keyup.enter="handleTechInputConfirm(index, pIndex)"
                        @blur="handleTechInputConfirm(index, pIndex)" placeholder="输入技术名称后按回车">
                        <template #prefix>
                          <el-icon>
                            <Connection />
                          </el-icon>
                        </template>
                      </el-input>
                      <el-button v-else class="button-new-tag" size="small" @click="showTechInput(index, pIndex)">
                        <el-icon>
                          <Plus />
                        </el-icon>
                        添加技术栈
                      </el-button>
                    </div>
                  </div>
                </el-form-item>
              </div>
            </div>

            <div class="add-project-container">
              <el-button type="primary" plain @click="addProject(index)" class="add-project-btn">
                <el-icon>
                  <Plus />
                </el-icon>
                添加项目
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Plus, Delete, Star, Connection } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useResumeStore } from '@/stores/resume'
import { ref, computed, reactive, nextTick } from 'vue'
import type { ResumeState } from '@/types/resume'

const store = useResumeStore()
const { data } = storeToRefs(store)
const experience = computed(() => data.value.experience)

const dateRange = ref<[string, string][]>([])

const techInputVisible = reactive<Record<string, boolean>>({})
const techInputValue = reactive<Record<string, string>>({})

const handleAdd = () => {
  store.addExperience({
    company: '',
    position: '',
    domain: '',
    startDate: '',
    endDate: '',
    description: '',
    highlights: [],
    projects: []
  })
  dateRange.value.push(['', ''])
}

const handleRemove = (index: number) => {
  store.removeExperience(index)
  dateRange.value.splice(index, 1)
}

const handleDateChange = (index: number, dates: [string, string] | null) => {
  if (dates) {
    data.value.experience[index].startDate = dates[0]
    data.value.experience[index].endDate = dates[1]
  }
}

const addHighlight = (index: number) => {
  data.value.experience[index].highlights.push('')
}

const removeHighlight = (index: number, highlightIndex: number) => {
  data.value.experience[index].highlights.splice(highlightIndex, 1)
}

const addProject = (expIndex: number) => {
  if (!data.value.experience[expIndex].projects) {
    data.value.experience[expIndex].projects = []
  }
  
  data.value.experience[expIndex].projects.push({
    name: '',
    role: '',
    description: '',
    highlights: [],
    technologies: []
  })
}

const removeProject = (expIndex: number, projectIndex: number) => {
  if (data.value.experience[expIndex].projects) {
    data.value.experience[expIndex].projects.splice(projectIndex, 1)
  }
}

const addProjectHighlight = (expIndex: number, projectIndex: number) => {
  if (data.value.experience[expIndex].projects?.[projectIndex]) {
    data.value.experience[expIndex].projects[projectIndex].highlights.push('')
  }
}

const removeProjectHighlight = (expIndex: number, projectIndex: number, highlightIndex: number) => {
  const project = data.value.experience[expIndex].projects?.[projectIndex]
  if (project) {
    project.highlights.splice(highlightIndex, 1)
  }
}

const showTechInput = (expIndex: number, projectIndex: number) => {
  techInputVisible[`${expIndex}-${projectIndex}`] = true
  nextTick(() => {
    document.querySelector<HTMLInputElement>('.el-input__inner')?.focus()
  })
}

const handleTechInputConfirm = (expIndex: number, projectIndex: number) => {
  const key = `${expIndex}-${projectIndex}`
  if (techInputValue[key]) {
    data.value.experience[expIndex].projects[projectIndex].technologies?.push(techInputValue[key])
  }
  techInputVisible[key] = false
  techInputValue[key] = ''
}

const removeProjectTech = (expIndex: number, projectIndex: number, techIndex: number) => {
  data.value.experience[expIndex].projects[projectIndex].technologies?.splice(techIndex, 1)
}

// 初始化日期范围
experience.value.forEach((exp: ResumeState['data']['experience'][0]) => {
  dateRange.value.push([exp.startDate, exp.endDate])
})
</script>

<style scoped>
.experience-editor {
  max-width: 800px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.mb-4 {
  margin-bottom: 32px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.mb-4:last-child {
  margin-bottom: 0;
}

.mb-4:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header span {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.highlight-item {
  margin-bottom: 12px;
}

.project-item {
  width: 550px;
  margin-top: 32px;
  padding: 28px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.project-item:first-child {
  margin-top: 24px;
}

.project-item:hover {
  background-color: #ffffff;
  border-color: #dcdfe6;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.project-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.project-index {
  display: inline-block;
  padding: 4px 12px;
  background-color: #ecf5ff;
  border-radius: 4px;
  font-size: 14px;
  color: #409eff;
  font-weight: normal;
}

.project-form {
  padding: 0;
}

.project-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.project-form :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

.highlights-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.highlight-item {
  margin-bottom: 0;
}

.highlight-item :deep(.el-input-group__prepend) {
  background-color: #fff;
}

.add-highlight-btn {
  align-self: flex-start;
  margin-top: 12px;
}

.tech-stack-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 32px;
  padding: 8px 0;
}

.tech-tag {
  margin: 0;
}

.tech-input {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.add-project-container {
  display: flex;
  justify-content: center;
  margin-top: 32px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.add-project-container:hover {
  background-color: #ecf5ff;
  border-color: #409eff;
}

.add-project-btn {
  min-width: 160px;
  height: 40px;
  font-size: 14px;
  border-style: dashed;
}

.add-project-btn:hover {
  background-color: #ffffff;
}

:deep(.el-form-item__content) {
  flex-wrap: wrap;
}

:deep(.el-input__prefix) {
  color: #909399;
}

:deep(.el-form) {
  margin-top: 16px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-card__header) {
  padding: 16px 24px;
  border-bottom: 1px solid #e4e7ed;
  background-color: #fafafa;
}

:deep(.el-card__body) {
  padding: 24px 32px;
}

:deep(.el-form-item.is-required > .el-form-item__label::before) {
  margin-right: 6px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

.highlights-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
  padding: 12px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.highlight-index {
  flex-shrink: 0;
  padding: 4px 8px;
  background-color: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.highlight-item :deep(.el-input-group__append) {
  padding: 0;
  border: none;
  background: transparent;
}

.highlight-item :deep(.el-textarea__inner) {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.delete-btn {
  height: 100%;
  border: 1px solid #dcdfe6;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 8px 12px;
  color: #f56c6c;
}

.delete-btn:hover {
  background-color: #fef0f0;
  color: #f56c6c;
}

.add-highlight-btn {
  align-self: flex-start;
  margin-top: 4px;
  padding: 8px 16px;
  font-size: 14px;
  border: 1px dashed #409eff;
  border-radius: 4px;
}

.add-highlight-btn:hover {
  background-color: #ecf5ff;
}

.mr-1 {
  margin-right: 4px;
}

.highlight-content {
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: center;
}

.highlight-prefix {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #409eff;
  padding: 0 8px;
  border-right: 1px solid #dcdfe6;
}

.highlight-prefix :deep(.el-icon) {
  font-size: 14px;
}

.highlight-number {
  font-size: 12px;
  font-weight: 500;
}

.highlight-delete-btn {
  flex-shrink: 0;
  padding: 8px;
  height: 32px;
  transition: all 0.3s;
}

.highlight-delete-btn:hover {
  color: #f56c6c;
  background-color: #fef0f0;
  border-radius: 4px;
}

.highlight-item :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.highlight-item :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

.highlight-item :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}
</style>