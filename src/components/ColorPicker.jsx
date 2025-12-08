import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" }
  ]

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)} className='glass-button-secondary flex items-center gap-1 text-sm bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 px-3 py-2 rounded-lg'>
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>
      {isOpen && (
        <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-20 glass-panel rounded-lg border border-white/10'>
          {colors.map((color) => (
            <div key={color.value} className='relative cursor-pointer group flex flex-col' onClick={() => { onChange(color.value); setIsOpen(false) }}>
              <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-white/50 transition-colors" style={{ backgroundColor: color.value }}>
              </div>
              {selectedColor === color.value && (
                <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                  <Check className="size-5 text-white drop-shadow-md" />
                </div>
              )}
              <p className='text-xs text-center mt-1 text-slate-300'>{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
