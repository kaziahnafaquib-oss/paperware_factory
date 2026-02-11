// Comprehensive edge function for Paperware Factory
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  // Initialize Supabase Client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  try {
    // 1. Team Members Management
    if (path.endsWith('/images/team')) {
      if (req.method === 'GET') {
        const { data, error } = await supabase.storage.from('team').list();
        if (error) throw error;

        const images = data.map(item => ({
          id: item.id,
          name: item.name.split('.')[0],
          role: "Paperware Team",
          url: supabase.storage.from('team').getPublicUrl(item.name).data.publicUrl
        }));

        return new Response(JSON.stringify({ success: true, images }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 2. Logo Management
    if (path.endsWith('/images/logo')) {
      if (req.method === 'GET') {
        const { data, error } = await supabase.storage.from('logos').list();
        if (error) throw error;

        const images = data.map(item => ({
          id: item.id,
          name: item.name.split('.')[0],
          url: supabase.storage.from('logos').getPublicUrl(item.name).data.publicUrl
        }));

        return new Response(JSON.stringify({ success: true, images }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 3. Brochure Sync
    if (path.endsWith('/brochure/url')) {
      // Logic to fetch from a settings table or similar
      return new Response(JSON.stringify({ success: true, url: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 4. User Engagement Sessions (Session Replay)
    if (path.endsWith('/engagement/sessions')) {
      if (req.method === 'POST') {
        const body = await req.json();
        const { sessionData, metadata } = body;

        // Generate unique filename
        const filename = `${metadata.userId}_${Date.now()}.json`;

        // Save to storage bucket 'sessions'
        const { error: uploadError } = await supabase.storage
          .from('recordings')
          .upload(filename, JSON.stringify({ events: sessionData, metadata }), {
            contentType: 'application/json',
            upsert: true
          });

        if (uploadError) throw uploadError;

        return new Response(JSON.stringify({ success: true, filename }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (req.method === 'GET') {
        // List sessions
        const { data, error } = await supabase.storage.from('recordings').list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });
        if (error) throw error;

        const sessions = await Promise.all(data.map(async (item) => {
          const publicUrl = supabase.storage.from('recordings').getPublicUrl(item.name).data.publicUrl;
          return {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            url: publicUrl
          };
        }));

        return new Response(JSON.stringify({ success: true, sessions }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Default health check
    return new Response(
      JSON.stringify({ status: 'ok', message: 'Paperware API Active' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
