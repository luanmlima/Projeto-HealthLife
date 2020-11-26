import { Pool } from 'pg';
import { lightFormat } from 'date-fns';
import FabricadeConexao from './FabricadeConexao';

class BuscaAgendamentos {
  public async getAgendamento(id: number, usuario: string): Promise<boolean> {
    const conexao = new FabricadeConexao();
    conexao.conexao();
    const pool = new Pool();

    const now = new Date();

    // eslint-disable-next-line prettier/prettier
    const dataDeHoje = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

    const querySelectAgendamentos = {
      name: 'Selecionar todos as datas dos agendamentos do usuario',
      text: `SELECT dataagendada FROM agendamento WHERE cod${usuario} = $1`,
      values: [id],
    };

    const datasAgendamentos = await pool.query(querySelectAgendamentos);

    let existeAgendamentoFuturo = false;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < datasAgendamentos.rows.length; i++) {
      const dataDoAgendamentoNoBanco = lightFormat(
        new Date(datasAgendamentos.rows[i].dataagendada),
        'yyyy-MM-dd',
      );
      if (
        dataDoAgendamentoNoBanco > dataDeHoje ||
        dataDoAgendamentoNoBanco === dataDeHoje
      ) {
        existeAgendamentoFuturo = true;
        break;
      }
    }

    return existeAgendamentoFuturo;
  }
}
export default BuscaAgendamentos;
