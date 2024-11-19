import { manutencaoDeProdutos } from "../services/manutencaoDeProdutos.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

// Cria estrutura HTML para ser renderizada dinâmicamente com JS
function criarProdutos({ nome, valor, imagem, id }) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
		<div class="img-container">
			<img src="${imagem}" alt="${nome}">
		</div>
		<div class="card-container--info">
			<p>${nome}</p>
			<div class="card-container--value">
				<p>$ ${valor}</p>
				<button class="delete-button" data-id="${id}">
					<img src="./assets/trashIcon.svg" alt="Eliminar">
				</button>
			</div>
		</div>
	`;

  // Evento de eliminação
  addDeleteEvent(card, id);

  return card;
}

// Evento de eliminar produto
function addDeleteEvent(card, id) {
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await manutencaoDeProdutos.deletaProdutos(id);
      card.remove();
      console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
  });
}

// Renderiza os produtos no DOM
const renderProducts = async () => {
  try {
    const listProducts = await manutencaoDeProdutos.ListaDeProdutos();
    listProducts.forEach((product) => {
      const productCard = criarProdutos(product);
      productsContainer.appendChild(productCard);
    });
  } catch (err) {
    console.error("Erro ao renderizar produtos:", err);
  }
};

// Evento de envío do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.querySelector("[data-name]").value;
  const valor = document.querySelector("[data-price]").value;
  const imagem = document.querySelector("[data-image]").value;

  if (nome === "" || valor === "" || imagem === "") {
    alert("Por favor, preenche todos os campos");
  } else {
    try {
      const newProduct = await manutencaoDeProdutos.criarProdutos(
        nome,
        valor,
        imagem
      );
      console.log("Produto criado:", newProduct);
      const newCard = criarProdutos(newProduct);
      productsContainer.appendChild(newCard);
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
    }

    form.reset(); // Reinicia o formulário
  }
});

renderProducts();
