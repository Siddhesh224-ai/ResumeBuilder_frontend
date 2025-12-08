import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Sleek design with strategic use of color and modern font choices"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Minimal design with a single image and clean typography"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean design that puts your content front and center"
        },
    ]
    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='glass-button-secondary flex items-center gap-1 text-sm bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 px-3 py-2 rounded-lg'>
                <Layout size={14} /> <span className='max-sm:hidden'>Template</span>
            </button>
            {isOpen && (
                <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-20 glass-panel rounded-lg border border-white/10'>
                    {templates.map((template) => (
                        <div key={template.id} onClick={() => { onChange(template.id); setIsOpen(false) }} className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ?
                            "border-violet-500 bg-violet-500/20"
                            : "border-white/5 hover:border-white/10 hover:bg-white/5"
                            }`}>
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2">
                                    <div className='size-5 bg-violet-500 rounded-full flex items-center justify-center'>
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <h4 className='font-medium text-slate-200'>{template.name}</h4>
                                <div className='mt-2 p-2 bg-slate-900/50 rounded text-xs text-slate-400 italic'>{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TemplateSelector
