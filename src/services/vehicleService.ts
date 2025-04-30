import axios from 'axios';

export interface VehicleData {
  matricula: string;
  marca: string;
  modelo: string;
  ano: string;
  cilindrada: string;
}

/**
 * Busca os dados do veículo a partir da matrícula
 * @param matricula - Matrícula do veículo no formato XX-XX-XX
 * @returns Promise com os dados do veículo ou null se não encontrado
 */
export async function fetchVehicleDataByPlate(matricula: string): Promise<VehicleData | null> {
  try {
    // Normalizar a matrícula para o formato esperado (XX-XX-XX)
    const normalizedPlate = normalizePlate(matricula);
    
    // Verificar se a matrícula está no formato correto
    if (!/^\d{2}-[A-Z]{2}-\d{2}$/.test(normalizedPlate)) {
      console.log('Formato de matrícula inválido:', normalizedPlate);
      return null;
    }
    
    // Buscar os dados do arquivo CSV diretamente
    const response = await fetch('/data/registo_motas_mock.csv');
    const csvText = await response.text();
    
    // Converter o CSV em um array de objetos
    const vehicles = parseCSV(csvText);
    
    // Encontrar o veículo com a matrícula correspondente (ignorando case)
    const vehicle = vehicles.find(v => 
      v.matricula.toLowerCase() === normalizedPlate.toLowerCase()
    );
    
    if (vehicle) {
      console.log('Veículo encontrado:', vehicle);
      
      // Garantir que a cilindrada seja um valor válido
      if (!vehicle.cilindrada || isNaN(Number(vehicle.cilindrada))) {
        vehicle.cilindrada = '0';
      }
      
      return vehicle;
    } else {
      console.log('Veículo não encontrado para a matrícula:', normalizedPlate);
      
      // Tentar encontrar com uma busca mais flexível (apenas números e letras)
      const cleanedSearchPlate = normalizedPlate.replace(/[^A-Z0-9]/g, '');
      const alternativeVehicle = vehicles.find(v => {
        const cleanedVehiclePlate = v.matricula.replace(/[^A-Z0-9]/g, '');
        return cleanedVehiclePlate.toLowerCase() === cleanedSearchPlate.toLowerCase();
      });
      
      if (alternativeVehicle) {
        console.log('Veículo encontrado com busca alternativa:', alternativeVehicle);
        
        // Garantir que a cilindrada seja um valor válido
        if (!alternativeVehicle.cilindrada || isNaN(Number(alternativeVehicle.cilindrada))) {
          alternativeVehicle.cilindrada = '0';
        }
        
        return alternativeVehicle;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar dados do veículo:', error);
    return null;
  }
}

/**
 * Normaliza a matrícula para o formato XX-XX-XX
 * Formata automaticamente para o padrão 11-AA-22
 */
function normalizePlate(plate: string): string {
  // Remover caracteres não alfanuméricos
  let cleaned = plate.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  
  // Se a matrícula não tiver 6 caracteres, não podemos formatá-la corretamente
  if (cleaned.length !== 6) {
    return plate.toUpperCase();
  }
  
  // Verificar se os caracteres estão no padrão esperado: 2 números, 2 letras, 2 números
  const firstTwo = cleaned.substring(0, 2);
  const middleTwo = cleaned.substring(2, 4);
  const lastTwo = cleaned.substring(4, 6);
  
  // Verificar se os primeiros dois caracteres são números
  if (!/^\d{2}$/.test(firstTwo)) {
    return plate.toUpperCase();
  }
  
  // Verificar se os dois caracteres do meio são letras
  if (!/^[A-Z]{2}$/.test(middleTwo)) {
    return plate.toUpperCase();
  }
  
  // Verificar se os últimos dois caracteres são números
  if (!/^\d{2}$/.test(lastTwo)) {
    return plate.toUpperCase();
  }
  
  // Formatar no padrão 11-AA-22
  return `${firstTwo}-${middleTwo}-${lastTwo}`;
}

/**
 * Converte uma string CSV em um array de objetos
 */
function parseCSV(csvString: string): VehicleData[] {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    
    // Criar objeto com as propriedades necessárias
    const vehicle: VehicleData = {
      matricula: values[headers.indexOf('matricula')] || '',
      marca: values[headers.indexOf('marca')] || '',
      modelo: values[headers.indexOf('modelo')] || '',
      ano: values[headers.indexOf('ano')] || '',
      cilindrada: values[headers.indexOf('cilindrada')] || ''
    };
    
    // Garantir que a cilindrada seja um valor válido
    if (!vehicle.cilindrada || isNaN(Number(vehicle.cilindrada))) {
      vehicle.cilindrada = '0';
    }
    
    return vehicle;
  });
}
