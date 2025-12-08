import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8 relative z-10'>

        <p className='text-2xl font-semibold mb-6 text-white sm:hidden'>Welcome, Joe Doe</p>

        <div className='flex gap-4 '>
          <button onClick={() => setShowCreateResume(true)} className='w-full glass-card sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-300 border border-white/10 group hover:border-violet-500/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer'>
            <div className='bg-violet-500/20 p-3 rounded-full group-hover:bg-violet-500/30 transition-colors'>
              <PlusIcon className='size-8 text-violet-400 group-hover:text-violet-300' />
            </div>
            <p className='text-sm font-medium group-hover:text-white transition-all'>Create Resume</p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className='w-full glass-card sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-300 border border-white/10 group hover:border-pink-500/50 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer'>
            <div className='bg-pink-500/20 p-3 rounded-full group-hover:bg-pink-500/30 transition-colors'>
              <UploadCloudIcon className='size-8 text-pink-400 group-hover:text-pink-300' />
            </div>
            <p className='text-sm font-medium group-hover:text-white transition-all'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-white/10 my-8 sm:w-[305px]' />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 ">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 glass-card group hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/5 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />

                <FilePenLineIcon className="size-8 text-slate-400 group-hover:text-violet-400 transition-colors mb-2" />
                <p className='text-sm font-medium text-slate-200 group-hover:text-white px-2 text-center line-clamp-2'>{resume.title}</p>
                <p className='absolute bottom-3 text-[10px] text-slate-500 px-2 text-center'>
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div onClick={e => e.stopPropagation()} className='absolute top-2 right-2 group-hover:flex items-center gap-1 hidden bg-black/50 backdrop-blur rounded-lg p-1'>
                  <TrashIcon onClick={() => deleteResume(resume._id)} className="size-6 p-1 hover:bg-red-500/20 hover:text-red-400 rounded text-slate-400 transition-colors" />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="size-6 p-1 hover:bg-blue-500/20 hover:text-blue-400 rounded text-slate-400 transition-colors" />
                </div>
              </button>
            )
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative glass-panel rounded-xl w-full max-w-sm p-6 border border-white/10'>
              <h2 className='text-xl font-bold mb-4 text-white'>Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='glass-input mb-6' required />

              <button className='w-full py-2.5 glass-button rounded-lg transition-colors'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle('') }} />
            </div>
          </form>
        )
        }

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative glass-panel rounded-xl w-full max-w-sm p-6 border border-white/10'>
              <h2 className='text-xl font-bold mb-4 text-white'>Upload Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='glass-input mb-4' required />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-300 mb-2">
                  Select resume file
                  <div className='flex flex-col items-center justify-center gap-2 border border-slate-600 border-dashed rounded-xl p-4 py-8 my-2 hover:border-violet-500 hover:bg-violet-500/5 cursor-pointer transition-all bg-slate-900/50'>
                    {resume ? (
                      <p className='text-violet-400 font-medium break-all text-center'>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-10 text-slate-500' />
                        <p className='text-slate-400'>Click to upload PDF</p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
              </div>
              <button disabled={isLoading} className='w-full py-2.5 glass-button rounded-lg transition-colors flex items-center justify-center gap-2 mt-2'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                {isLoading ? 'Uploading...' : 'Upload Resume'}

              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle('') }} />
            </div>
          </form>
        )
        }

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative glass-panel rounded-xl w-full max-w-sm p-6 border border-white/10'>
              <h2 className='text-xl font-bold mb-4 text-white'>Edit Resume Title</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='glass-input mb-6' required />

              <button className='w-full py-2.5 glass-button rounded-lg transition-colors'>Update</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle('') }} />
            </div>
          </form>
        )
        }

      </div>
    </div>
  )
}

export default Dashboard
