import { Pool } from 'pg';
import { hash } from 'bcryptjs';
import Usuario from '../models/Usuario';
import FabricadeConexao from '../utils/FabricadeConexao';

interface RetornoCriacaoUsuario {
  codusuario: number;
  login: string;
  senha: string;
  tipo: string;
}

class UsuarioDAO {
  public async cadastrar(usuario: Usuario): Promise<number | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelect = {
        name: 'Bucar-login',
        text: 'SELECT * FROM usuario WHERE login = $1',
        values: [usuario.getLogin()],
      };

      const usuarioExiste = await pool.query(querySelect);

      if (usuarioExiste.rows[0]) {
        throw new Error();
      }

      const senha = usuario.getSenha();

      let senhaCriptografada = '';

      if (senha !== null) {
        senhaCriptografada = await hash(senha, 10);
      }

      const queryInsert =
        'INSERT INTO usuario(login, senha, tipo) VALUES($1, $2, $3) RETURNING *';
      const values = [
        usuario.getLogin(),
        senhaCriptografada,
        usuario.getTipo(),
      ];

      const responseDB = await pool.query(queryInsert, values);

      const result: RetornoCriacaoUsuario = responseDB.rows[0];
      conexao.close();

      return result.codusuario;
    } catch (err) {
      return err;
    }
  }
}

export default UsuarioDAO;
