/**
 * Calcula o preço do seguro com base nos dados do veículo e do condutor
 * @param {Object} dados - Dados do formulário
 * @returns {Object} - Valores do seguro calculados
 */
export function calcularPrecoSeguro(dados) {
  // Extrair e converter dados do formulário
  let dataNascimento;
  let dataCartaConducao;
  
  // Converter data de nascimento do formato dd/mm/yyyy para objeto Date
  if (dados.dataNascimento && /^\d{2}\/\d{2}\/\d{4}$/.test(dados.dataNascimento)) {
    const [dia, mes, ano] = dados.dataNascimento.split('/').map(Number);
    dataNascimento = new Date(ano, mes - 1, dia);
  } else if (dados.dataNascimento) {
    dataNascimento = new Date(dados.dataNascimento);
  } else {
    dataNascimento = new Date();
  }
  
  // Converter data da carta de condução do formato dd/mm/yyyy para objeto Date
  if (dados.dataCartaConducao && /^\d{2}\/\d{2}\/\d{4}$/.test(dados.dataCartaConducao)) {
    const [dia, mes, ano] = dados.dataCartaConducao.split('/').map(Number);
    dataCartaConducao = new Date(ano, mes - 1, dia);
  } else if (dados.dataCartaConducao) {
    dataCartaConducao = new Date(dados.dataCartaConducao);
  } else {
    dataCartaConducao = new Date();
    dataCartaConducao.setFullYear(dataCartaConducao.getFullYear() - 2); // Assume 2 anos de carta por padrão
  }
  
  const anoAtual = new Date().getFullYear();
  
  // Calcular idade do condutor
  const idade = anoAtual - dataNascimento.getFullYear();
  
  // Calcular anos de carta
  const anosCarta = Math.max(0, Math.floor((new Date() - dataCartaConducao) / (365.25 * 24 * 60 * 60 * 1000)));
  
  // Mapear tipo de seguro do formulário
  const tipoSeguro = dados.tipoSeguro === 'danos-proprios' ? 
    'todos_os_riscos' : 'responsabilidade_civil';
  
  // Mapear utilização do formulário
  const uso = dados.utilizacao === 'profissional' ? 'profissional' : 
              dados.utilizacao === 'pendular' ? 'pendular' : 'particular';
  
  // Converter cilindrada para número
  const cilindrada = parseInt(dados.cilindrada) || 500;
  
  // Converter ano da mota para número
  const anoMota = parseInt(dados.ano) || (anoAtual - 5);
  
  // Assumir gênero (no futuro pode ser adicionado ao formulário)
  const genero = 'homem';
  
  // Preparar dados para o cálculo
  const dadosCalculo = {
    idade,
    anosCarta,
    uso,
    tipoSeguro,
    genero,
    cilindrada,
    anoMota
  };
  
  console.log('Dados para cálculo do seguro:', dadosCalculo);
  
  // Calcular o valor mensal
  const valorMensal = calcularPrecoSeguroOriginal(dadosCalculo);
  
  // Retornar objeto com valores mensal e anual formatados com 2 casas decimais
  return {
    valorMensal: parseFloat(valorMensal.toFixed(2)),
    valorAnual: parseFloat((valorMensal * 12).toFixed(2))
  };
}

/**
 * Função original de cálculo do preço do seguro
 * @param {Object} dados - Dados processados para cálculo
 * @returns {number} - Valor mensal do seguro
 */
function calcularPrecoSeguroOriginal(dados) {
  const {
    idade,
    anosCarta,
    uso,        // 'particular', 'pendular' ou 'profissional'
    tipoSeguro, // 'responsabilidade_civil' ou 'todos_os_riscos'
    genero,     // 'homem' ou 'mulher'
    cilindrada,
    anoMota
  } = dados;

  const precoBase = 150;

  let fatorIdade = 0;
  if (idade < 25) fatorIdade = 0.30;
  else if (idade > 60) fatorIdade = 0.15;

  let fatorCarta = 0;
  if (anosCarta < 2) fatorCarta = 0.25;
  else if (anosCarta >= 2 && anosCarta <= 5) fatorCarta = 0.10;

  let fatorUso = 0;
  if (uso === 'pendular') fatorUso = 0.10;
  else if (uso === 'profissional') fatorUso = 0.20;

  const fatorTipoSeguro = tipoSeguro === 'todos_os_riscos' ? 0.50 : 0;

  let fatorGenero = 0;
  if (genero === 'homem') fatorGenero = 0.05;
  else if (genero === 'mulher') fatorGenero = -0.05;

  let fatorCilindrada = 0;
  if (cilindrada <= 125) fatorCilindrada = -0.10;
  else if (cilindrada > 500 && cilindrada <= 1000) fatorCilindrada = 0.10;
  else if (cilindrada > 1000) fatorCilindrada = 0.20;

  let fatorAnoMota = 0;
  const anoAtual = new Date().getFullYear();
  const idadeMota = anoAtual - anoMota;
  if (idadeMota <= 5) fatorAnoMota = 0.10;
  else if (idadeMota > 15) fatorAnoMota = 0.10;

  let precoFinal = precoBase *
    (1 + fatorIdade) *
    (1 + fatorCarta) *
    (1 + fatorUso) *
    (1 + fatorTipoSeguro) *
    (1 + fatorGenero) *
    (1 + fatorCilindrada) *
    (1 + fatorAnoMota);

  return Number(precoFinal.toFixed(2));
}
