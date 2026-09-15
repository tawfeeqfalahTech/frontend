import Image from "next/image"

const page = () => {
    return (
        <main className="">
            <div>
                <Image
                    width={30}
                    height={30}
                    unoptimized
                    src="/images/avatar.png"
                    className="object-cover rounded-full cursor-pointer w-9 h-9 border border-slate-300 shadow-sm hover:opacity-90 transition-opacity"
                    alt="avatar"
                />
            </div>
        </main>
    )
}

export default page