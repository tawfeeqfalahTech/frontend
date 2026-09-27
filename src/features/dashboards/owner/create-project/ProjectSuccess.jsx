import React from 'react';

const ProjectSuccess = ({ onContinue }) => {
    return (
        <main className="flex flex-col items-center justify-center px-4 text-center">
            {/* Container للصورة لمنع التمدد غير المرغوب */}
            <div className="w-55 md:w-80 flex justify-center items-center">
                <img
                    src="/images/project-success.png"
                    alt="تم نشر المشروع بنجاح"
                    className="w-full h-auto object-contain select-none"
                />
            </div>

            {/* العنوان الرئيسي */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-6">
                تم نشر مشروعك بنجاح
            </h2>

            {/* الوصف */}
            <p className="text-slate-600 text-sm md:text-base font-medium mt-2 max-w-sm leading-relaxed">
                سيتم تقييم المشروع وعرضه قريبًا على المستثمرين
            </p>

            {/* زر الاستمرار */}
            <button
                onClick={onContinue}
                className="mt-4 bg-[#1E4C6F] hover:bg-[#163852] text-white text-base font-semibold px-12 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
                الإستمرار
            </button>
        </main>
    );
};

export default ProjectSuccess;