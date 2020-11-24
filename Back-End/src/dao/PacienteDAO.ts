import { Pool } from 'pg';
import Paciente from '../models/Paciente';
import FabricadeConexao from './FabricadeConexao';

class PacienteDAO {
  public async cadastrar(paciente: Paciente): Promise<void> {
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

      await pool.query(queryInsert, values);
      conexao.close();
    } catch (err) {
      console.log(err.stack);
    }
  }
}

export default PacienteDAO;
