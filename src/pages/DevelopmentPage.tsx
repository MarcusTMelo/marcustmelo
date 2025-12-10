import { Code2, Rocket } from "lucide-react";

const DevelopmentPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            <Code2 className="h-24 w-24 text-primary" />
            <Rocket className="h-12 w-12 text-primary/60 absolute -top-2 -right-2" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Em Desenvolvimento</h1>
          <p className="text-xl text-muted-foreground">Estamos construindo algo incrível para você</p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Nosso site está sendo desenvolvido e estará disponível em breve.
          </p>
          <p className="text-sm text-muted-foreground">Fique atento para novidades!</p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
