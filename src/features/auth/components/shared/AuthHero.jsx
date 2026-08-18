import Image from "next/image";

export default function AuthHero() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
                src="/images/background_auth.jpeg"
                alt="Ihyaa Auth Background"
                fill
                priority
                unoptimized
                className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#1E4C6F]/75 via-[#1E4C6F]/40 via-40% to-transparent" />
        </div>
    );
}