import html2pdf from 'html2pdf.js'
import { ElMessage } from 'element-plus'
import { useResumeStore } from '@/stores/resume'

export function useExport() {
  const store = useResumeStore()

  const exportToPDF = async () => {
    try {
      const element = document.querySelector('.resume-preview')
      if (!element) {
        throw new Error('预览内容不存在')
      }

      const opt = {
        margin: 0,
        filename: `${store.data.basics.name || '我的'}的简历.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          windowWidth: 210 * 3.78, // 210mm to px
          windowHeight: 297 * 3.78 // 297mm to px
        },
        jsPDF: { 
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      }

      await html2pdf().set(opt).from(element).save()
      ElMessage.success('导出成功')
    } catch (error) {
      console.error('PDF导出失败:', error)
      ElMessage.error('导出失败，请重试')
    }
  }

  return {
    exportToPDF
  }
} 