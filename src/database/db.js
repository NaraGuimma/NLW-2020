// importar a dependência do sqlite3
// funçao que reside dentro do objeto é denominada método
// verbose - traz mais mensagens no terminal, retorna um objeto
const sqlite3 = require('sqlite3').verbose();
// iniciar o objeto que irá fazer operaçoes no banco de dados
// 1a forma:
// const db = {
//   propriedade:valor;
// }
// 2a forma:
// new: novo objeto, quando seguido de um constructor ou uma classe
const db = new sqlite3.Database('./src/database/database.db');

// //exportar o objeto db
module.exports = db;

// utilizar o objeto de banco de dados para as operaçoes
//serialize: método que indica que vai rodar uma sequencia de códigos
db.serialize(() => {
  //   // tudo será feito com comandos SQL:
  //   //1. criar a tabela
  //   // as aspass servem para quebra de linha `` - template literals ou template strings
  //   db.run(`
  //     CREATE TABLE IF NOT EXISTS places (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       name TEXT,
  //       image TEXT,
  //       address TEXT,
  //       address2 TEXT,
  //       state TEXT,
  //       city TEXT,
  //       items TEXT
  //     );
  // `);
  //   //2. inserir dados na tabela
  //   const query = `
  //   INSERT INTO places (
  //     name,
  //     image,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (
  //     ?,?,?,?,?,?,?
  //   );
  // `;
  //   const values = [
  //     'Papersider',
  //     'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  //     'Guilherme Gemballa, Jardim América',
  //     'Nº 260',
  //     'Santa Catarina',
  //     'Rio do Sul',
  //     'Papéis e Papelao',
  //   ];
  //   function afterInsertData(err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log('Cadastrado com sucesso');
  //     console.log(this);
  //   }
  //   db.run(query, values, afterInsertData);
  //   //3. consultar os dados da tabela
  //   // db.all(`SELECT name FROM places`, function (err, rows) {
  //   //   if (err) {
  //   //     return console.log(err);
  //   //   }
  //   //   console.log('Seus registros');
  //   //   console.log(rows);
  //   // });
  //   //4. deletar dados da tabela
  // db.run(`DELETE FROM places WHERE id =?`, [3], function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log('Deletado com sucesso!');
  // });
});
