import { X } from 'lucide-react'
import React from 'react'

const StepThree = ({ formData, setFormData, errors = {} }) => {
    // 1. تحديث بيانات عضو محدد
    const handleMemberChange = (index, field, value) => {
        setFormData?.((prev) => {
            const updatedTeam = [...(prev.team || [])];
            updatedTeam[index] = { ...updatedTeam[index], [field]: value };
            return { ...prev, team: updatedTeam };
        });
    };

    // 2. إضافة عضو جديد
    const handleAddMember = () => {
        setFormData?.((prev) => ({
            ...prev,
            team: [...(prev.team || []), { name: '', role: '' }]
        }));
    };

    // 3. حذف عضو
    const handleRemoveMember = (index) => {
        setFormData?.((prev) => ({
            ...prev,
            team: prev.team.filter((_, i) => i !== index)
        }));
    };
    return (
        <main>
            <div>
                <section>

                    <label htmlFor="team" className="font-bold text-slate-800 text-">أعضاء الفريق</label>
                    {formData.team.map((member, index) => (
                        <div key={index} className='flex items-center gap-3 mt-2'>
                            <input
                                id="name"
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                type="text"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                                placeholder="الإسم"
                            />
                            <input
                                id="title"
                                value={member.role}
                                onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                                type="text"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                                placeholder="الدور"
                            />
                            {formData?.team.length > 1 && (
                                <button onClick={() => handleRemoveMember(index)} className='p-2.5 flex items-center justify-center border border-slate-200 shadow-sm rounded-xl'>
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={() => handleAddMember()} className="bg-[#1E4C6F] mt-4 flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300">
                        إضافة عضو
                    </button>
                </section>
                <hr className='block my-3 text-gray-300' />
                <section>
                    <h3 className="font-bold text-slate-800 text-">الميزانية المطلوبة</h3>
                    <div className='flex items-center justify-between gap-3 mt-3'>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="minBudget" className="font-seminbold text-slate-800 text-">الحد الأدنى للتمويل $</label>

                            <input
                                id="minBudget"
                                value={formData?.minBudget}
                                onChange={(e) =>
                                    setFormData?.((prev) => ({
                                        ...prev,
                                        minBudget: e.target.value,
                                    }))
                                }
                                type="number"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                                placeholder="1,000$"
                            />
                            {errors.minBudget && <p className="form-error text-xs font-medium text-red-500">{errors.minBudget}</p>}
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="maxBudget" className="font-seminbold text-slate-800 text-">الحد الأقصى للتمويل</label>

                            <input
                                id="maxBudget"
                                value={formData?.maxBudget}
                                onChange={(e) =>
                                    setFormData?.((prev) => ({
                                        ...prev,
                                        maxBudget: e.target.value,
                                    }))
                                }
                                type="number"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                                placeholder="10,000$"
                            />
                            {errors.maxBudget && <p className="form-error text-xs font-medium text-red-500">{errors.maxBudget}</p>}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default StepThree