export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted animate-spin-slow" 
             style={{ borderTopColor: 'hsl(var(--primary))' }} />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent animate-pulse-soft"
             style={{ borderTopColor: 'hsl(var(--accent) / 0.3)' }} />
      </div>
      <p className="text-muted-foreground font-body text-sm animate-pulse-soft">
        Sedang meringkas teks...
      </p>
    </div>
  );
}
