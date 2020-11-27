import { Pool } from 'pg';
import FabricadeConexao from '../utils/FabricadeConexao';

class VerificarData {
  public async verify(data: Date, idProfissional: number): Promise<boolean> {
    const conexao = new FabricadeConexao();
    conexao.conexao();
    const pool = new Pool();

    const querySelectUsuario = {
      name: 'Bucar data',
      text: `SELECT * FROM agendamento WHERE dataagendada = $1 AND codprofissional = $2`,
      values: [data, idProfissional],
    };

    const dataJaExiste = await pool.query(querySelectUsuario);

    if (dataJaExiste.rows[0]) {
      return true;
    }

    return false;
  }
}
export default VerificarData;
