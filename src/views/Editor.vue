<template>
  <div class="editor-container">
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="isCollapse ? '64px' : '160px'" class="menu-aside">
        <div class="menu-header">
          <div class="app-title" :class="{ 'collapsed': isCollapse }">
            <div class="title-content">
              <div class="brand">
                <app-logo :size="isCollapse ? 20 : 24" class="title-logo" />
                <div class="brand-text">
                  <span class="title-text">墨简</span>
                  <span class="version" v-show="!isCollapse">v0.0.1</span>
                </div>
              </div>
            </div>
          </div>
          <el-button
            type="text"
            :icon="isCollapse ? 'Expand' : 'Fold'"
            @click="toggleCollapse"
            class="collapse-btn"
          />
        </div>
        <el-menu
          :default-active="activeSection"
          class="editor-menu"
          @select="handleSelect"
          :collapse="isCollapse"
        >
          <el-menu-item index="basics">
            <el-icon><User /></el-icon>
            <template #title>基本信息</template>
          </el-menu-item>
          <el-menu-item index="education">
            <el-icon><School /></el-icon>
            <template #title>教育经历</template>
          </el-menu-item>
          <el-menu-item index="experience">
            <el-icon><Briefcase /></el-icon>
            <template #title>工作经历</template>
          </el-menu-item>
          <el-menu-item index="skills">
            <el-icon><Star /></el-icon>
            <template #title>技能特长</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <!-- 主要内容区 -->
      <el-container class="main-container">
        <el-header class="editor-header">
          <div class="header-title">{{ getActiveTitle }}</div>
          <div class="header-actions">
            <el-button
              v-if="!showPreview && !isLargeScreen"
              type="primary"
              @click="togglePreview"
            >
              <el-icon><View /></el-icon>
              预览
            </el-button>
          </div>
        </el-header>

        <el-main :class="{ 'hide': showPreview && !isLargeScreen }">
          <component :is="currentEditor" />
        </el-main>
      </el-container>

      <!-- 预览区 -->
      <el-aside 
        class="preview-aside"
        :class="{
          'show-preview': showPreview && !isLargeScreen,
          'large-screen': isLargeScreen
        }"
      >
        <div class="preview-header">
          <span>预览</span>
          <div class="preview-controls">
            <el-slider
              v-model="previewScale"
              :min="50"
              :max="100"
              :format-tooltip="(value: number) => `${value}%`"
              @input="handlePreviewScaleChange"
            />
            <el-button
              v-if="!isLargeScreen"
              type="text"
              @click="togglePreview"
              class="close-preview"
            >
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
        </div>
        <div class="preview-container">
          <resume-preview :scale="previewScale / 100" />
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, markRaw, computed, watch } from 'vue'
import { User, School, Briefcase, Star, View, Close } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import BasicInfoEditor from '@/components/editor/BasicInfoEditor.vue'
import EducationEditor from '@/components/editor/EducationEditor.vue'
import ExperienceEditor from '@/components/editor/ExperienceEditor.vue'
import SkillsEditor from '@/components/editor/SkillsEditor.vue'
import ResumePreview from '@/components/preview/ResumePreview.vue'
import AppLogo from '@/components/common/AppLogo.vue'

const { width } = useWindowSize()
const isLargeScreen = computed(() => width.value >= 1600)
const showPreview = ref(false)
const isCollapse = ref(width.value < 768)

const activeSection = ref('basics')
const currentEditor = shallowRef(markRaw(BasicInfoEditor))

const editorComponents = {
  basics: BasicInfoEditor,
  education: EducationEditor,
  experience: ExperienceEditor,
  skills: SkillsEditor
}

const sectionTitles = {
  basics: '基本信息',
  education: '教育经历',
  experience: '工作经历',
  skills: '技能特长'
}

const getActiveTitle = computed(() => sectionTitles[activeSection.value as keyof typeof sectionTitles])

const handleSelect = (key: string) => {
  activeSection.value = key
  currentEditor.value = markRaw(editorComponents[key as keyof typeof editorComponents])
}

const togglePreview = () => {
  showPreview.value = !showPreview.value
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const previewScale = ref<number>(85) // 默认显示85%大小

const handlePreviewScaleChange = (value: number): void => {
  previewScale.value = value
}

// 监听窗口大小变化
watch(width, (newWidth) => {
  if (newWidth < 768) {
    isCollapse.value = true
  }
  if (newWidth >= 1600) {
    showPreview.value = false
  }
})
</script>

<style scoped>
.editor-container {
  height: 100vh;
  background-color: #f5f7fa;
  overflow: hidden;
}

.menu-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  transition: width 0.3s;
}

.menu-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid #dcdfe6;
  background: linear-gradient(to right, #409eff0a, #409eff1a);
}

.app-title {
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  min-width: 0;
}

.app-title.collapsed {
  width: 64px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.title-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.app-title.collapsed .brand {
  transform: scale(0.9);
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 100%;
  justify-content: center;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.title-text {
  font-size: 16px;
  font-weight: 600;
  color: #409eff;
  white-space: nowrap;
}

.app-title.collapsed .title-text {
  font-size: 14px;
  line-height: 1;
}

.version {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
}

.title-logo {
  transition: all 0.3s;
  flex-shrink: 0;
}

.app-title.collapsed .title-logo {
  transform: scale(1);
}

.collapse-btn {
  font-size: 18px;
  color: #909399;
  transition: all 0.3s;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn:hover {
  color: #409eff;
}

.editor-menu {
  height: calc(100vh - 60px);
  border-right: none;
}

.editor-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.main-container {
  flex: 1;
  min-width: 0;
  position: relative;
}

.main-container.hide {
  display: none;
}

:deep(.el-main) {
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

:deep(.el-main > *) {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.preview-aside {
  flex: 1;
  background-color: #fff;
  border-left: 1px solid #dcdfe6;
  display: none;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: all 0.3s;
  overflow: hidden;
  min-width: 400px;
  max-width: calc(100vh * 0.707); /* A4 ratio: height * 1/1.414 */
}

.preview-aside.large-screen {
  position: relative;
  display: block;
}

.preview-aside.show-preview {
  display: block;
  width: 100% !important;
  max-width: none;
}

.preview-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #dcdfe6;
  font-size: 16px;
  font-weight: 600;
}

.preview-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
  max-width: 200px;
}

:deep(.el-slider) {
  margin-right: 8px;
}

.close-preview {
  font-size: 20px;
}

.preview-container {
  height: calc(100vh - 60px);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  background-color: #f5f7fa;
}

:deep(.resume-preview-wrapper) {
  transition: transform 0.3s;
}

@media screen and (max-width: 1440px) {
  .main-container {
    margin-right: 0;
  }
}

@media screen and (max-width: 768px) {
  .main-container {
    width: 100%;
  }
  
  .editor-header {
    padding: 0 10px;
  }

  .menu-header {
    padding: 0;
    justify-content: center;
  }

  .app-title.collapsed {
    width: 48px;
  }

  .collapse-btn {
    position: absolute;
    right: 4px;
  }
}
</style> 