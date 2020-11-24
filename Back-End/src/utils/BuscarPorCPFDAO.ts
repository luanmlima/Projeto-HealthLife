import { Pool } from 'pg';
import FabricadeConexao from './FabricadeConexao';

class BuscarPorCPFDAO {
  public async getCPF(cpf: string, tabela: string): Promise<boolean> {
    const conexao = new FabricadeConexao();
    conexao.conexao();
    const pool = new Pool();

    const querySelectPaciente = {
      name: 'Bucar-login',
      text: `SELECT * FROM ${tabela} WHERE cpf = $1`,
      values: [cpf],
    };

    const pacienteExiste = await pool.query(querySelectPaciente);

    if (pacienteExiste.rows[0]) {
      return true;
    }

    return false;
  }
}
export default BuscarPorCPFDAO;
