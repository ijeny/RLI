import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { EmailPasswordForm } from "@/components/auth/email-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const next = params.next?.startsWith("/") && !params.next.startsWith("//")
    ? params.next
    : "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950/5 p-6">
      <Card className="w-full max-w-lg border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl">
        <CardHeader>
          <Badge className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700">
            Tahap 2: Kredensial Mandiri Aktif
          </Badge>
          <CardTitle className="pt-3">
            Authentication Gateway
          </CardTitle>
          <CardDescription>
            Masuk dengan email atau gunakan NIM untuk identitas mahasiswa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailPasswordForm next={next} />
        </CardContent>
      </Card>
    </main>
  );
}
