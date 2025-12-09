import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StyleSelector } from "@/components/StyleSelector";
import { LengthSlider } from "@/components/LengthSlider";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SummaryPanel } from "@/components/SummaryPanel";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function TextSummarizer() {
  const [text, setText] = useState("");
  const [style, setStyle] = useState<'formal' | 'casual'>('formal');
  const [length, setLength] = useState(50);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({
        title: "Teks kosong",
        description: "Silakan masukkan teks yang ingin diringkas.",
        variant: "destructive",
      });
      return;
    }

    if (text.trim().length < 50) {
      toast({
        title: "Teks terlalu pendek",
        description: "Masukkan teks minimal 50 karakter untuk diringkas.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      const { data, error } = await supabase.functions.invoke('summarize', {
        body: { text, style, length },
      });

      if (error) {
        throw new Error(error.message || 'Gagal meringkas teks');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.summary) {
        setSummary(data.summary);
        toast({
          title: "Berhasil!",
          description: "Teks berhasil diringkas.",
        });
      }
    } catch (error) {
      console.error('Summarize error:', error);
      toast({
        title: "Gagal meringkas",
        description: error instanceof Error ? error.message : "Terjadi kesalahan. Coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSummary("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Masukkan Teks
          </h2>
        </div>

        <Textarea
          placeholder="Tempelkan atau ketik teks yang ingin Anda ringkas di sini..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] text-base font-body resize-none bg-background border-border focus:border-primary transition-colors"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground font-body">
            {text.length} karakter
          </span>
          {text && (
            <button
              onClick={handleClear}
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Hapus semua
            </button>
          )}
        </div>
      </div>

      {/* Options Section */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent/20">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Opsi Ringkasan
          </h2>
        </div>

        <StyleSelector value={style} onChange={setStyle} />
        <LengthSlider value={length} onChange={setLength} />

        <Button
          variant="warm"
          size="lg"
          onClick={handleSummarize}
          disabled={isLoading || !text.trim()}
          className="w-full mt-4"
        >
          <Sparkles className="w-5 h-5" />
          Ringkas Teks
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <LoadingSpinner />
        </div>
      )}

      {/* Result Section */}
      {summary && !isLoading && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft">
          <SummaryPanel summary={summary} />
        </div>
      )}
    </div>
  );
}
