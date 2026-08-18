import { BellIcon } from "@/icons/BellIcon"
import { ChatIcon } from "@/icons/ChatIcon"
import { Bell, MessageCircleMoreIcon } from "lucide-react"
import Image from "next/image"

const OwnerNavbar = () => {
    const route = "الرئيسية"
    return (
        <div className="h-15 mr-55 max-[660px]:mr-0 flex items-center justify-between px-5 bg-white border-b border-slate-200">
            <div>
                <h1 className="font-semibold text-lg">
                    لوحة التحكم/
                    <span className="text-[#1E4C6F] font-bold">{route}</span>
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <MessageCircleMoreIcon className="w-5 h-5" />
                <div className="relative">
                    <span className="absolute top-0 right-0.75 bg-red-500 w-2.25 h-2.25 block rounded-full border-2 border-white" />
                    <Bell className="w-5.5 h-5.5" />
                </div>

                <Image
                    width={30}
                    height={30}
                    unoptimized
                    src="/images/avatar.png"
                    className="object-cover rounded-full cursor-pointer w-9 h-9 border border-slate-300 shadow-sm"
                    alt="avatar"
                />
            </div>
        </div>
    )
}

export default OwnerNavbar