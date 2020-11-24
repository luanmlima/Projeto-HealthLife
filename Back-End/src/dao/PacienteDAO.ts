import { Pool } from 'pg';
import Paciente from '../models/Paciente';
import FabricadeConexao from '../utils/FabricadeConexao';

class PacienteDAO {
  public async cadastrar(paciente: Paciente): Promise<Paciente | Error> {
    try {
      const conexao = new FabricadeConexao();
      conexao.conexao();
      const pool = new Pool();

      const queryInsert =
        'INSERT INTO paciente(nome, cpf, idade, usuario) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [
        paciente.getNome(),
        paciente.getCpf(),
        paciente.getIdade(),
        paciente.getUsuario()?.getId(),
      ];

      const pacienteCriado = await pool.query(queryInsert, values);

      conexao.close();

      return pacienteCriado.rows[0];
    } catch (err) {
      return err;
    }
  }
}

export default PacienteDAO;
