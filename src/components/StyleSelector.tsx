import { cn } from "@/lib/utils";

interface StyleSelectorProps {
  value: 'formal' | 'casual';
  onChange: (value: 'formal' | 'casual') => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground font-body">
        Gaya Ringkasan
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange('formal')}
          className={cn(
            "flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 font-body text-sm",
            value === 'formal'
              ? "border-primary bg-primary/5 text-foreground shadow-soft"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <span className="font-medium">Formal</span>
          <p className="text-xs mt-1 opacity-70">Profesional & akademis</p>
        </button>
        <button
          type="button"
          onClick={() => onChange('casual')}
          className={cn(
            "flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 font-body text-sm",
            value === 'casual'
              ? "border-primary bg-primary/5 text-foreground shadow-soft"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <span className="font-medium">Kasual</span>
          <p className="text-xs mt-1 opacity-70">Santai & mudah dipahami</p>
        </button>
      </div>
    </div>
  );
}
