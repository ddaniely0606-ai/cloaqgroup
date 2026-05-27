import type { Metadata } from "next";
import ContractForm from "./ContractForm";

export const metadata: Metadata = {
  title: "הסכם שותפות — ורטקס מדיה",
  description: "הסכם שותפות עסקית רשמי בין שותפי ורטקס מדיה",
  robots: "noindex, nofollow",
};

export default function ContractPage() {
  return (
    <main className="min-h-screen bg-[#050508]" dir="rtl">
      <ContractForm />
    </main>
  );
}
