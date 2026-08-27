import type { Metadata } from "next";
import Landing from "./landing/Landing";

/*
 * Home page. Renders the coded landing page (src/app/landing), which stays a
 * self-contained, portable folder; this file is only the route + SEO wrapper.
 * The previous image-based home page now lives at /legacy-home (noindex).
 */

export const metadata: Metadata = {
  title: "جائزة مايدة محي الدين ناظر للابتكار 4",
  description:
    "تحدي يجمع طالبات الجامعات السعودية لاستكشاف وتوظيف الابتكارات الجامعية. توفر جائزة مايدة محي الدين ناظر للابتكار هاكاثون الابتكار، فرصة للعمل ضمن فرق تنافسية للعمل على تطوير حلول مبتكرة تسهم في تعزيز الاستدامة وجودة الحياة",
};

/* Event rich-result data, carried over from the old home page (it used to be
   injected client-side; served in the HTML now so crawlers always see it). */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "جائزة مايدة محي الدين ناظر للابتكار 4",
  description:
    "تحدي يجمع طالبات الجامعات السعودية لاستكشاف وتوظيف الابتكارات الجامعية. توفر جائزة مايدة محي الدين ناظر للابتكار هاكاثون الابتكار، فرصة للعمل ضمن فرق تنافسية للعمل على تطوير حلول مبتكرة تسهم في تعزيز الاستدامة وجودة الحياة",
  organizer: {
    "@type": "Organization",
    name: "جامعة دار الحكمة",
    url: "https://dah.edu.sa",
  },
  location: {
    "@type": "Place",
    name: "جامعة دار الحكمة",
    address: {
      "@type": "PostalAddress",
      addressLocality: "جدة",
      addressCountry: "SA",
    },
  },
  keywords: [
    "جائزة مايدة محي الدين ناظر للابتكار",
    "جائزة مايدة",
    "هاكاثون الابتكار",
    "دار الحكمة",
    "جامعة دار الحكمة",
    "الاستدامة",
    "جودة الحياة",
  ],
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  startDate: "2026-10-04T16:00:00+03:00",
  endDate: "2026-10-08T21:00:00+03:00",
  image: "https://mayda-four.dyam.tech/og.png",
  url: "https://mayda-four.dyam.tech/",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Landing />
    </>
  );
}
