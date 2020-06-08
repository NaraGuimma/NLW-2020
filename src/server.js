const express = require('express');
// executar a funcao que recebeu o Express
// server será um objeto do servidor
const server = express();

//pegar o banco de dados que foi exportado pelo db.js
const db = require('./database/db');

// configurar pasta pública
// garantir o uso das nossas pastas sempre disponível na aplicação
server.use(express.static('public'));

// habilitar o uso do req.body na nossa aplicaçao
server.use(express.urlencoded({ extended: true }));

// utilizando template engine
// o nunjucks transforma as paginas html de estáticas para dinâmicas
// noCache, para nao usar nada que já esteja guardado na memória
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  // express ligado ao nunjucks
  express: server,
  noCache: true,
});

//configurar caminhos da minha aplicação
//página inicial
//req - requisicao e res - resposta
server.get('/', (req, res) => {
  // arquivo de resposta do servidor
  // puxar os html existentes
  // sendFile de enviar um arquivo
  // dirname: variável global que traz o caminho da pasta em que o server.js se encontra
  //  passar o index.html no formato string "" ou ''
  return res.render('index.html');
});
// o render vem devido a renderizacao das páginas html pelo nunjucks
// chamando rotas, nao colocar .html na chamada após a /
server.get('/create-point', (req, res) => {
  // req.query: query strings da nossa url
  // console.log(req.query);

  return res.render('create-point.html');
});
server.post('/savepoint', (req, res) => {
  // Pelo post nao se consegue pegar mais os dados usando o .query
  // req.body: corpo do nosso formulário, mas antes ele precisa ser hablitado pelo server.use(express.urlcoded({extended:true}))
  // console.log(req.body);

  //inserir dados no banco de dados

  const query = `
      INSERT INTO places (
        name,
        image,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (
        ?,?,?,?,?,?,?
      );
    `;
  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];
  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Cadastrado com sucesso');
    console.log(this);
    return res.render('create-point.html', { saved: true });
  }
  db.run(query, values, afterInsertData);
});

// o return é essencial para evitar bugs, uma vez que o server retornará com a página html
server.get('/search-results', (req, res) => {
  //pegar os dados do banco de dados

  const search = req.query.search;

  if (search === '') {
    // pesquisa vazia
    return res.render('search-results.html', { total: 0 });
  }
  // '${search}' entre aspas simples porque será uma string
  // o = tem que ser exatamente o valor
  // LIKE que contenha
  //% no início, independente do que venha antes da palavra
  //% no fim, independente do que venha depois da palavra
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro!');
    }
    // length: propriedade do array que conta a quantidade de elementos que estao dentro do array
    const total = rows.length;
    // mostrar a página html com os dados do banco de dados
    return res.render('search-results.html', { places: rows, total: total });
  });
});

// ligar o servidor
server.listen(3002);
