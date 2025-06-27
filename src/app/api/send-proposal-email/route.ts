import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nome, email, telefone, dataNascimento, dataCartaConducao, matricula, marca, modelo, ano, cilindrada, valor, utilizacao, tipoSeguro, formaPagamento } = data;

    // Configure your SMTP transporter here (use environment variables for production)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MOTY_MAIL_FROM || 'no-reply@moty.pt',
      to: email,
      subject: 'Confirmação da Proposta de Seguro - MOTY',
      text: `Olá ${nome},\n\nRecebemos a sua aceitação da proposta de seguro para a sua mota.\n\nDetalhes:\n- Nome: ${nome}\n- Email: ${email}\n- Telefone: ${telefone}\n- Data de Nascimento: ${dataNascimento}\n- Data da Carta: ${dataCartaConducao}\n- Matrícula: ${matricula}\n- Marca: ${marca}\n- Modelo: ${modelo}\n- Ano: ${ano}\n- Cilindrada: ${cilindrada}\n- Valor: ${valor}\n- Utilização: ${utilizacao}\n- Tipo de Seguro: ${tipoSeguro}\n- Forma de Pagamento: ${formaPagamento}\n\nA nossa equipa irá entrar em contacto consigo em breve.\n\nObrigado por escolher a MOTY!`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
