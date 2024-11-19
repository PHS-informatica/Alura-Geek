const BASE_URL = "https://673a74f2339a4ce4451833aa.mockapi.io/Produtos";

const ListaDeProdutos = async () => {
  try {
    const lista = await fetch(BASE_URL);
    const listaConvertida = await lista.json();
    return listaConvertida;
  } catch (error) {
    console.error("Erro ao obter a lista de produtos:", error);
  }
};

const criarProdutos = async (nome, valor, imagem) => {
  try {
    const lista = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nome, valor, imagem }),
    });

    const listaConvertida = await lista.json();
    alert(`Produto: ${nome}, cadastrado com sucesso!`, listaConvertida);
    return listaConvertida;
  } catch (error) {
    console.error("Erro: Produto não cadastrado", error);
  }
};

const deletaProdutos = async (id) => {
  try {
    // Buscar o produto pelo ID para obter o nome
    const lista = await fetch(`${BASE_URL}/${id}`);
    const product = await lista.json();
    const nome = product.nome;

    // Deletar o produto
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert(`Produto: ${nome}, deletado com sucesso!`);
  } catch (error) {
    console.error("Erro: Produto não deletado", error);
  }
};

export const manutencaoDeProdutos = {
  ListaDeProdutos,
  criarProdutos,
  deletaProdutos,
};




// implementar no campo class="pesquisar__input" o evento de pesquisa por nome na ListaDeProdutos e renderizar os produtos filtrados no DOM.
// implementar no campo class="pesquisar__input" o evento de pesquisa por nome na ListaDeProdutos e renderizar os produtos filtrados no DOM.

document.querySelector('.pesquisar__botao').addEventListener('click', async () => {
    const searchTerm = document.querySelector('.pesquisar__input').value.toLowerCase();
    const produtos = await ListaDeProdutos();
    const filteredProducts = produtos.filter(product => 
      product.nome.toLowerCase().includes(searchTerm)
    );
    renderizarProdutos(filteredProducts);
  });
  
  function renderizarProdutos(produtos) {
    const container = document.querySelector('.container-produtos');
    container.innerHTML = ''; // Limpa os produtos atuais
    produtos.forEach(produto => {
      const produtoElement = document.createElement('div');
      produtoElement.classList.add('card');
      produtoElement.innerHTML = `
        <div class="img-container">
          <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div class="card-container--info">
          <p>${produto.nome}</p>
          <div class="card-container--value">
            <p>$ ${produto.valor}</p>
            <button class="delete-button" data-id="${produto.id}">
              <img src="./assets/trashIcon.svg" alt="Eliminar">
            </button>
          </div>
        </div>
      `;  
      container.appendChild(produtoElement);
    });
  
  // Adicionar evento de clique aos botões de deletar
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', async (event) => {
      const id = event.target.closest('button').getAttribute('data-id');
      await deletaProdutos(id);
      // Atualizar a lista de produtos após a exclusão
      const produtosAtualizados = await ListaDeProdutos();
      renderizarProdutos(produtosAtualizados);
    });
  });
  }
  
  
  

