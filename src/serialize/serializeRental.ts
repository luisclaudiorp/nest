const serialize = ({ id, nome, cnpj, atividades, enderecos }): object => {
  return { id, nome, cnpj, atividades, enderecos };
};

export const paginatedSerializeRental = ({ items, meta }): object => {
  return {
    locadoras: items.map(serialize),
    total: meta.totalItems,
    limit: meta.itemsPerPage,
    offset: meta.currentPage,
    offsets: meta.totalPages,
  };
};
