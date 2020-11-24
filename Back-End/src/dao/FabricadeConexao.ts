import { Pool } from 'pg';
import env from 'dotenv';

class FabricaConexao {
  poll = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
    password: process.env.PGPASSWORD,
  });

  public conexao(): void {
    env.config();

    this.poll
      .connect()
      .then(() => console.log('connected'))
      .catch(err => console.error('connection error: ', err.stack));
  }

  public close() {
    this.poll.end();
  }
}

export default FabricaConexao;
