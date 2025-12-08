import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data, onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-white'> Education </h3>
                    <p className='text-sm text-slate-400'>Add your education details</p>
                </div>
                <button onClick={addEducation} className='glass-button-secondary flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-slate-700/50 transition-colors'>
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-slate-500'>
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                    <p className='text-slate-400'>No education added yet.</p>
                    <p className="text-sm text-slate-500">Click "Add Education" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((education, index) => (
                        <div key={index} className="p-4 glass-card rounded-lg space-y-3 border border-white/5">
                            <div className='flex justify-between items-start'>
                                <h4 className='text-slate-200 font-medium'>Education #{index + 1}</h4>
                                <button onClick={() => removeEducation(index)} className='text-pink-500 hover:text-pink-400 transition-colors p-1 hover:bg-pink-500/10 rounded'>
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>

                                <input value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} type="text" placeholder="Institution Name" className="glass-input px-3 py-2 text-sm" />

                                <input value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree (e.g., Bachelor's, Master's)" className="glass-input px-3 py-2 text-sm" />

                                <input value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} type="text" className="glass-input px-3 py-2 text-sm" placeholder="Field of Study" />

                                <input value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} type="month" className="glass-input px-3 py-2 text-sm dark-scheme-input" />
                            </div>

                            <input value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} type="text" className="glass-input px-3 py-2 text-sm" placeholder="GPA (optional)" />

                        </div>
                    ))}
                </div>
            )}
            <style>{`
        .dark-scheme-input {
          color-scheme: dark;
        }
      `}</style>
        </div>
    )
}

export default EducationForm
