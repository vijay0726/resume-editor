<template>
  <div 
    class="resume-preview-wrapper"
    :style="{
      transform: `scale(${scale})`,
      width: '210mm'
    }"
  >
    <div class="preview-toolbar">
      <el-button type="primary" size="small" @click="handleExport">
        <el-icon><Download /></el-icon>
        导出 PDF
      </el-button>
    </div>
    <div class="resume-preview">
      <!-- 基本信息 -->
      <div class="basic-info">
        <h1 class="name">{{ basics.name }}</h1>
        <p class="title">{{ basics.title }}</p>
        <div class="contact">
          <span v-if="basics.contact.email">
            <el-icon><Message /></el-icon>
            {{ basics.contact.email }}
          </span>
          <span v-if="basics.contact.phone">
            <el-icon><Phone /></el-icon>
            {{ basics.contact.phone }}
          </span>
          <span v-if="basics.contact.location">
            <el-icon><Location /></el-icon>
            {{ basics.contact.location }}
          </span>
        </div>
        <p v-if="basics.summary" class="summary">{{ basics.summary }}</p>
      </div>

      <!-- 教育经历 -->
      <div v-if="education.length" class="section">
        <h2 class="section-title">教育经历</h2>
        <div v-for="(edu, index) in education" :key="index" class="education-item">
          <div class="header">
            <h3>{{ edu.school }}</h3>
            <span class="date">{{ edu.startDate }} - {{ edu.endDate }}</span>
          </div>
          <p class="subtitle">{{ edu.degree }} · {{ edu.field }}</p>
          <p v-if="edu.description" class="description">{{ edu.description }}</p>
        </div>
      </div>

      <!-- 工作经历 -->
      <div v-if="experience.length" class="section">
        <h2 class="section-title">工作经历</h2>
        <div v-for="(exp, index) in experience" :key="index" class="experience-item">
          <div class="header">
            <div class="title-group">
              <h3>{{ exp.company }}</h3>
              <span class="position">· {{ exp.position }}</span>
              <span v-if="exp.domain" class="domain">· {{ exp.domain }}</span>
            </div>
            <span class="date">{{ exp.startDate }} - {{ exp.endDate }}</span>
          </div>
          <p v-if="exp.description" class="description">{{ exp.description }}</p>
          <ul v-if="exp.highlights.length" class="highlights">
            <li v-for="(highlight, hIndex) in exp.highlights" :key="hIndex">
              {{ highlight }}
            </li>
          </ul>
          <div v-if="exp.projects?.length" class="projects">
            <div v-for="(project, pIndex) in exp.projects" :key="pIndex" class="project-item">
              <h4 class="project-name">
                {{ project.name }}
                <span v-if="project.role" class="project-role">· {{ project.role }}</span>
              </h4>
              <p class="project-description">{{ project.description }}</p>
              <ul v-if="project.highlights?.length" class="project-highlights">
                <li v-for="(highlight, phIndex) in project.highlights" :key="phIndex">
                  {{ highlight }}
                </li>
              </ul>
              <div v-if="project.technologies?.length" class="project-tech">
                <el-tag
                  v-for="tech in project.technologies"
                  :key="tech"
                  size="small"
                  type="info"
                  class="mx-1"
                >
                  {{ tech }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能特长 -->
      <div v-if="skills.length" class="section">
        <h2 class="section-title">技能特长</h2>
        <div class="skills-container">
          <div v-for="(skill, index) in skills" :key="index" class="skill-item">
            <div class="skill-header">
              <h3>{{ skill.name }}</h3>
              <el-rate
                v-model="skill.level"
                :max="5"
                disabled
                show-score
                text-color="#ff9900"
              />
            </div>
            <div v-if="skill.keywords.length" class="skill-keywords">
              <el-tag
                v-for="keyword in skill.keywords"
                :key="keyword"
                size="small"
                class="mx-1"
              >
                {{ keyword }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, Phone, Location, Download } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useResumeStore } from '@/stores/resume'
import { computed } from 'vue'
import { useExport } from '@/composables/useExport'

// 添加 scale prop
defineProps<{
  scale?: number
}>()

const store = useResumeStore()
const { data } = storeToRefs(store)
const basics = computed(() => data.value.basics)
const education = computed(() => data.value.education)
const experience = computed(() => data.value.experience)
const skills = computed(() => data.value.skills)

const { exportToPDF } = useExport()
const handleExport = () => {
  exportToPDF()
}
</script>

<style scoped>
.resume-preview-wrapper {
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform-origin: top center;
  margin: 0 auto;
  position: relative;
}

.preview-toolbar {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid #ebeef5;
}

.resume-preview {
  width: 210mm;
  min-height: 297mm;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
}

.basic-info {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.name {
  font-size: 24px;
  margin: 0;
  color: #303133;
  font-weight: 600;
}

.title {
  font-size: 16px;
  color: #606266;
  margin: 4px 0;
}

.contact {
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #606266;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 6px;
}

.contact span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.summary {
  margin-top: 10px;
  color: #606266;
  line-height: 1.5;
  padding: 0;
  font-size: 13px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  color: #303133;
  border-bottom: 1px solid #409eff;
  padding-bottom: 4px;
  margin-bottom: 10px;
  font-weight: 600;
}

.experience-item {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.experience-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.title-group {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.header h3 {
  margin: 0;
  color: #303133;
  font-size: 16px;
  font-weight: 600;
}

.position, .domain {
  color: #606266;
  font-size: 15px;
  font-weight: normal;
}

.date {
  color: #909399;
  font-size: 14px;
  flex-shrink: 0;
}

.description {
  color: #606266;
  line-height: 1.6;
  margin: 8px 0;
  font-size: 14px;
  text-align: justify;
}

.highlights {
  margin: 10px 0;
  padding-left: 20px;
  color: #606266;
}

.highlights li {
  margin: 4px 0;
  line-height: 1.6;
  text-align: justify;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.skill-item {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-header h3 {
  margin: 0;
  color: #303133;
  font-size: 15px;
  font-weight: 600;
}

.skill-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.mx-1 {
  margin: 0 4px;
}

.projects {
  margin-top: 10px;
  padding-left: 16px;
  border-left: 2px solid #e6e6e6;
}

.project-item {
  position: relative;
  margin-bottom: 12px;
  padding: 10px 14px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.project-item::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 16px;
  width: 6px;
  height: 6px;
  background: #409eff;
  border-radius: 50%;
}

.project-name {
  font-size: 15px;
  color: #303133;
  margin: 0 0 6px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.project-role {
  font-size: 14px;
  color: #606266;
  font-weight: normal;
  padding: 2px 8px;
  background: #f0f2f5;
  border-radius: 4px;
}

.project-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin: 8px 0;
  text-align: justify;
}

.project-highlights {
  margin: 10px 0;
  padding-left: 20px;
  color: #606266;
  font-size: 14px;
  list-style-type: none;
}

.project-highlights li {
  position: relative;
  margin: 4px 0;
  line-height: 1.6;
  text-align: justify;
}

.project-tech {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-tech :deep(.el-tag) {
  background-color: rgba(64, 158, 255, 0.1);
  border-color: rgba(64, 158, 255, 0.2);
  color: #409eff;
}

@media print {
  .preview-toolbar {
    display: none;
  }
  
  .resume-preview-wrapper {
    width: 210mm !important;
    margin: 0;
    box-shadow: none;
    transform: none !important;
  }

  .resume-preview {
    width: 210mm;
    min-height: 297mm;
    padding: 20px;
    margin: 0;
  }

  @page {
    size: A4;
    margin: 0;
  }
}
</style> 