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
  public async cadastrar(endereco: Endereco): Promise<number> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryInsert =
        'INSERT INTO endereco(rua ,cidade, bairro, numero, sala) VALUES($1, $2, $3, $4, $5) RETURNING * ';
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

  public async atualizar(endereco: Endereco): Promise<void> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryUpdate = {
        name: 'Atualizar Endereço',
        text:
          'UPDATE endereco SET rua = $1, cidade = $2, bairro = $3, numero = $4, sala = $5 WHERE codendereco = $6 RETURNING *',
        values: [
          endereco.getRua(),
          endereco.getCidade(),
          endereco.getBairro(),
          endereco.getNumero(),
          endereco.getSala(),
          endereco.getId(),
        ],
      };

      await pool.query(queryUpdate);

      conexao.close();
    } catch (err) {
      return err;
    }
  }

  public async listar(endereco: Endereco): Promise<EnderecoDTO> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelecionarEndereco = {
        name: 'Selecionar Usuario',
        text: 'SELECT * FROM endereco WHERE codendereco = $1',
        values: [endereco.getId()],
      };

      const queryEnderecoListado = await pool.query(querySelecionarEndereco);

      const enderecoDB: EnderecoDTO = queryEnderecoListado.rows[0];

      conexao.close();

      return enderecoDB;
    } catch (err) {
      return err;
    }
  }
}

export default EnderecoDAO;
