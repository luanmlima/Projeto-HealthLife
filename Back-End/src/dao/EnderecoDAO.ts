import { Pool } from 'pg';
import Endereco from '../models/Endereco';
import FabricadeConexao from '../utils/FabricadeConexao';

interface EnderecoDTO {
  codendereco: number;
  rua: string;
  cidade: string;
  bairro: string;
  numero: number;
  sala: number;
}

class EnderecoDAO {
  public async cadastrar(endereco: Endereco): Promise<number | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelect = {
        name: 'Bucar-login',
        text:
          'SELECT * FROM usuario WHERE rua = $1 AND cidade = $2 AND bairro = $3 AND numero = $4 AND sala = $5',
        values: [
          endereco.getRua(),
          endereco.getCidade(),
          endereco.getBairro(),
          endereco.getNumero(),
          endereco.getSala(),
        ],
      };

      const enderecoExiste = await pool.query(querySelect);

      if (enderecoExiste.rows[0]) {
        const enderecoExistente: EnderecoDTO = enderecoExiste.rows[0];
        return enderecoExistente.codendereco;
      }

      const queryInsert =
        'INSERT INTO usuario(rua ,cidade, bairro, numero, sala) VALUES($1, $2, $3, $4, $5) RETURNING * ';
      const values = [
        endereco.getRua(),
        endereco.getCidade(),
        endereco.getBairro(),
        endereco.getNumero(),
        endereco.getSala(),
      ];

      const responseDB = await pool.query(queryInsert, values);

      const novoEndereco: EnderecoDTO = responseDB.rows[0];
      conexao.close();

      return novoEndereco.codendereco;
    } catch (err) {
      return err;
    }
  }

  // public async deletar(usuario: Usuario): Promise<boolean> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const queryDeletarUsuario = {
  //       name: 'Deletar Usuario',
  //       text: 'DELETE FROM usuario WHERE codusuario = $1',
  //       values: [usuario.getId()],
  //     };

  //     await pool.query(queryDeletarUsuario);

  //     conexao.close();

  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // }

  // public async login(usuario: Usuario): Promise<number> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const queryUsuarioLogin = {
  //       name: 'Selecionar Usuario',
  //       text: 'SELECT * FROM usuario WHERE login = $1',
  //       values: [usuario.getLogin()],
  //     };

  //     const queryUsuarioLogado = await pool.query(queryUsuarioLogin);

  //     if (!queryUsuarioLogado.rows[0]) {
  //       throw new Error();
  //     }

  //     const usuarioLogado: UsuarioDTO = queryUsuarioLogado.rows[0];

  //     const senhaLogin = String(usuario.getSenha());

  //     const senhaCorreta = await compare(senhaLogin, usuarioLogado.senha);

  //     conexao.close();

  //     if (!senhaCorreta) {
  //       throw new Error();
  //     }

  //     return usuarioLogado.codusuario;
  //   } catch (err) {
  //     return 0;
  //   }
  // }
}

export default EnderecoDAO;