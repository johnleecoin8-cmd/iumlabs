import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProjectUpdate {
  slug: string
  telegram_mentions?: number
  telegram_sentiment?: number
  twitter_mentions?: number
  discord_members?: number
  telegram_members?: number
}

interface RequestBody {
  api_key: string
  projects: ProjectUpdate[]
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body: RequestBody = await req.json()

    // Validate API key
    const expectedApiKey = Deno.env.get('CRAWLER_API_KEY')
    if (!expectedApiKey || body.api_key !== expectedApiKey) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate projects array
    if (!body.projects || !Array.isArray(body.projects) || body.projects.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Projects array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const results: { slug: string; success: boolean; error?: string; new_score?: number }[] = []

    for (const project of body.projects) {
      try {
        // Get current project data
        const { data: existing, error: fetchError } = await supabase
          .from('project_leaderboard')
          .select('id, mindshare_score, twitter_mentions')
          .eq('slug', project.slug)
          .maybeSingle()

        if (fetchError) throw fetchError

        if (!existing) {
          results.push({ slug: project.slug, success: false, error: 'Project not found' })
          continue
        }

        // Calculate new mindshare score
        const tgMentions = project.telegram_mentions ?? 0
        const twMentions = project.twitter_mentions ?? existing.twitter_mentions ?? 0
        const sentiment = project.telegram_sentiment ?? 0

        // Formula: (TG × 0.6) + (TW × 0.3) + (Sentiment × 100 × 0.1)
        const newScore = Math.round(
          (tgMentions * 0.6) + (twMentions * 0.3) + (sentiment * 100 * 0.1) * 100
        ) / 100

        // Update project
        const updateData: Record<string, unknown> = {
          previous_score: existing.mindshare_score,
          mindshare_score: newScore,
          last_data_update: new Date().toISOString(),
        }

        if (project.telegram_mentions !== undefined) {
          updateData.telegram_mentions_24h = project.telegram_mentions
        }
        if (project.telegram_sentiment !== undefined) {
          updateData.telegram_sentiment = project.telegram_sentiment
        }
        if (project.twitter_mentions !== undefined) {
          updateData.twitter_mentions = project.twitter_mentions
        }
        if (project.discord_members !== undefined) {
          updateData.discord_members = project.discord_members
        }
        if (project.telegram_members !== undefined) {
          updateData.telegram_members = project.telegram_members
        }

        const { error: updateError } = await supabase
          .from('project_leaderboard')
          .update(updateData)
          .eq('id', existing.id)

        if (updateError) throw updateError

        results.push({ slug: project.slug, success: true, new_score: newScore })
      } catch (err) {
        results.push({ 
          slug: project.slug, 
          success: false, 
          error: err instanceof Error ? err.message : 'Unknown error' 
        })
      }
    }

    // Recalculate ranks based on new scores
    const { data: allProjects, error: rankError } = await supabase
      .from('project_leaderboard')
      .select('id, mindshare_score, rank')
      .eq('is_active', true)
      .order('mindshare_score', { ascending: false })

    if (!rankError && allProjects) {
      for (let i = 0; i < allProjects.length; i++) {
        const newRank = i + 1
        if (allProjects[i].rank !== newRank) {
          await supabase
            .from('project_leaderboard')
            .update({ previous_rank: allProjects[i].rank, rank: newRank })
            .eq('id', allProjects[i].id)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        updated: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
