"use client";

import { Button } from "@/components/ui/button/button";
import { Database, Server, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function BootstrapDemoActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => {
          toast.success("Baseline app is running.", {
            description: "UI atoms + sonner are wired and interactive.",
            icon: <ShieldCheck className="h-4 w-4" />,
          });
        }}
      >
        Verify UI baseline
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          toast("Server data layer baseline", {
            description:
              "Server Components + Server Actions tracer slice can start.",
            icon: <Server className="h-4 w-4" />,
          });
        }}
      >
        Verify server baseline
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast("Database baseline", {
            description: "Drizzle + Supabase dependencies are installed.",
            icon: <Database className="h-4 w-4" />,
          });
        }}
      >
        Verify db baseline
      </Button>
    </div>
  );
}
