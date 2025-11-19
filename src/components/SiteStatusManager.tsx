import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSiteStatus, updateSiteStatus, type SiteStatus } from "@/services/siteSettings";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Settings } from "lucide-react";

export function SiteStatusManager() {
  const [currentStatus, setCurrentStatus] = useState<SiteStatus>('ativo');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const status = await getSiteStatus();
    setCurrentStatus(status);
  };

  const handleStatusChange = async (newStatus: SiteStatus) => {
    setLoading(true);
    const success = await updateSiteStatus(newStatus);
    
    if (success) {
      setCurrentStatus(newStatus);
      toast.success(`Status alterado para: ${newStatus}`);
    } else {
      toast.error('Erro ao atualizar status');
    }
    
    setLoading(false);
  };

  const getStatusBadge = (status: SiteStatus) => {
    const styles = {
      ativo: { variant: "default" as const, icon: CheckCircle, color: "#6EC8FF" },
      manutencao: { variant: "secondary" as const, icon: AlertCircle, color: "#FF6EC7" },
      desenvolvimento: { variant: "outline" as const, icon: Settings, color: "#C7A7FF" },
    };

    const config = styles[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <Card className="bg-background/50 border-[#C7A7FF]/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Status do Site
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status atual:</span>
          {getStatusBadge(currentStatus)}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={currentStatus === 'ativo' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('ativo')}
            disabled={loading || currentStatus === 'ativo'}
            className="flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" />
            Ativo
          </Button>

          <Button
            size="sm"
            variant={currentStatus === 'manutencao' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('manutencao')}
            disabled={loading || currentStatus === 'manutencao'}
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            Manutenção
          </Button>

          <Button
            size="sm"
            variant={currentStatus === 'desenvolvimento' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('desenvolvimento')}
            disabled={loading || currentStatus === 'desenvolvimento'}
            className="flex items-center gap-1"
          >
            <Settings className="h-3 w-3" />
            Desenvolvimento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
