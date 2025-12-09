import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface SummaryPanelProps {
  summary: string;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast({
        title: "Berhasil disalin!",
        description: "Ringkasan telah disalin ke clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Gagal menyalin",
        description: "Tidak dapat menyalin ringkasan.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Hasil Ringkasan
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Tersalin
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Salin Ringkasan
            </>
          )}
        </Button>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <p className="text-foreground font-body leading-relaxed whitespace-pre-wrap">
          {summary}
        </p>
      </div>
    </div>
  );
}
