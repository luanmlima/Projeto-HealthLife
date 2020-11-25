import { Pool } from 'pg';
import FabricadeConexao from './FabricadeConexao';

class BuscarPorCPFDAO {
  public async getCPF(cpf: string, tabela: string): Promise<boolean | number> {
    const conexao = new FabricadeConexao();
    conexao.conexao();
    const pool = new Pool();

    const querySelectUsuario = {
      name: 'Bucar cpf',
      text: `SELECT * FROM ${tabela} WHERE cpf = $1`,
      values: [cpf],
    };

    const usuarioExiste = await pool.query(querySelectUsuario);

    if (usuarioExiste.rows[0]) {
      if (usuarioExiste.rows[0].status === 0) {
        return tabela === 'paciente'
          ? usuarioExiste.rows[0].codpaciente
          : usuarioExiste.rows[0].codprofissional;
      }
      return true;
    }

    return false;
  }
}
export default BuscarPorCPFDAO;
