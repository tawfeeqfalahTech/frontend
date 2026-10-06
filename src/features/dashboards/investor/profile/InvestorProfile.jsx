"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banknote, BookUser, Camera, Check, CircleAlert, Link2, LockKeyhole, Plus, UserRound, X } from "lucide-react";
import GithubIcon from "@/icons/GithubIcon";
import LinkedIcon from "@/icons/LinkedIcon";
import useInvestorProfile from "./useInvestorProfile";

const sectors = ["Fintech", "EdTech", "HealthTech", "E-commerce", "SaaS"];
const types = ["استثمار ملائكي", "رأس مال جريء", "استثمار فردي", "صندوق استثماري"];
const linkFields = [
  { key: "website", label: "الموقع الإلكتروني", Icon: Link2 },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedIcon },
  { key: "github", label: "GitHub", Icon: GithubIcon },
];
const inputClass = "w-full rounded-xl bg-white px-3 py-3 text-sm text-[#1E4C6F] shadow-[0_0_15px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40 placeholder:text-gray-400";
const primaryClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E4C6F] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]";

function Card({ title, description, children }) {
  return <section className="rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.045)] sm:p-6">
    <h2 className="border-s-4 border-[#1E4C6F] ps-2 text-lg font-bold text-[#163852]">{title}</h2>
    <p className="mt-1 text-xs leading-6 text-gray-400">{description}</p>
    <div className="mt-3">{children}</div>
  </section>;
}

function ProfileHeader({ profile, email, editing, onChange, onAvatar, preview, onPreview }) {
  return <header className="mb-8 flex flex-wrap items-center justify-between gap-6">
    <div className="flex min-w-0 items-center gap-5">
      <div className="relative size-28 shrink-0 sm:size-32">
        <div className="relative size-full overflow-hidden rounded-full ring-2 ring-[#B19971] ring-offset-4">
          <Image src={profile.avatar} alt={`الصورة الشخصية: ${profile.name}`} fill unoptimized priority className="object-cover" />
        </div>
        {editing && <label className="absolute bottom-0 start-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#1E4C6F] shadow-md ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-[#1E4C6F]">
          <Camera size={17} /><input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="تغيير الصورة الشخصية" onChange={onAvatar} />
        </label>}
      </div>
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {editing ? <input aria-label="الاسم الكامل" maxLength={100} required value={profile.name} onChange={(event) => onChange("name", event.target.value)} className="w-full max-w-64 rounded-lg bg-transparent text-2xl font-bold text-[#163852] outline-none focus:ring-2 focus:ring-[#1E4C6F]/30 sm:text-3xl" /> : <h1 className="break-words text-2xl font-bold text-[#163852] sm:text-3xl">{profile.name}</h1>}
          <span className="rounded-full bg-[#F1F2F3] px-2 py-0.5 text-xs text-[#1E4C6F]">مستثمر</span>
        </div>
        {!preview && email && <p className="flex items-center gap-2 text-xs text-gray-500"><LockKeyhole size={14} /><span dir="ltr" className="truncate">{email}</span></p>}
        {!preview && <p className="text-xs text-gray-400">معلومات خاصة لا تظهر للآخرين، لإدارة حسابك واستخدام المنصة</p>}
      </div>
    </div>
    {editing ? <button type="button" className={primaryClass} onClick={onPreview}><UserRound size={16} />معاينة كما يراه الآخرون</button> : preview ? <button type="button" className={primaryClass} onClick={onPreview}>العودة للتعديل</button> : <Link href="/dashboard/investor/profile/edit" className={primaryClass}>تعديل</Link>}
  </header>;
}

function ProfileContent({ profile, editing, update, errors }) {
  const money = (value) => value === "" ? "غير محدد" : `${Number(value).toLocaleString("en-US")} ر.س`;
  return <div className="grid items-stretch gap-5 md:grid-cols-2">
    <Card title="التركيز الاستثماري" description="حدد مجال الاستثمار ونطاق التمويل المعتاد">
      {editing ? <div className="space-y-4">
        <div><label htmlFor="investment-type" className="mb-2 block text-xs text-[#163852]">المجال</label><select id="investment-type" className={inputClass} value={profile.investmentType} onChange={(e) => update("investmentType", e.target.value)}><option value="">اختر نوع الاستثمار</option>{types.map((type) => <option key={type}>{type}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-3">{[{ key: "minInvestment", label: "الحد الأدنى للتمويل" }, { key: "maxInvestment", label: "الحد الأقصى للتمويل" }].map(({ key, label }) => <div key={key}>
          <label htmlFor={key} className="mb-2 block text-xs text-[#163852]">{label}</label>
          <div className="relative"><Banknote size={17} className="pointer-events-none absolute start-3 top-3.5 text-[#163852]" /><input id={key} type="number" min="0" step="1" value={profile[key]} onChange={(e) => update(key, e.target.value)} placeholder="أدخل المبلغ" className={`${inputClass} ps-10`} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} /></div>
          {errors[key] && <p id={`${key}-error`} className="mt-1 text-xs text-red-500">{errors[key]}</p>}
        </div>)}</div>
      </div> : <><dl className="grid grid-cols-3 gap-2">{[{ title: "الحد الأدنى", value: money(profile.minInvestment) }, { title: "الحد الأعلى", value: money(profile.maxInvestment) }, { title: "المجال", value: profile.investmentType || "غير محدد" }].map((item) => <div key={item.title} className="rounded-lg bg-[#E9EDF1] p-3"><dt className="text-xs text-gray-500">{item.title}</dt><dd className="mt-1 text-sm font-semibold text-[#163852]">{item.value}</dd></div>)}</dl><p className="mt-3 text-xs leading-6 text-gray-400">أعمل بمرونة مع المشاريع الواعدة في مراحلها المبكرة للنمو</p></>}
    </Card>
    <Card title="نبذة عني" description="عرّف بالمجالات التي تهمك وطريقة دعمك للمشاريع">
      {editing ? <><label htmlFor="investor-bio" className="mb-2 block text-xs text-[#163852]">النبذة</label><div className="relative"><BookUser size={17} className="pointer-events-none absolute start-3 top-3 text-[#163852]" /><textarea id="investor-bio" maxLength={2000} rows={4} value={profile.bio} onChange={(e) => update("bio", e.target.value)} placeholder="اكتب عن خبراتك واهتماماتك الاستثمارية وكيف تدعم المشاريع في النمو" className={`${inputClass} resize-y ps-10`} /></div><p className="mt-2 text-left text-xs text-gray-400" dir="ltr">{profile.bio.length}/2000</p></> : <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#163852]">{profile.bio || "لم تتم إضافة نبذة بعد"}</p>}
    </Card>
    <Card title="روابط التواصل" description={editing ? "أضف روابطك المهنية والعامة" : "تواصل معي من خلال حساباتي المهنية"}>
      {editing ? <div className="grid gap-3 sm:grid-cols-3">{linkFields.map(({ key, label, Icon }) => <div key={key}><label htmlFor={`link-${key}`} className="sr-only">{label}</label><div className="relative"><Icon className="pointer-events-none absolute start-3 top-3 size-5 text-[#163852]" /><input id={`link-${key}`} type="url" dir="ltr" value={profile.links[key]} placeholder={key === "website" ? "https://example.com" : `https://${key}.com/username`} onChange={(e) => update("links", { ...profile.links, [key]: e.target.value })} className={`${inputClass} bg-[#F5F5F5] ps-10 pe-7 text-left text-xs`} aria-invalid={Boolean(errors[key])} />{profile.links[key] && <button type="button" aria-label={`حذف رابط ${label}`} onClick={() => update("links", { ...profile.links, [key]: "" })} className="absolute end-2 top-3 text-gray-400 hover:text-red-500"><X size={16} /></button>}</div>{errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}</div>)}</div> : <div className="flex flex-wrap gap-3">{linkFields.filter(({ key }) => /^https?:\/\//i.test(profile.links[key])).map(({ key, label, Icon }) => <a key={key} href={profile.links[key]} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="flex size-10 items-center justify-center rounded-full bg-[#F1F2F3] text-[#163852] hover:bg-[#E9EDF1]"><Icon className="size-5" /></a>)}{!linkFields.some(({ key }) => /^https?:\/\//i.test(profile.links[key])) && <p className="text-sm text-gray-400">لم تتم إضافة روابط بعد</p>}</div>}
    </Card>
    <Card title="القطاعات المفضلة" description={editing ? "اختر القطاعات الأقرب إلى اهتماماتك" : "المجالات التي تهمني للاستثمار"}>
      <div className="flex flex-wrap gap-2" dir="ltr">{(editing ? sectors : profile.sectors).map((sector) => editing ? <button key={sector} type="button" aria-pressed={profile.sectors.includes(sector)} onClick={() => update("sectors", profile.sectors.includes(sector) ? profile.sectors.filter((item) => item !== sector) : [...profile.sectors, sector])} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-colors ${profile.sectors.includes(sector) ? "bg-[#E9EDF1] text-[#163852]" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{profile.sectors.includes(sector) ? <Check size={13} /> : <Plus size={13} />}{sector}</button> : <span key={sector} className="rounded-lg bg-[#E9EDF1] px-3 py-2 text-xs text-[#163852]">{sector}</span>)}</div>
      {!editing && profile.sectors.length === 0 && <p className="text-sm text-gray-400">لم يتم تحديد القطاعات بعد</p>}
    </Card>
  </div>;
}

export default function InvestorProfile({ editing = false }) {
  const { profile, save, email } = useInvestorProfile();
  return <ProfilePage key={`${editing}:${JSON.stringify(profile)}`} initialProfile={profile} save={save} email={email} editing={editing} />;
}

function ProfilePage({ initialProfile, save, email, editing }) {
  const [draft, setDraft] = useState(initialProfile);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const typeRef = useRef(null);
  const router = useRouter();
  const update = (key, value) => { setDraft((previous) => ({ ...previous, [key]: value })); setErrors({}); setMessage(""); };
  const complete = draft.investmentType && draft.minInvestment !== "" && draft.maxInvestment !== "" && draft.bio.trim() && draft.sectors.length;

  async function changeAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) { setMessage("اختر صورة PNG أو JPEG أو WebP بحجم لا يتجاوز 2 ميجابايت"); return; }
    try {
      const imageData = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
      update("avatar", imageData);
    } catch { setMessage("تعذرت قراءة الصورة، حاول مجددًا"); }
  }

  function handleSave(event) {
    event.preventDefault();
    const nextErrors = {};
    for (const key of ["minInvestment", "maxInvestment"]) {
      if (draft[key] === "") nextErrors[key] = "يرجى إدخال قيمة رقمية";
      else if (!Number.isSafeInteger(Number(draft[key])) || Number(draft[key]) < 0) nextErrors[key] = "أدخل مبلغًا صحيحًا لا يقل عن صفر";
    }
    if (!nextErrors.minInvestment && !nextErrors.maxInvestment && Number(draft.maxInvestment) < Number(draft.minInvestment)) nextErrors.maxInvestment = "الحد الأقصى يجب ألا يقل عن الحد الأدنى";
    for (const { key } of linkFields) {
      if (!draft.links[key]) continue;
      try { const url = new URL(draft.links[key]); if (!["http:", "https:"].includes(url.protocol)) throw new Error(); } catch { nextErrors[key] = "أدخل رابطًا صحيحًا يبدأ بـ https://"; }
    }
    if (!draft.name.trim()) { setMessage("يرجى إدخال الاسم الكامل"); return; }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setMessage("يرجى تصحيح الحقول المحددة قبل الحفظ"); return; }
    try { save({ ...draft, name: draft.name.trim(), bio: draft.bio.trim() }); router.push("/dashboard/investor/profile"); } catch { setMessage("تعذر حفظ البيانات محليًا. تحقق من مساحة التخزين وإعدادات المتصفح"); }
  }

  return <div dir="rtl" className="mx-auto w-full max-w-5xl py-5 text-[#163852] sm:px-4 sm:py-8">
    <form onSubmit={handleSave} noValidate>
      <ProfileHeader profile={draft} email={email} editing={editing && !preview} onChange={update} onAvatar={changeAvatar} preview={preview} onPreview={() => setPreview((value) => !value)} />
      {editing && !preview && !complete && <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#FFF4E4] px-4 py-3 text-sm"><p className="flex items-center gap-2"><CircleAlert size={17} />أكمل ملفك لزيادة فرص اهتمام المشاريع المناسبة بمجال استثمارك</p><button type="button" className={primaryClass} onClick={() => typeRef.current?.querySelector("select")?.focus()}>إكمال الملف</button></div>}
      <div ref={typeRef}><ProfileContent profile={draft} editing={editing && !preview} update={update} errors={errors} /></div>
      {message && <p role="alert" className="mt-4 text-sm text-red-600">{message}</p>}
      {editing && !preview ? <footer className="mt-5 flex flex-wrap items-center gap-3"><button type="submit" className={primaryClass}>حفظ التغييرات</button><Link href="/dashboard/investor/profile" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1E4C6F] px-8 text-sm font-semibold text-[#1E4C6F] hover:bg-gray-50">إلغاء</Link><p className="text-xs text-gray-400">لن تظهر التغييرات للآخرين قبل الحفظ</p></footer> : <p className="mt-5 flex items-center gap-2 text-xs text-gray-400"><CircleAlert size={14} />{preview ? "هذه معاينة للملف العام قبل الحفظ" : "يساعد اكتمال الملف في تحسين التواصل مع المشاريع"}</p>}
    </form>
  </div>;
}
