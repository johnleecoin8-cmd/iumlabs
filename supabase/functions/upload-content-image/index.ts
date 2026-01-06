import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[upload-content-image] Request received');
    
    const contentType = req.headers.get('content-type') || '';
    
    let fileData: ArrayBuffer;
    let fileName: string;
    let mimeType: string;
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData upload
      const formData = await req.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        console.error('[upload-content-image] No file in FormData');
        return new Response(
          JSON.stringify({ error: 'No file provided' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log('[upload-content-image] File received:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      fileData = await file.arrayBuffer();
      fileName = file.name;
      mimeType = file.type || 'image/png';
    } else {
      // Handle JSON with base64 data
      const body = await req.json();
      
      if (!body.base64 || !body.fileName) {
        console.error('[upload-content-image] Missing base64 or fileName');
        return new Response(
          JSON.stringify({ error: 'base64 and fileName are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log('[upload-content-image] Base64 data received for:', body.fileName);
      
      // Decode base64
      const base64Data = body.base64.replace(/^data:image\/\w+;base64,/, '');
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      fileData = bytes.buffer;
      fileName = body.fileName;
      mimeType = body.mimeType || 'image/png';
    }
    
    // Check size (max 5MB)
    if (fileData.byteLength > 5 * 1024 * 1024) {
      console.error('[upload-content-image] File too large:', fileData.byteLength);
      return new Response(
        JSON.stringify({ error: 'Image is too large (max 5MB)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine file extension
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
    };
    const ext = extMap[mimeType.split(';')[0]] || 'png';

    // Initialize Supabase client with service role key (bypasses RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate unique filename
    const storagePath = `research/content-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    console.log('[upload-content-image] Uploading to:', storagePath);

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(storagePath, fileData, {
        contentType: mimeType.split(';')[0],
        upsert: false,
      });

    if (uploadError) {
      console.error('[upload-content-image] Upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: `Upload failed: ${uploadError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(storagePath);

    console.log('[upload-content-image] Upload successful:', publicUrl);

    return new Response(
      JSON.stringify({ publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[upload-content-image] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
