import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Parâmetro authorization_id ausente.");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error: detailsError } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (detailsError) return setError(detailsError.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error: decisionError } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (decisionError) {
      setBusy(false);
      return setError(decisionError.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("O servidor de autorização não retornou um redirecionamento.");
    }
    window.location.href = target;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0D] px-4">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur-sm border-border/50">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-[#C7A7FF] to-[#6EC8FF] flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6 text-background" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
            Autorizar acesso
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {details?.client?.name
              ? `${details.client.name} quer acessar o site como você.`
              : "Confirme a conexão do aplicativo."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!error && !details && (
            <p className="text-center text-muted-foreground">Carregando…</p>
          )}
          {details && !error && (
            <>
              <p className="text-sm text-muted-foreground">
                Ao aprovar, o aplicativo poderá usar as ferramentas do site com as suas permissões.
              </p>
              <div className="flex gap-3">
                <Button
                  disabled={busy}
                  onClick={() => decide(true)}
                  className="flex-1 bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] text-background font-semibold hover:opacity-90"
                >
                  Aprovar
                </Button>
                <Button disabled={busy} variant="outline" onClick={() => decide(false)} className="flex-1">
                  Negar
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default OAuthConsent;
