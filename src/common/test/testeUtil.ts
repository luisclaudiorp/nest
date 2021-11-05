import { User } from '../../model/user.entity';

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.cpf = '022.815.330-18';
    user.data_nascimento = '23/12/1988';
    user.email = 'teste@teste.com';
    user.nome = 'teste';
    user.senha = '654321';
    user.id = 1;
    user.habilitado = 'sim';
    return user;
  }
}
