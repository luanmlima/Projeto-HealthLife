/* eslint-disable camelcase */
import { Pool } from 'pg';
import Profissional from '../models/Profissional';
import FabricadeConexao from '../utils/FabricadeConexao';

interface ProfissionalDBDTO {
  codprofissional: number;
  especialidade: string;
  experiencia: number;
  nome: string;
  codendereco: number;
  usuario: number;
  cpf: string;
  numero_diploma: number;
  numero_carteira: number;
  status: number;
}

class ProfissionalDAO {
  public async cadastrar(
    profissional: Profissional,
  ): Promise<Profissional | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryInsert = {
        name: 'Criar funcionario',
        text:
          'INSERT INTO profissional(especialidade, experiencia, nome, codendereco, usuario, cpf, numero_diploma, numero_carteira) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [
          profissional.getEspecialidade(),
          profissional.getAnosExperiencia(),
          profissional.getNome(),
          profissional.getEndereco()?.getId(),
          profissional.getUsuario()?.getId(),
          profissional.getCpf(),
          profissional.getNumeroDiploma(),
          profissional.getNumeroCarteira(),
        ],
      };
      const profissionalCriado = await pool.query(queryInsert);

      conexao.close();

      return profissionalCriado.rows[0];
    } catch (err) {
      return err;
    }
  }

  public async atualizar(
    profissional: Profissional,
  ): Promise<ProfissionalDBDTO | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();
      if(profissional.getEspecialidade()){
        const queryUpdateComEspecialidade = {
          name: 'Atualizar Profissional',
          text:
            'UPDATE profissional SET experiencia = $1, nome = $2, numero_diploma = $3, numero_carteira = $4, status = 1, especialidade = $5 WHERE codprofissional = $6 RETURNING *',
          values: [
            profissional.getAnosExperiencia(),
            profissional.getNome(),
            profissional.getNumeroDiploma(),
            profissional.getNumeroCarteira(),
            profissional.getEspecialidade(),
            profissional.getId(),
          ],
        };
        const profissionalDB = await pool.query(queryUpdateComEspecialidade);

      conexao.close();

      if (!profissionalDB.rows[0]) {
        throw new Error();
      }
      const profissionalAtualizado: ProfissionalDBDTO = profissionalDB.rows[0];
      return profissionalAtualizado;
      }


      const queryUpdate = {
        name: 'Atualizar Profissional',
        text:
          'UPDATE profissional SET experiencia = $1, nome = $2, numero_diploma = $3, numero_carteira = $4, status = 1 WHERE codprofissional = $5 RETURNING *',
        values: [
          profissional.getAnosExperiencia(),
          profissional.getNome(),
          profissional.getNumeroDiploma(),
          profissional.getNumeroCarteira(),
          profissional.getId(),
        ],
      };

      const profissionalDB = await pool.query(queryUpdate);

      conexao.close();

      if (!profissionalDB.rows[0]) {
        throw new Error();
      }
      const profissionalAtualizado: ProfissionalDBDTO = profissionalDB.rows[0];
      return profissionalAtualizado;
    } catch (err) {
      console.log(err);

      return err;
    }
  }

  public async deletar(profissional: Profissional): Promise<number> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelectProfissional = {
        name: 'Selecionar Profissional',
        text: 'SELECT usuario from profissional WHERE codprofissional = $1',
        values: [profissional.getId()],
      };

      const profissionalSelecionado = await pool.query(querySelectProfissional);

      const idUsuario: number = profissionalSelecionado.rows[0].usuario;

      const queryAtualizarrofissional = {
        name: 'Atualizar status profissional',
        text: 'UPDATE profissional SET status = 0 WHERE codprofissional = $1',
        values: [profissional.getId()],
      };
      await pool.query(queryAtualizarrofissional);
      conexao.close();
      return idUsuario;
    } catch (err) {
      return 0;
    }
  }

  public async login(profissional: Profissional): Promise<ProfissionalDBDTO> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryProfissionalLogin = {
        name: 'Selecionar Usuario',
        text: 'SELECT * FROM profissional WHERE usuario = $1',
        values: [profissional.getUsuario()?.getId()],
      };

      const queryprofissionalLogado = await pool.query(queryProfissionalLogin);

      if (!queryprofissionalLogado.rows[0]) {
        throw new Error();
      }

      const profissionalLogado: ProfissionalDBDTO =
        queryprofissionalLogado.rows[0];

      conexao.close();

      return profissionalLogado;
    } catch (err) {
      return err;
    }
  }

  public async listar(profissional: Profissional): Promise<ProfissionalDBDTO> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelecionarProfissional = {
        name: 'Selecionar Usuario',
        text: 'SELECT * FROM profissional WHERE codprofissional = $1',
        values: [profissional.getId()],
      };

      const queryprofissionalListado = await pool.query(
        querySelecionarProfissional,
      );

      const profissionalListado: ProfissionalDBDTO =
        queryprofissionalListado.rows[0];

      if (profissionalListado.status === 0) {
        throw new Error();
      }

      conexao.close();

      return profissionalListado;
    } catch (err) {
      return err;
    }
  }

  public async listarTodos(): Promise<ProfissionalDBDTO[]> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelecionarProfissional = {
        name: 'Selecionar Profissionais',
        text: 'SELECT * FROM profissional WHERE status = 1',
      };

      const queryprofissionalListado = await pool.query(
        querySelecionarProfissional,
      );
      const listaProfissionais = queryprofissionalListado.rows;

      conexao.close();

      return listaProfissionais;
    } catch (err) {
      return err;
    }
  }
}

export default ProfissionalDAO;
