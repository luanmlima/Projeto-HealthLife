import { Pool } from 'pg';
import Usuario from '../models/Usuario';
import FabricadeConexao from './FabricadeConexao';

interface RetornoCriacaoUsuario {
  codusuario: number;
  login: string;
  senha: string;
  tipo: string;
}

class UsuarioDAO {
  public async cadastrar(usuario: Usuario): Promise<number | undefined> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryInsert =
        'INSERT INTO usuario(login, senha, tipo) VALUES($1, $2, $3) RETURNING *';
      const values = [
        usuario.getLogin(),
        usuario.getSenha(),
        usuario.getTipo(),
      ];

      const responseDB = await pool.query(queryInsert, values);

      const result: RetornoCriacaoUsuario = responseDB.rows[0];
      conexao.close();

      return result.codusuario;
    } catch (err) {
      console.log(err.stack);
    }
  }
}

export default UsuarioDAO;
