import ClientLayout from "@/components/layout";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ClientLayout>{children}</ClientLayout>
    </Suspense>
  );
}
