import { defineStore } from 'pinia'
import type { ResumeState } from '@/types/resume'

export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => ({
    id: crypto.randomUUID(),
    currentTemplate: 'default',
    data: {
      basics: {
        name: '',
        title: '',
        contact: {
          email: '',
          phone: '',
          location: ''
        },
        summary: ''
      },
      education: [],
      experience: [],
      skills: []
    }
  }),

  actions: {
    updateBasics(data: Partial<ResumeState['data']['basics']>) {
      this.data.basics = { ...this.data.basics, ...data }
    },

    addEducation(education: ResumeState['data']['education'][0]) {
      this.data.education.push(education)
    },

    updateEducation(index: number, education: ResumeState['data']['education'][0]) {
      this.data.education[index] = education
    },

    removeEducation(index: number) {
      this.data.education.splice(index, 1)
    },

    addExperience(experience: ResumeState['data']['experience'][0]) {
      const newExperience = {
        ...experience,
        projects: experience.projects || [],
        highlights: experience.highlights || [''],
      }
      this.data.experience.push(newExperience)
    },

    updateExperience(index: number, experience: ResumeState['data']['experience'][0]) {
      this.data.experience[index] = experience
    },

    removeExperience(index: number) {
      this.data.experience.splice(index, 1)
    },

    updateSkills(skills: ResumeState['data']['skills']) {
      this.data.skills = skills
    }
  },

  persist: {
    key: 'resume-data',
    storage: localStorage,
    paths: ['data', 'currentTemplate']
  }
}) 