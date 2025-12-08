import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {

  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt }, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-white'> Professional Summary </h3>
          <p className='text-sm text-slate-400'>Add summary for your resume here</p>
        </div>
        <button disabled={isGenerating} onClick={generateSummary} className='glass-button-secondary flex items-center gap-2 px-3 py-1 text-sm bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded hover:bg-violet-500/20 transition-colors disabled:opacity-50'>
          {isGenerating ? (<Loader2 className="size-4 animate-spin" />) : (<Sparkles className="size-4 text-violet-400" />)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}

        </button>
      </div>

      <div className="mt-6">
        <textarea value={data || ""} onChange={(e) => onChange(e.target.value)} rows={7} className='glass-input w-full p-3 px-4 mt-2 text-sm resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...' />
        <p className='text-xs text-slate-500 max-w-4/5 mx-auto text-center mt-2'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
