export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          comments: string | null
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          name: string
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          name: string
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          name?: string
        }
        Relationships: []
      }
      hype_projects: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          mindshare: number | null
          mindshare_change: number | null
          name: string
          narrative: string | null
          rank: number
          score: number
          sparkline: number[] | null
          ticker: string
          token_status: string | null
          trend: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          mindshare?: number | null
          mindshare_change?: number | null
          name: string
          narrative?: string | null
          rank?: number
          score?: number
          sparkline?: number[] | null
          ticker: string
          token_status?: string | null
          trend?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          mindshare?: number | null
          mindshare_change?: number | null
          name?: string
          narrative?: string | null
          rank?: number
          score?: number
          sparkline?: number[] | null
          ticker?: string
          token_status?: string | null
          trend?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hype_score_history: {
        Row: {
          id: string
          mindshare: number | null
          rank: number
          recorded_at: string
          score: number
          ticker: string
        }
        Insert: {
          id?: string
          mindshare?: number | null
          rank: number
          recorded_at?: string
          score: number
          ticker: string
        }
        Update: {
          id?: string
          mindshare?: number | null
          rank?: number
          recorded_at?: string
          score?: number
          ticker?: string
        }
        Relationships: []
      }
      influencer_activities: {
        Row: {
          activity_type: string
          created_at: string
          description: string | null
          id: string
          impact_score: number | null
          influencer_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description?: string | null
          id?: string
          impact_score?: number | null
          influencer_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string | null
          id?: string
          impact_score?: number | null
          influencer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "influencer_activities_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_posts: {
        Row: {
          comments: number | null
          content: string
          created_at: string
          id: string
          influencer_id: string
          likes: number | null
          post_url: string | null
          sentiment_score: number | null
          shares: number | null
        }
        Insert: {
          comments?: number | null
          content: string
          created_at?: string
          id?: string
          influencer_id: string
          likes?: number | null
          post_url?: string | null
          sentiment_score?: number | null
          shares?: number | null
        }
        Update: {
          comments?: number | null
          content?: string
          created_at?: string
          id?: string
          influencer_id?: string
          likes?: number | null
          post_url?: string | null
          sentiment_score?: number | null
          shares?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_posts_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_score_history: {
        Row: {
          id: string
          influencer_id: string
          recorded_at: string
          score: number
        }
        Insert: {
          id?: string
          influencer_id: string
          recorded_at?: string
          score: number
        }
        Update: {
          id?: string
          influencer_id?: string
          recorded_at?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "influencer_score_history_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      influencers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          engagement_rate: number | null
          followers: number | null
          id: string
          is_active: boolean | null
          name: string
          platform: string
          profile_url: string | null
          score: number
          tier: string
          tier_color: string
          trend: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          engagement_rate?: number | null
          followers?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          platform: string
          profile_url?: string | null
          score?: number
          tier?: string
          tier_color?: string
          trend?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          engagement_rate?: number | null
          followers?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          platform?: string
          profile_url?: string | null
          score?: number
          tier?: string
          tier_color?: string
          trend?: number
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          linkedin_url: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          position: string
          resume_url: string | null
          telegram: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          linkedin_url?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          position: string
          resume_url?: string | null
          telegram?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          linkedin_url?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          position?: string
          resume_url?: string | null
          telegram?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
        }
        Relationships: []
      }
      project_gallery: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          project_id: string
          src: string
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          project_id: string
          src: string
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          project_id?: string
          src?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_leaderboard: {
        Row: {
          category: string
          created_at: string
          discord_members: number | null
          hype_score: number | null
          id: string
          is_active: boolean | null
          last_data_update: string | null
          logo_url: string | null
          mindshare_score: number
          name: string
          previous_rank: number
          previous_score: number
          rank: number
          slug: string
          sparkline: number[] | null
          telegram_members: number | null
          telegram_mentions_24h: number | null
          telegram_sentiment: number | null
          ticker: string | null
          trend: string | null
          twitter_mentions: number | null
          twitter_url: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          discord_members?: number | null
          hype_score?: number | null
          id?: string
          is_active?: boolean | null
          last_data_update?: string | null
          logo_url?: string | null
          mindshare_score?: number
          name: string
          previous_rank?: number
          previous_score?: number
          rank?: number
          slug: string
          sparkline?: number[] | null
          telegram_members?: number | null
          telegram_mentions_24h?: number | null
          telegram_sentiment?: number | null
          ticker?: string | null
          trend?: string | null
          twitter_mentions?: number | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          discord_members?: number | null
          hype_score?: number | null
          id?: string
          is_active?: boolean | null
          last_data_update?: string | null
          logo_url?: string | null
          mindshare_score?: number
          name?: string
          previous_rank?: number
          previous_score?: number
          rank?: number
          slug?: string
          sparkline?: number[] | null
          telegram_members?: number | null
          telegram_mentions_24h?: number | null
          telegram_sentiment?: number | null
          ticker?: string | null
          trend?: string | null
          twitter_mentions?: number | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      project_metrics: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          label: string
          project_id: string
          value: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          label: string
          project_id: string
          value: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          label?: string
          project_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_news: {
        Row: {
          created_at: string | null
          date: string | null
          display_order: number | null
          id: string
          image: string | null
          project_id: string
          source: string | null
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          display_order?: number | null
          id?: string
          image?: string | null
          project_id: string
          source?: string | null
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          display_order?: number | null
          id?: string
          image?: string | null
          project_id?: string
          source?: string | null
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_news_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_score_history: {
        Row: {
          id: string
          project_id: string
          rank: number
          recorded_at: string
          score: number
        }
        Insert: {
          id?: string
          project_id: string
          rank: number
          recorded_at?: string
          score: number
        }
        Update: {
          id?: string
          project_id?: string
          rank?: number
          recorded_at?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_score_history_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          background_url: string | null
          category: string | null
          challenge: string | null
          client_name: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          duration: string | null
          glow_color: string | null
          id: string
          is_published: boolean | null
          logo_url: string | null
          name: string
          result: string | null
          services: string[] | null
          short_services: string[] | null
          slug: string
          strategy: string[] | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          background_url?: string | null
          category?: string | null
          challenge?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          glow_color?: string | null
          id?: string
          is_published?: boolean | null
          logo_url?: string | null
          name: string
          result?: string | null
          services?: string[] | null
          short_services?: string[] | null
          slug: string
          strategy?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          background_url?: string | null
          category?: string | null
          challenge?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          glow_color?: string | null
          id?: string
          is_published?: boolean | null
          logo_url?: string | null
          name?: string
          result?: string | null
          services?: string[] | null
          short_services?: string[] | null
          slug?: string
          strategy?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      research_posts: {
        Row: {
          author: string | null
          author_image: string | null
          author_role: string | null
          category: string | null
          content: string | null
          created_at: string | null
          date: string | null
          display_order: number | null
          excerpt: string | null
          id: string
          image: string | null
          is_featured: boolean
          is_published: boolean | null
          read_time: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          author_image?: string | null
          author_role?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          display_order?: number | null
          excerpt?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          is_published?: boolean | null
          read_time?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          author_image?: string | null
          author_role?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          display_order?: number | null
          excerpt?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          is_published?: boolean | null
          read_time?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_mindshare_score: {
        Args: { sentiment: number; tg_mentions: number; tw_mentions: number }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      record_daily_project_history: { Args: never; Returns: undefined }
      record_hype_snapshot: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
