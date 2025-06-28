import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  console.log('🔄 API /send-proposal-email chamada!');
  
  try {
    // Obter dados do formulário
    const data = await req.json();
    console.log('📋 Dados recebidos:', { ...data, email: data.email || '(email não fornecido)' });
    
    const { nome, email, telefone, dataNascimento, dataCartaConducao, matricula, marca, modelo, ano, cilindrada, valor, utilizacao, tipoSeguro, formaPagamento } = data;

    // Validação básica
    if (!email) {
      console.error('⚠️ Email não fornecido nos dados!');
      return NextResponse.json({ success: false, error: 'Email do destinatário não fornecido' }, { status: 400 });
    }
    
    if (!nome) {
      console.error('⚠️ Nome não fornecido nos dados!');
      return NextResponse.json({ success: false, error: 'Nome do cliente não fornecido' }, { status: 400 });
    }

    // Log das configurações SMTP (sem senhas)
    console.log('⚙️ Tentando enviar com configurações SMTP:');
    
    // Configurações SMTP diretas do Thunderbird para o servidor mail.moty.pt
    const transporter = nodemailer.createTransport({
      host: 'mail.moty.pt',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'admin@moty.pt',
        pass: 'Cmd-11313186',
      },
      tls: {
        // Não verificar certificado em desenvolvimento
        rejectUnauthorized: false
      }
    });
    
    // Tentar verificar a conexão primeiro
    try {
      console.log('🔄 Verificando conexão SMTP...');
      await transporter.verify();
      console.log('✅ Conexão SMTP verificada com sucesso!');
    } catch (smtpError: any) {
      console.error('❌ Erro na verificação SMTP:', smtpError);
      
      // Falha na verificação SMTP, mas vamos tentar enviar mesmo assim
      console.log('⚠️ Tentando enviar mesmo sem verificar conexão...');
    }

    // Opções de email
    const mailOptions = {
      from: '"MOTY Seguros" <admin@moty.pt>',
      to: email,
      subject: 'Confirmação da Proposta de Seguro - MOTY',
      text: `Olá ${nome},\n\nRecebemos a sua aceitação da proposta de seguro para a sua mota.\n\nDetalhes:\n- Nome: ${nome}\n- Email: ${email}\n- Telefone: ${telefone || 'Não fornecido'}\n- Data de Nascimento: ${dataNascimento || 'Não fornecida'}\n- Data da Carta: ${dataCartaConducao || 'Não fornecida'}\n- Matrícula: ${matricula || 'Não fornecida'}\n- Marca: ${marca || 'Não fornecida'}\n- Modelo: ${modelo || 'Não fornecido'}\n- Ano: ${ano || 'Não fornecido'}\n- Cilindrada: ${cilindrada || 'Não fornecida'}\n- Valor: ${valor || 'Não fornecido'}\n- Utilização: ${utilizacao || 'Não fornecida'}\n- Tipo de Seguro: ${tipoSeguro || 'Não fornecido'}\n- Forma de Pagamento: ${formaPagamento || 'Não fornecida'}\n\nA nossa equipa irá entrar em contacto consigo em breve.\n\nObrigado por escolher a MOTY!`,
      html: `<h2>Olá ${nome},</h2><p>Recebemos a sua aceitação da proposta de seguro para a sua mota.</p><h3>Detalhes:</h3><ul><li><strong>Nome:</strong> ${nome}</li><li><strong>Email:</strong> ${email}</li><li><strong>Telefone:</strong> ${telefone || 'Não fornecido'}</li><li><strong>Data de Nascimento:</strong> ${dataNascimento || 'Não fornecida'}</li><li><strong>Data da Carta:</strong> ${dataCartaConducao || 'Não fornecida'}</li><li><strong>Matrícula:</strong> ${matricula || 'Não fornecida'}</li><li><strong>Marca:</strong> ${marca || 'Não fornecida'}</li><li><strong>Modelo:</strong> ${modelo || 'Não fornecido'}</li><li><strong>Ano:</strong> ${ano || 'Não fornecido'}</li><li><strong>Cilindrada:</strong> ${cilindrada || 'Não fornecida'}</li><li><strong>Valor:</strong> ${valor || 'Não fornecido'}</li><li><strong>Utilização:</strong> ${utilizacao || 'Não fornecida'}</li><li><strong>Tipo de Seguro:</strong> ${tipoSeguro || 'Não fornecido'}</li><li><strong>Forma de Pagamento:</strong> ${formaPagamento || 'Não fornecida'}</li></ul><p>A nossa equipa irá entrar em contacto consigo em breve.</p><p><strong>Obrigado por escolher a MOTY!</strong></p>`
    };
    
    // Enviar email
    console.log('📨 Enviando email para:', email);
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado com sucesso! ID:', info.messageId);
      
      return NextResponse.json({ 
        success: true,
        messageId: info.messageId
      });
    } catch (sendError: any) {
      console.error('❌ ERRO AO ENVIAR EMAIL:', sendError);
      return NextResponse.json({ 
        success: false, 
        error: `Erro ao enviar email: ${sendError.message}` 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('❌ ERRO GERAL:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Erro desconhecido ao processar requisição' 
    }, { status: 500 });
  }
}
