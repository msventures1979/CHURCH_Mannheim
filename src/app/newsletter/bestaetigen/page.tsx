import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ConfirmForm from "./ConfirmForm";

export const metadata: Metadata = {
  title: "Newsletter bestätigen — CHURCH. Mannheim",
  robots: { index: false, follow: false },
};

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center px-6 pb-24 pt-36 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-2xl text-center">
          <ConfirmForm token={token} />
        </div>
      </main>
      <Footer hideNewsletter />
    </div>
  );
}
