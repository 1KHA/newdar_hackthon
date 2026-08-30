"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HASHTAG = "#جائزة_مايدة";

/*
 * "اكتشف أكثر" button for the audience-vote prize. Opens a small dialog that
 * explains how to win and lets the visitor copy the hashtag. The dialog is
 * portalled to <body> because the prizes section uses fixed coordinates.
 */
export default function VotePrizeInfo() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(HASHTAG);
      setCopied(true);
    } catch {
      /* clipboard unavailable — the hashtag is still selectable */
    }
  };

  return (
    <>
      <button type="button" className="dhl-vote-btn" onClick={() => setOpen(true)}>
        اكتشف أكثر
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div className="dhl-vd" role="dialog" aria-modal="true" aria-labelledby="dhl-vd-title" dir="rtl" onClick={close}>
            <div className="dhl-vd-panel" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="dhl-vd-close" aria-label="إغلاق" onClick={close}>
                <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <span className="dhl-vd-badge" aria-hidden="true">
                <span className="dhl-vd-diamond" />
              </span>

              <h3 id="dhl-vd-title" className="dhl-vd-title">جائزة تصويت الجمهور</h3>
              <p className="dhl-vd-amount">5,000 ريال سعودي</p>

              <p className="dhl-vd-text">
                شاركي رحلتك خلال هاكاثون الابتكار عبر هاشتاق
                <button type="button" className={`dhl-vd-tag${copied ? " is-copied" : ""}`} onClick={copyHashtag} title="نسخ الهاشتاق">
                  <span>{HASHTAG}</span>
                  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {copied ? (
                      <path d="M5 12l5 5L20 7" />
                    ) : (
                      <>
                        <rect x="9" y="9" width="11" height="11" rx="2" />
                        <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                      </>
                    )}
                  </svg>
                </button>
                وكوني أقرب للفوز بجائزة تصويت الجمهور
              </p>

              <p className="dhl-vd-hint" aria-live="polite">
                {copied ? "تم نسخ الهاشتاق" : "اضغطي على الهاشتاق لنسخه"}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
