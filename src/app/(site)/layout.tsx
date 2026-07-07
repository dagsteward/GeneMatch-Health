import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingAiButton } from "@/components/FloatingAiButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <FloatingAiButton />
    </>
  );
}
