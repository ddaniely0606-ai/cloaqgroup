import type { Metadata } from "next";
import ContractForm from "./ContractForm";

export const metadata: Metadata = {
  title: "הסכם שותפות — CloaqGroup",
  description: "הסכם שותפות עסקית רשמי בין שותפי CloaqGroup",
  robots: "noindex, nofollow",
};

export default function ContractPage() {
  return (
    <main className="min-h-screen bg-[#050508]" dir="rtl">
      <ContractForm />
    </main>
  );
}
