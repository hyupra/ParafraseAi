import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, style, length } = await req.json();
    
    console.log(`Summarizing text with style: ${style}, length: ${length}%`);

    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Teks tidak boleh kosong' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service not configured');
    }

    const lengthDescription = length <= 25 ? 'sangat singkat (1-2 kalimat)' :
                              length <= 50 ? 'singkat (3-4 kalimat)' :
                              length <= 75 ? 'sedang (5-7 kalimat)' :
                              'panjang dan detail (8+ kalimat)';

    const styleInstruction = style === 'formal' 
      ? 'Gunakan bahasa formal, profesional, dan akademis. Hindari bahasa sehari-hari.'
      : 'Gunakan bahasa santai, mudah dipahami, dan seperti berbicara dengan teman.';

    const systemPrompt = `Kamu adalah asisten AI yang ahli dalam meringkas teks. Tugas kamu adalah membuat ringkasan yang ${lengthDescription}. ${styleInstruction}

Aturan:
- Tangkap poin-poin utama dan ide kunci
- Pertahankan makna asli teks
- Buat ringkasan yang koheren dan mengalir dengan baik
- Jawab hanya dengan ringkasan, tanpa penjelasan tambahan`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Ringkas teks berikut:\n\n${text}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Terlalu banyak permintaan. Coba lagi nanti.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Kredit habis. Silakan tambah kredit.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content;

    if (!summary) {
      throw new Error('No summary generated');
    }

    console.log('Summary generated successfully');

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Summarize function error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Terjadi kesalahan' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
