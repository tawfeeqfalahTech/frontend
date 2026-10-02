"use client"
const SaveChangesButton = ({ label = "حفظ التغييرات", onClick, loading = false, disabled = false, compact = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className="bg-[#1E4C6F] w-85 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300">
            {loading ? (
                <div className={compact ? "w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" : "w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"} />
            ) : (
                <span>{label}</span>
            )}
        </button>
    )
}

export default SaveChangesButton
