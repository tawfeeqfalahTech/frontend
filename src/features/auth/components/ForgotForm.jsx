import { InboxIcon } from "lucide-react"

const ForgotForm = () => {
    return (
        <form>
            <div className="relative">
                <InboxIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                <input type="email" className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5" placeholder="البريد الالكتروني" />
            </div>
            <button className="bg-[#1E4C6F] w-full mt-4 text-white text-lg py-2 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">إرسال رمز التحقق</button>
        </form>
    )
}

export default ForgotForm