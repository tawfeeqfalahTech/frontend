"use client";

export default function Error({ retry }) {
  return (
    <main dir="rtl" className="m-auto max-w-lg p-6 text-center text-[#0D202F]">
      <h1 className="text-xl font-bold">تعذر تحميل الصفحة</h1>
      <p role="alert" className="my-4 text-sm leading-7 text-[#4B708C]">
        حدث خطأ أثناء الاتصال بالخدمة. يرجى المحاولة مجددًا.
      </p>
      <button type="button" onClick={retry} className="rounded-xl bg-[#1E4C6F] px-5 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4">
        إعادة المحاولة
      </button>
    </main>
  );
}
