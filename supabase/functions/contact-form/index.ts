import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\(\)\-]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 8;
}

function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método não permitido" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { name, email, phone, subject, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Email inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ error: "Telefone inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (name.length > 100 || email.length > 255 || phone.length > 30 || (subject && subject.length > 200) || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Um ou mais campos excedem o tamanho máximo permitido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("contact_requests")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .gte("created_at", oneHourAgo);

    if (countError) {
      console.error("Error checking rate limit:", countError);
    }

    if (count && count >= 5) {
      return new Response(
        JSON.stringify({ error: "Muitas tentativas. Aguarde um momento e tente novamente." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sanitizedData = {
      name: sanitizeText(name),
      email: sanitizeText(email),
      phone: sanitizeText(phone),
      subject: subject ? sanitizeText(subject) : null,
      message: sanitizeText(message),
      ip_address: clientIP,
    };

    const { error: insertError } = await supabase
      .from("contact_requests")
      .insert(sanitizedData);

    if (insertError) {
      console.error("Error inserting contact request:", insertError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar mensagem" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = new Date();
    const formattedDate = now.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send emails using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    // IMPORTANTE: Após verificar o domínio no Resend, altere para:
    // const fromEmail = "Marcus T. Melo <contato@marcustmelo.com>";
    const fromEmail = "Marcus T. Melo <onboarding@resend.dev>";
    
    if (resendApiKey) {
      // 1. Email de notificação para o admin
      const adminEmailSubject = `Nova mensagem pelo site – ${sanitizedData.name}`;
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #C8B8E6; padding-bottom: 10px;">
            Nova mensagem de contato
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${sanitizedData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedData.email}</p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${sanitizedData.phone}</p>
            ${sanitizedData.subject ? `<p style="margin: 10px 0;"><strong>Assunto:</strong> ${sanitizedData.subject}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Data/Hora:</strong> ${formattedDate}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Mensagem:</h3>
            <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${sanitizedData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #C8B8E6; border-radius: 8px;">
            <p style="margin: 0; color: #333;">
              <strong>Responder por:</strong><br>
              📧 <a href="mailto:${sanitizedData.email}" style="color: #333;">${sanitizedData.email}</a><br>
              📱 <a href="https://wa.me/55${sanitizedData.phone.replace(/\D/g, '')}" style="color: #333;">WhatsApp: ${sanitizedData.phone}</a>
            </p>
          </div>
        </div>
      `;

      // 2. Email de confirmação para o visitante
      const userEmailSubject = `Recebi sua mensagem! 💜`;
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #C8B8E6 0%, #89CFF0 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">Olá, ${sanitizedData.name}! 👋</h1>
          </div>
          
          <div style="background-color: #fff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              Sua mensagem chegou direitinho! Muito obrigado por entrar em contato.
            </p>
            
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              Vou analisar com carinho o que você me enviou e te respondo em breve. 
              Geralmente retorno em até 24 horas úteis.
            </p>

            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #C8B8E6;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>Resumo da sua mensagem:</strong><br><br>
                ${sanitizedData.subject ? `<em>Assunto:</em> ${sanitizedData.subject}<br><br>` : ''}
                <em>"${sanitizedData.message.length > 150 ? sanitizedData.message.substring(0, 150) + '...' : sanitizedData.message}"</em>
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.8;">
              Enquanto isso, se precisar de algo urgente, pode me chamar diretamente no WhatsApp.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/5511999999999" style="display: inline-block; background: linear-gradient(135deg, #C8B8E6 0%, #89CFF0 100%); color: #fff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                💬 Chamar no WhatsApp
              </a>
            </div>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #888;">
              Marcus T. Melo<br>
              Tecnologia simples para pequenos negócios
            </p>
          </div>
        </div>
      `;

      // Enviar email para o admin
      try {
        const adminEmailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: ["contato@marcustmelo.com"],
            subject: adminEmailSubject,
            html: adminEmailHtml,
          }),
        });

        if (!adminEmailResponse.ok) {
          const emailError = await adminEmailResponse.text();
          console.error("Error sending admin email:", emailError);
        } else {
          console.log("Admin notification email sent successfully");
        }
      } catch (emailErr) {
        console.error("Error sending admin email:", emailErr);
      }

      // Enviar email de confirmação para o visitante
      try {
        const userEmailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [sanitizedData.email],
            subject: userEmailSubject,
            html: userEmailHtml,
          }),
        });

        if (!userEmailResponse.ok) {
          const emailError = await userEmailResponse.text();
          console.error("Error sending user confirmation email:", emailError);
        } else {
          console.log("User confirmation email sent successfully");
        }
      } catch (emailErr) {
        console.error("Error sending user confirmation email:", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping email notifications");
    }

    console.log(`Contact form submitted successfully from ${clientIP}`);

    return new Response(
      JSON.stringify({ success: true, message: "Mensagem enviada com sucesso!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in contact-form function:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
