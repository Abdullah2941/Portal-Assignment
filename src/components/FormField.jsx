import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function FormField({
  label,
  required = false,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <label className="block mb-4">
      <span className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <div className="relative mt-1.5">
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg bg-blue-50/60 border border-transparent focus:border-brand-light focus:bg-white outline-none px-4 py-2.5 text-slate-700 placeholder:text-slate-400 transition"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </label>
  )
}
