import { Pool } from 'pg';
import Agendamento from '../models/Agendamento';
import FabricadeConexao from '../utils/FabricadeConexao';

interface EnderecoAgendamento {
  rua: string;
  cidade: string;
  bairro: string;
  numero: number;
  sala: number;
}

interface AgendamentoCompletoDTO {
  numeroAgendamento: number;
  nomePaciente: string;
  idadePaciente: number;
  nomeProfissional: string;
  especialidadeProfissional: string;
  endereco: EnderecoAgendamento;
}

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

  public async atualizar(
    agendamento: Agendamento,
  ): Promise<Agendamento | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryUpdate = {
        name: 'Atualizar Agendamento',
        text:
          'UPDATE agendamento SET dataagendada = $1 WHERE codagendamento = $2 RETURNING *',
        values: [agendamento.getData(), agendamento.getId()],
      };

      const agendamentoAtualizado = await pool.query(queryUpdate);

      conexao.close();

      return agendamentoAtualizado.rows[0];
    } catch (err) {
      return err;
    }
  }

  public async deletar(agendamento: Agendamento): Promise<number> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      console.log(agendamento.getId());

      const queryDeletarAgendamento = {
        name: 'Deletar Agendamento',
        text: 'DELETE FROM agendamento WHERE codagendamento = $1',
        values: [agendamento.getId()],
      };

      const agendamentoDeletado = await pool.query(queryDeletarAgendamento);

      console.log(agendamentoDeletado);

      conexao.close();

      return 1;
    } catch (err) {
      console.log(err);

      return 0;
    }
  }

  public async listar(
    agendamento: Agendamento,
    usuario: string,
  ): Promise<AgendamentoCompletoDTO[]> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const id =
        usuario === 'paciente'
          ? agendamento.getPaciente()?.getId()
          : agendamento.getProfissional()?.getId();

      const queryPacienteLogin = {
        name: 'Selecionar Agendamentos',
        text: `select agendamento.codagendamento as numeroAgendamento, agendamento.dataagendada,
        paciente.nome as nomePaciente, paciente.idade as idadePaciente,
        profissional.nome as nomeProfissional, profissional.especialidade as especialidadeProfissional, endereco.*
          from agendamento
        inner join paciente on paciente.codpaciente = agendamento.codpaciente
        inner join profissional on profissional.codprofissional = agendamento.codprofissional
        inner join endereco on endereco.codendereco = profissional.codendereco
        where agendamento.cod${usuario} = $1`,
        values: [id],
      };

      const queryPacienteLogado = await pool.query(queryPacienteLogin);

      const agendamentos: AgendamentoCompletoDTO[] = [];

      queryPacienteLogado.rows.forEach(agendament => {
        const agendametosCompletos: AgendamentoCompletoDTO = {
          numeroAgendamento: agendament.numeroagendamento,
          nomePaciente: agendament.nomepaciente,
          idadePaciente: agendament.idadepaciente,
          nomeProfissional: agendament.nomeprofissional,
          especialidadeProfissional: agendament.especialidadeprofissional,
          endereco: {
            rua: agendament.rua,
            cidade: agendament.cidade,
            bairro: agendament.bairro,
            numero: agendament.numero,
            sala: agendament.sala,
          },
        };
        agendamentos.push(agendametosCompletos);
      });

      conexao.close();
      return agendamentos;
    } catch (err) {
      return err;
    }
  }

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
