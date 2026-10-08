import EyeSlashIcon from '@/icons/EyeSlashIcon'
import { EyeIcon } from 'lucide-react'

export default function AuthInput({ id, label, icon: Icon, error, showPassword, onTogglePassword, ...props }) {
    return (
        <div>
            <div className="relative">
                <Icon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                <input
                    {...props}
                    id={id}
                    aria-label={label}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    placeholder={label}
                    className={`bg-white font-semibold w-full outline-none border-2 rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 pl-10 disabled:opacity-60 [::-ms-reveal]:hidden [::-ms-clear]:hidden ${error ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#5FABF8]'}`}
                />
                {onTogglePassword && (
                    <button type="button" disabled={props.disabled} onClick={onTogglePassword}
                        aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                        aria-pressed={showPassword}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-[#5FABF8]">
                        {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                )}
            </div>
            {error && <p id={`${id}-error`} role="alert" className="text-red-600 text-xs mt-0.5 leading-4">{error}</p>}
        </div>
    )
}
