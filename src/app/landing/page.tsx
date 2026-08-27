import type { Metadata } from "next";
import Landing from "./Landing";

export const metadata: Metadata = {
  title: "جائزة مايدة محي الدين ناظر للابتكار 4",
  description:
    "تحدي يجمع طالبات الجامعات السعودية لاستكشاف وتوظيف الابتكارات الجامعية. توفر جائزة مايدة محي الدين ناظر للابتكار هاكاثون الابتكار، فرصة للعمل ضمن فرق تنافسية للعمل على تطوير حلول مبتكرة تسهم في تعزيز الاستدامة وجودة الحياة",
};

export default function LandingPage() {
  return <Landing />;
}
