import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Applicant = {
  _id: string;
  name: string;
  email: string;
  documentType?: string;
  documentNumber?: string;
  applicationDate?: string;
};

export default function Admin() {
  const [items, setItems] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/admin/pending-verifications");
    const json = await r.json();
    setItems(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id: string) {
    const r = await fetch(`/api/admin/approve/${id}`, { method: "POST" });
    if (r.ok) await load();
  }

  async function reject(id: string) {
    const r = await fetch(`/api/admin/reject/${id}`, { method: "POST" });
    if (r.ok) await load();
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Pending Verifications</h1>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-foreground/5">
            <tr>
              <th className="text-left px-4 py-2">Tourist Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Document Type</th>
              <th className="text-left px-4 py-2">Application Date</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-6" colSpan={5}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-6" colSpan={5}>No pending applications.</td></tr>
            ) : (
              items.map((a) => (
                <tr key={a._id} className="border-t border-white/10">
                  <td className="px-4 py-2">{a.name}</td>
                  <td className="px-4 py-2">{a.email}</td>
                  <td className="px-4 py-2 capitalize">{a.documentType ?? "-"}</td>
                  <td className="px-4 py-2">{a.applicationDate ? new Date(a.applicationDate).toLocaleString() : "-"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" onClick={() => approve(a._id)}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => reject(a._id)}>Reject</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
