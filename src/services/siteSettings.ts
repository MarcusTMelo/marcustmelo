import { supabase } from "@/integrations/supabase/client";

export type SiteStatus = 'ativo' | 'manutencao' | 'desenvolvimento';

export interface SiteSettings {
  id: string;
  status: SiteStatus;
  updated_at: string;
}

/**
 * Obtém o status atual do site
 * @returns O status do site ou 'ativo' como fallback
 */
export async function getSiteStatus(): Promise<SiteStatus> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('status')
      .single();

    if (error) {
      console.error('Error fetching site status:', error);
      return 'ativo'; // Fallback para ativo em caso de erro
    }

    return data.status as SiteStatus;
  } catch (error) {
    console.error('Unexpected error fetching site status:', error);
    return 'ativo';
  }
}

/**
 * Obtém todas as configurações do site
 * @returns As configurações completas do site
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching site settings:', error);
      return null;
    }

    return data as SiteSettings;
  } catch (error) {
    console.error('Unexpected error fetching site settings:', error);
    return null;
  }
}

/**
 * Atualiza o status do site
 * @param novoStatus - Um dos valores: 'ativo', 'manutencao', 'desenvolvimento'
 * @returns true se atualizado com sucesso, false caso contrário
 */
export async function updateSiteStatus(novoStatus: SiteStatus): Promise<boolean> {
  // Validação no client-side
  const validStatuses: SiteStatus[] = ['ativo', 'manutencao', 'desenvolvimento'];
  if (!validStatuses.includes(novoStatus)) {
    console.error(`Status inválido: ${novoStatus}. Deve ser um dos valores: ${validStatuses.join(', ')}`);
    return false;
  }

  try {
    const { error } = await supabase
      .from('site_settings')
      .update({ status: novoStatus })
      .eq('id', '00000000-0000-0000-0000-000000000001');

    if (error) {
      console.error('Error updating site status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error updating site status:', error);
    return false;
  }
}
