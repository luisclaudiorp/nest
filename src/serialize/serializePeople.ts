const serialize = ({
  id,
  nome,
  cpf,
  email,
  habilitado,
  data_nascimento,
}): object => {
  return { id, nome, cpf, email, habilitado, data_nascimento };
};

export const paginatedSerializePeople = ({ items, meta }): object => {
  return {
    people: items.map(serialize),
    total: meta.totalItems,
    limit: meta.itemsPerPage,
    offset: meta.currentPage,
    offsets: meta.totalPages,
  };
};
