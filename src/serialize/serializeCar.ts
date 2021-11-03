const serialize = ({
  id,
  modelo,
  cor,
  ano,
  quantidadePassagerios,
  acessorios,
}): object => {
  return { id, modelo, cor, ano, quantidadePassagerios, acessorios };
};

export const paginatedSerializeCar = ({ items, meta }): object => {
  return {
    car: items.map(serialize),
    total: meta.totalItems,
    limit: meta.itemsPerPage,
    offset: meta.currentPage,
    offsets: meta.totalPages,
  };
};
