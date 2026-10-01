"use client"

const SaveChangesButton = ({ label = "حفظ التغييرات", onClick, loading = false, disabled = false }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
            className="w-full max-w-[473px] h-[60px] bg-[#1E4C6F] hover:bg-[#163a55] active:scale-[0.99] text-white font-semibold text-lg rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <span>{label}</span>
            )}
        </button>
    )
}

export default SaveChangesButton
