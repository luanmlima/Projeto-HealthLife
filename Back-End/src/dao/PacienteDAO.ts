import { Pool } from 'pg';
import Paciente from '../models/Paciente';
import FabricadeConexao from '../utils/FabricadeConexao';

interface PacienteDBDTO {
  codpaciente: number;
  nome: string;
  cpf: string;
  idade: number;
  status: number;
}

class PacienteDAO {
  public async cadastrar(paciente: Paciente): Promise<Paciente | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryInsert = {
        name: 'Criar funcionario',
        text:
          'INSERT INTO paciente(nome, cpf, idade, usuario) VALUES($1, $2, $3, $4) RETURNING *',
        values: [
          paciente.getNome(),
          paciente.getCpf(),
          paciente.getIdade(),
          paciente.getUsuario()?.getId(),
        ],
      };
      const pacienteCriado = await pool.query(queryInsert);

      conexao.close();

      return pacienteCriado.rows[0];
    } catch (err) {
      return err;
    }
  }

  public async atualizar(paciente: Paciente): Promise<Paciente | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryUpdate = {
        name: 'Atualizar Paciente',
        text:
          'UPDATE paciente SET nome = $1, idade = $2, status = 1 WHERE codpaciente = $3 RETURNING *',
        values: [paciente.getNome(), paciente.getIdade(), paciente.getId()],
      };

      const pacienteAtualizado = await pool.query(queryUpdate);

      conexao.close();

      return pacienteAtualizado.rows[0];
    } catch (err) {
      return err;
    }
  }

  public async deletar(paciente: Paciente): Promise<number> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const querySelectPaciente = {
        name: 'Selecionar Paciente',
        text: 'SELECT usuario from paciente WHERE codpaciente = $1',
        values: [paciente.getId()],
      };

      const pacienteSelecionado = await pool.query(querySelectPaciente);

      const idUsuario: number = pacienteSelecionado.rows[0].usuario;

      const queryAtualizarPaciente = {
        name: 'Atualizar status paciente',
        text: 'UPDATE paciente SET status = 0 WHERE codpaciente = $1',
        values: [paciente.getId()],
      };

      await pool.query(queryAtualizarPaciente);

      conexao.close();

      return idUsuario;
    } catch (err) {
      return 0;
    }
  }

  public async login(paciente: Paciente): Promise<Paciente> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryPacienteLogin = {
        name: 'Selecionar Usuario',
        text: 'SELECT * FROM paciente WHERE usuario = $1',
        values: [paciente.getUsuario()?.getId()],
      };

      const queryPacienteLogado = await pool.query(queryPacienteLogin);

      const pacienteLogado: Paciente = queryPacienteLogado.rows[0];

      conexao.close();

      return pacienteLogado;
    } catch (err) {
      return err;
    }
  }

  public async listar(paciente: Paciente): Promise<PacienteDBDTO> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryPacienteLogin = {
        name: 'Selecionar Usuario',
        text: 'SELECT * FROM paciente WHERE codpaciente = $1',
        values: [paciente.getId()],
      };

      const queryPacienteLogado = await pool.query(queryPacienteLogin);

      const pacienteLogado: PacienteDBDTO = queryPacienteLogado.rows[0];

      if (pacienteLogado.status === 0) {
        throw new Error();
      }

      conexao.close();

      return pacienteLogado;
    } catch (err) {
      return err;
    }
  }
}

export default PacienteDAO;
