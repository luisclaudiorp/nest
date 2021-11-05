import axios from 'axios';

interface Adrress {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const getCep = async (cepNumber: string): Promise<Adrress> => {
  const userCep = await axios
    .get(`https://viacep.com.br/ws/${cepNumber}/json`)
    .then((res) => res.data);
  const { logradouro, complemento, bairro, localidade, uf } = userCep;
  return { logradouro, complemento, bairro, localidade, uf };
};
