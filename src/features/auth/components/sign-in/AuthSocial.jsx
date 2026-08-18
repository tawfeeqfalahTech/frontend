import GithubIcon from '@/icons/GithubIcon'
import GoogleIcon from '@/icons/GoogleIcon'
import LinkedIcon from '@/icons/LinkedIcon'

const AuthSocial = () => {
    return (
        <div>
            <div className="py-4 relative w-full flex items-center">
                <div className="grow border-t border-gray-400" />

                <span className="shrink mx-2 text-xs font-bold tracking-widest text-slate-700 uppercase select-none">
                    أو عبر
                </span>

                <div className="grow border-t border-gray-400" />
            </div>
            <div className="flex items-center gap-3 w-full">
                <button className="w-full bg-white text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-lg h-11 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-300 active:scale-95">
                    <LinkedIcon className="w-5 h-5" />
                </button>
                <button className="w-full bg-white hover:bg-gray-200 rounded-lg h-11 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-300 active:scale-95">
                    <GoogleIcon className="w-5 h-5" />
                </button>
                <button className="w-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white rounded-lg h-11 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-300 active:scale-95">
                    <GithubIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default AuthSocial