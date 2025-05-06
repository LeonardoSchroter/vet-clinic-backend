const db = require('./DB.JS');

class OrquestradorAtendimento {
  static async registrarAtendimento(dadosPet, dadosProntuario) {
    const conexao = await db.getConnection(); // pega a conexão para controle transacional
    try {
      await conexao.beginTransaction();

      let idPet;

      // Verifica se o pet já existe (por nome, espécie e dono, por exemplo)
      const [petExistente] = await conexao.query(
        'SELECT id FROM pets WHERE name = ? AND species = ? AND owner_id = ?',
        [dadosPet.name, dadosPet.species, dadosPet.owner_id]
      );

      if (petExistente.length > 0) {
        idPet = petExistente[0].id;
      } else {
        // Cria o pet
        const [resultadoPet] = await conexao.query(
          `INSERT INTO pets (name, species, owner_id) VALUES (?, ?, ?)`,
          [dadosPet.name, dadosPet.species, dadosPet.owner_id]
        );
        idPet = resultadoPet.insertId;
      }

      // Cria o prontuário (a data será gerada automaticamente pelo banco)
      await conexao.query(
        `INSERT INTO records (treatment, diagnosis, pet_id) VALUES (?, ?, ?)`,
        [dadosProntuario.treatment, dadosProntuario.diagnosis, idPet]
      );

      await conexao.commit();
      console.log('Atendimento registrado com sucesso!');
    } catch (erro) {
      await conexao.rollback();
      console.error('Erro ao registrar atendimento:', erro.message);
      throw new Error('Erro ao registrar atendimento: ' + erro.message);
    } finally {
      conexao.release();
    }
  }
}

module.exports = OrquestradorAtendimento;