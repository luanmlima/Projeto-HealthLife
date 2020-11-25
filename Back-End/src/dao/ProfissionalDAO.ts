import { Pool } from 'pg';
import Profissional from '../models/Profissional';
import FabricadeConexao from '../utils/FabricadeConexao';

interface ProfissionalDBDTO {
  codprofissional: number;
  especialidade: string;
  anosExperiencia: number;
  nome: string;
  codendereco: number;
  usuario: number;
  cpf: string;
  numeroDiploma: number;
  numeroCarteira: number;
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

      const queryUpdate = {
        name: 'Atualizar Profissional',
        text:
          'UPDATE profissional SET experiencia = $1, nome = $2, numero_diploma = $3, numero_carteira = $4 WHERE codprofissional = $5 RETURNING *',
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

      const pacienteSelecionado = await pool.query(querySelectProfissional);

      const idUsuario: number = pacienteSelecionado.rows[0].usuario;

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

  // public async login(profissional: Paciente): Promise<Paciente> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const queryPacienteLogin = {
  //       name: 'Selecionar Usuario',
  //       text: 'SELECT * FROM paciente WHERE usuario = $1',
  //       values: [paciente.getUsuario()?.getId()],
  //     };

  //     const queryPacienteLogado = await pool.query(queryPacienteLogin);

  //     const pacienteLogado: Paciente = queryPacienteLogado.rows[0];

  //     conexao.close();

  //     return pacienteLogado;
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // public async listar(paciente: Paciente): Promise<Paciente> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const queryPacienteLogin = {
  //       name: 'Selecionar Usuario',
  //       text: 'SELECT * FROM paciente WHERE codpaciente = $1',
  //       values: [paciente.getId()],
  //     };

  //     const queryPacienteLogado = await pool.query(queryPacienteLogin);

  //     const pacienteLogado: Paciente = queryPacienteLogado.rows[0];

  //     conexao.close();

  //     return pacienteLogado;
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

export default ProfissionalDAO;
