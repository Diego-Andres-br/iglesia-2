import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nnasdfwahywvvlpghohe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uYXNkZndhaHl3dnZscGdob2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTQyOTEsImV4cCI6MjA5NTU5MDI5MX0._iD8icCTeTg8Yr3nrf1-Sw4NIbOCDIIu0g4EIaaz2G4'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Sermon = {
id: string
titulo: string
pastor: string
fecha: string
tipo: 'youtube' | 'audio' | 'texto'
contenido: string
descripcion: string
categoria: string
created_at: string
}