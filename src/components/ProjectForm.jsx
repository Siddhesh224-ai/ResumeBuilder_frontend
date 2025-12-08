import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-white'> Projects </h3>
                    <p className='text-sm text-slate-400'>Add your projects</p>
                </div>
                <button onClick={addProject} className='glass-button-secondary flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-slate-700/50 transition-colors'>
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>


            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className="p-4 glass-card rounded-lg space-y-3 border border-white/5">
                        <div className='flex justify-between items-start'>
                            <h4 className='text-slate-200 font-medium'>Project #{index + 1}</h4>
                            <button onClick={() => removeProject(index)} className='text-pink-500 hover:text-pink-400 transition-colors p-1 hover:bg-pink-500/10 rounded'>
                                <Trash2 className="size-4" />
                            </button>
                        </div>

                        <div className='grid gap-3'>

                            <input value={project.name || ""} onChange={(e) => updateProject(index, "name", e.target.value)} type="text" placeholder="Project Name" className="glass-input px-3 py-2 text-sm" />

                            <input value={project.type || ""} onChange={(e) => updateProject(index, "type", e.target.value)} type="text" placeholder="Project Type" className="glass-input px-3 py-2 text-sm" />

                            <textarea rows={4} value={project.description || ""} onChange={(e) => updateProject(index, "description", e.target.value)} placeholder="Describe your project..." className="glass-input w-full px-3 py-2 text-sm resize-none" />

                        </div>


                    </div>
                ))}
            </div>

        </div>
    )
}

export default ProjectForm
