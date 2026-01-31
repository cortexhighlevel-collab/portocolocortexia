import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center px-6">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary font-orbitron mb-4 animate-pulse">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full" />
        </div>
        
        <h2 className="text-2xl font-semibold text-white mb-4 font-rajdhani">
          Página não encontrada
        </h2>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto font-rajdhani">
          O conteúdo que você está procurando não existe ou foi movido para outro endereço.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 font-rajdhani group"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
