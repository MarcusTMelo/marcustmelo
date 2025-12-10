import { Settings, Clock } from "lucide-react";
import AuroraEffect from "@/components/AuroraEffect";

const MaintenancePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <AuroraEffect />
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            <Settings className="h-24 w-24 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <Clock className="h-12 w-12 text-primary/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Site em Manutenção</h1>
          <p className="text-xl text-muted-foreground">
            Estamos realizando melhorias para servir você melhor
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Voltaremos em breve. Agradecemos sua compreensão.
          </p>
          <p className="text-sm text-muted-foreground">
            Em caso de urgência, entre em contato por email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
