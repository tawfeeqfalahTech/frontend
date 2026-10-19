"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, TriangleAlert } from "lucide-react";
import { requestInvestmentTypes } from "./data";
import styles from "./InvestorRequests.module.css";

export default function InterestRequestDialog({ action, onClose, onConfirm }) {
    const dialogRef = useRef(null);
    const [message, setMessage] = useState("");
    const [investmentType, setInvestmentType] = useState("");
    const cancel = action.type === "cancel";

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog.open) dialog.showModal();
        return () => dialog.close();
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if (!cancel && !message.trim()) {
            const field = event.currentTarget.elements.message;
            field.setCustomValidity("اكتب رسالتك لمالك المشروع.");
            field.reportValidity();
            return;
        }
        onConfirm(cancel ? undefined : { message: message.trim(), type: investmentType });
    };

    return <dialog
        ref={dialogRef}
        dir="rtl"
        aria-labelledby="interest-request-title"
        aria-describedby="interest-request-description"
        className={`${styles.dialog} ${styles.interestDialog} ${cancel ? styles.cancelDialog : ""}`}
        onCancel={onClose}
        onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
        <form onSubmit={submit} className={styles.interestForm}>
            <header className={styles.interestHeader}>
                <div>
                    <h2 id="interest-request-title">{cancel ? "هل أنت متأكد من إلغاء طلب الاهتمام؟" : "إرسال طلب اهتمام جديد"}</h2>
                    <p id="interest-request-description">{cancel ? "سيتم إرسال إشعار لمالك الفكرة بعملية إلغاء طلب الاهتمام" : "سيتم إرسال إشعار لمالك الفكرة"}</p>
                </div>
                {cancel && <span className={styles.cancelIcon}><TriangleAlert size={17} aria-hidden="true" /></span>}
            </header>
            {!cancel && <div className={styles.interestFields}>
                <div>
                    <label htmlFor="interest-message">رسالة لمالك المشروع</label>
                    <textarea
                        id="interest-message"
                        name="message"
                        value={message}
                        onChange={(event) => {
                            event.target.setCustomValidity("");
                            setMessage(event.target.value);
                        }}
                        placeholder="اكتب رسالتك هنا..."
                        maxLength={500}
                        required
                        autoFocus
                        aria-describedby="interest-message-count"
                    />
                    <p id="interest-message-count" dir="ltr" className={styles.messageCount}>{message.length}/500</p>
                </div>
                <div>
                    <label htmlFor="interest-investment-type">نوع الاستثمار</label>
                    <div className={styles.investmentSelect}>
                        <select id="interest-investment-type" name="investmentType" value={investmentType} onChange={(event) => setInvestmentType(event.target.value)} required>
                            <option value="" disabled>اختر استثمارك</option>
                            {requestInvestmentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <ChevronDown size={16} aria-hidden="true" />
                    </div>
                </div>
            </div>}
            <footer className={styles.interestActions}>
                <button type="submit" className={styles.confirmInterest}>{cancel ? "تأكيد" : "تأكيد القبول"}</button>
                <button type="button" autoFocus={cancel} className={styles.dismissInterest} onClick={onClose}>إلغاء</button>
            </footer>
        </form>
    </dialog>;
}
