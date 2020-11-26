import { Pool } from 'pg';
import Agendamento from '../models/Agendamento';
import FabricadeConexao from '../utils/FabricadeConexao';

class AgendamentoDAO {
  public async cadastrar(
    agendamento: Agendamento,
  ): Promise<Agendamento | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryInsert = {
        name: 'Criar Agendamento',
        text:
          'INSERT INTO agendamento(dataagendada, codpaciente, codprofissional) VALUES($1, $2, $3) RETURNING *',
        values: [
          agendamento.getData(),
          agendamento.getPaciente()?.getId(),
          agendamento.getProfissional()?.getId(),
        ],
      };
      const agendamentoriado = await pool.query(queryInsert);

      conexao.close();

      return agendamentoriado.rows[0];
    } catch (err) {
      return err;
    }
  }

  // public async atualizar(paciente: Paciente): Promise<Paciente | Error> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const queryUpdate = {
  //       name: 'Atualizar Paciente',
  //       text:
  //         'UPDATE paciente SET nome = $1, idade = $2, status = 1 WHERE codpaciente = $3 RETURNING *',
  //       values: [paciente.getNome(), paciente.getIdade(), paciente.getId()],
  //     };

  //     const pacienteAtualizado = await pool.query(queryUpdate);

  //     conexao.close();

  //     return pacienteAtualizado.rows[0];
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // public async deletar(paciente: Paciente): Promise<number> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const querySelectPaciente = {
  //       name: 'Selecionar Paciente',
  //       text: 'SELECT usuario from paciente WHERE codpaciente = $1',
  //       values: [paciente.getId()],
  //     };

  //     const pacienteSelecionado = await pool.query(querySelectPaciente);

  //     const idUsuario: number = pacienteSelecionado.rows[0].usuario;

  //     const queryAtualizarPaciente = {
  //       name: 'Atualizar status paciente',
  //       text: 'UPDATE paciente SET status = 0 WHERE codpaciente = $1',
  //       values: [paciente.getId()],
  //     };

  //     await pool.query(queryAtualizarPaciente);

  //     conexao.close();

  //     return idUsuario;
  //   } catch (err) {
  //     return 0;
  //   }
  // }

  // public async login(paciente: Paciente): Promise<Paciente> {
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

  // public async listar(paciente: Paciente): Promise<PacienteDBDTO> {
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

  //     const pacienteLogado: PacienteDBDTO = queryPacienteLogado.rows[0];

  //     if (pacienteLogado.status === 0) {
  //       throw new Error();
  //     }

  //     conexao.close();

  //     return pacienteLogado;
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

export default AgendamentoDAO;
