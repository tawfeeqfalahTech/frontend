export function validateAuthForm(values, isRegister = false) {
    const errors = {};
    if (isRegister && !values.name.trim()) errors.name = "يرجى إدخال الاسم الكامل.";
    if (!values.email.trim()) errors.email = "يرجى إدخال البريد الإلكتروني.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    if (!values.password) errors.password = "يرجى إدخال كلمة المرور.";
    if (isRegister) {
        if (!values.password_confirmation) errors.password_confirmation = "يرجى تأكيد كلمة المرور.";
        else if (values.password !== values.password_confirmation) errors.password_confirmation = "تأكيد كلمة المرور غير مطابق.";
        if (!values.agree) errors.agree = "يجب الموافقة على الشروط والأحكام وسياسة الخصوصية.";
    }
    return errors;
}

export function getAuthErrors(data, status, fields) {
    const fieldErrors = {};
    const unassigned = [];
    for (const [field, messages] of Object.entries(data?.errors || {})) {
        const message = (Array.isArray(messages) ? messages : [messages])
            .filter((value) => typeof value === "string" && value.trim()).join(" ");
        if (!message) continue;
        if (fields.includes(field)) fieldErrors[field] = message;
        else unassigned.push(message);
    }
    const message = typeof data?.message === "string" ? data.message : "";
    if (status === 401 && fields.includes("password") && !Object.keys(fieldErrors).length) {
        fieldErrors.password = message || "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    }
    const fallback = status === 429
        ? "محاولات كثيرة. يرجى الانتظار ثم المحاولة مجدداً."
        : status >= 500
            ? "تعذر إتمام الطلب حالياً. يرجى المحاولة لاحقاً."
            : "تعذر إتمام الطلب. يرجى مراجعة البيانات والمحاولة مجدداً.";
    return {
        fieldErrors,
        formError: unassigned.length ? unassigned.join(" ") : Object.keys(fieldErrors).length ? "" : message || fallback,
    };
}
