import { AdminGate } from "../AdminGate";

/** One login + one nav shared by every admin tab (Referrals, Usage). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
