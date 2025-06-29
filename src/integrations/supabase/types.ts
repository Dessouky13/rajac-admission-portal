export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          password_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password_hash?: string
        }
        Relationships: []
      }
      admission_forms: {
        Row: {
          address: string | null
          admin_notes: string | null
          citizenship: string | null
          created_at: string | null
          dob: string | null
          father_business: string | null
          father_degree: string | null
          father_dob: string | null
          father_email: string | null
          father_name: string | null
          father_phone: string | null
          father_work: string | null
          gender: string | null
          grade: string | null
          id: string
          mother_business: string | null
          mother_degree: string | null
          mother_dob: string | null
          mother_email: string | null
          mother_name: string | null
          mother_phone: string | null
          mother_work: string | null
          prev_school: string | null
          religion: string | null
          scholar_notes: string | null
          school: string | null
          second_lang: string | null
          status: string | null
          student_first_name: string | null
          student_last_name: string | null
          student_name_ar: string | null
          test_date: string | null
          test_result: string | null
          test_time: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          citizenship?: string | null
          created_at?: string | null
          dob?: string | null
          father_business?: string | null
          father_degree?: string | null
          father_dob?: string | null
          father_email?: string | null
          father_name?: string | null
          father_phone?: string | null
          father_work?: string | null
          gender?: string | null
          grade?: string | null
          id?: string
          mother_business?: string | null
          mother_degree?: string | null
          mother_dob?: string | null
          mother_email?: string | null
          mother_name?: string | null
          mother_phone?: string | null
          mother_work?: string | null
          prev_school?: string | null
          religion?: string | null
          scholar_notes?: string | null
          school?: string | null
          second_lang?: string | null
          status?: string | null
          student_first_name?: string | null
          student_last_name?: string | null
          student_name_ar?: string | null
          test_date?: string | null
          test_result?: string | null
          test_time?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          citizenship?: string | null
          created_at?: string | null
          dob?: string | null
          father_business?: string | null
          father_degree?: string | null
          father_dob?: string | null
          father_email?: string | null
          father_name?: string | null
          father_phone?: string | null
          father_work?: string | null
          gender?: string | null
          grade?: string | null
          id?: string
          mother_business?: string | null
          mother_degree?: string | null
          mother_dob?: string | null
          mother_email?: string | null
          mother_name?: string | null
          mother_phone?: string | null
          mother_work?: string | null
          prev_school?: string | null
          religion?: string | null
          scholar_notes?: string | null
          school?: string | null
          second_lang?: string | null
          status?: string | null
          student_first_name?: string | null
          student_last_name?: string | null
          student_name_ar?: string | null
          test_date?: string | null
          test_result?: string | null
          test_time?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { check_user_id?: string }
        Returns: boolean
      }
      verify_admin_login: {
        Args: { admin_email: string; admin_password: string }
        Returns: {
          id: string
          email: string
          name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
