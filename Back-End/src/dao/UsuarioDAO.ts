import { Pool } from 'pg';
import { hash, compare } from 'bcryptjs';
import Usuario from '../models/Usuario';
import FabricadeConexao from '../utils/FabricadeConexao';

interface UsuarioDTO {
  codusuario: number;
  login: string;
  senha: string;
  tipo: string;
  status: string;
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

      const result: UsuarioDTO = responseDB.rows[0];
      conexao.close();

      return result.codusuario;
    } catch (err) {
      return err;
    }
  }

  public async deletar(usuario: Usuario): Promise<boolean> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryAtualizarUsuario = {
        name: 'Atualizar status do Usuario',
        text: 'UPDATE usuario SET status = 0 WHERE codusuario = $1',
        values: [usuario.getId()],
      };

      await pool.query(queryAtualizarUsuario);

      conexao.close();

      return true;
    } catch (err) {
      return false;
    }
  }

  public async login(usuario: Usuario): Promise<number> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryUsuarioLogin = {
        name: 'Selecionar Usuario',
        text: 'SELECT * FROM usuario WHERE login = $1',
        values: [usuario.getLogin()],
      };

      const queryUsuarioLogado = await pool.query(queryUsuarioLogin);

      if (!queryUsuarioLogado.rows[0]) {
        throw new Error();
      }

      const usuarioLogado: UsuarioDTO = queryUsuarioLogado.rows[0];

      if (Number(usuarioLogado.status) === 0) {
        throw new Error();
      }

      const senhaLogin = String(usuario.getSenha());

      const senhaCorreta = await compare(senhaLogin, usuarioLogado.senha);

      conexao.close();

      if (!senhaCorreta) {
        throw new Error();
      }

      return usuarioLogado.codusuario;
    } catch (err) {
      return 0;
    }
  }
}

export default UsuarioDAO;
