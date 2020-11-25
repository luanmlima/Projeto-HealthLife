import { Pool } from 'pg';
import Profissional from '../models/Profissional';
import FabricadeConexao from '../utils/FabricadeConexao';

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

  // public async atualizar(paciente: Paciente): Promise<Paciente | Error> {
  //   try {
  //     const conexao = new FabricadeConexao();
  //     conexao.conexao();
  //     const pool = new Pool();

  //     const queryUpdate = {
  //       name: 'Atualizar Paciente',
  //       text:
  //         'UPDATE paciente SET nome = $1, idade = $2 WHERE codpaciente = $3 RETURNING *',
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

  //     const queryDeletarPaciente = {
  //       name: 'Deletar Paciente',
  //       text: 'DELETE FROM paciente WHERE codpaciente = $1',
  //       values: [paciente.getId()],
  //     };

  //     await pool.query(queryDeletarPaciente);

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
