import { TextSummarizer } from "@/components/TextSummarizer";
import { BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background gradient-subtle">
      {/* Header */}
      <header className="pt-12 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6 animate-fade-in">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            AI Text Summarizer
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ringkas teks panjang menjadi poin-poin penting dengan kecerdasan buatan. Pilih gaya dan panjang sesuai kebutuhan Anda.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <TextSummarizer />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground font-body">
            Dibuat dengan AI untuk membantu Anda bekerja lebih efisien
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
