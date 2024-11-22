// Produtos reais da Shopee com links de afiliado
const produtos = [
    {
        nome: "Caixa Kit Com 300 Lenços/Toalhas Umedecida Kit Higiene Bebe Promoção",
        preco: 7.99,
        precoOriginal: 9.50,
        precoMaximo: 27.99,
        precoMaximoOriginal: 30.99,
        desconto: 16,
        imagem: "./imagens/5.jpg",
        link: "https://s.shopee.com.br/40PWP7dDoe",
        categoria: "bebe",
        variacoes: true
    },
    {
        nome: "Camiseta Oversized Estampa Blessed Street Masculina Algodão Premium",
        preco: 42.53,
        precoOriginal: 59.90,
        desconto: 29,
        imagem: "./imagens/4.jpg",
        link: "https://s.shopee.com.br/qSUckGgPi",
        categoria: "moda",
        parcelas: {
            quantidade: 8,
            valor: 6.01
        }
    },
    {
        nome: "Celular Xiaomi Redmi 12 256GB/128GB Dual Sim 8GB/4GB Ram Global",
        preco: 1950.00,
        precoOriginal: 1950.00,
        desconto: 0,
        imagem: "./imagens/3.jpg",
        link: "https://s.shopee.com.br/BCnoXvXjU",
        categoria: "eletronicos",
        parcelas: {
            quantidade: 12,
            valor: 162.50
        }
    },
    {
        nome: "Kit Whey Protein Fusion + Bcaa + Creatina + Shaker",
        preco: 79.90,
        precoOriginal: 99.90,
        desconto: 20,
        imagem: "./imagens/2.jpg",
        link: "https://s.shopee.com.br/8UrviG3f9L",
        categoria: "suplementos"
    },
    {
        nome: "Mini Liquidificador Portátil Shake 6 Laminas + Cabo USB",
        preco: 23.70,
        precoOriginal: 47.40,
        desconto: 50,
        imagem: "./imagens/1.jpg",
        link: "https://s.shopee.com.br/LWDzqbTTP",
        categoria: "casa"
    }
];

// Função para criar card de produto
function criarCardProduto(produto) {
    const parcelamento = produto.parcelas 
        ? `<p class="parcelas">ou ${produto.parcelas.quantidade}x de R$ ${produto.parcelas.valor.toFixed(2)}</p>`
        : '';

    const precoHtml = produto.variacoes 
        ? `<p class="preco">R$ ${produto.preco.toFixed(2)} - R$ ${produto.precoMaximo.toFixed(2)}</p>
           <p class="preco-original">R$ ${produto.precoOriginal.toFixed(2)} - R$ ${produto.precoMaximoOriginal.toFixed(2)}</p>`
        : `<p class="preco">R$ ${produto.preco.toFixed(2)}</p>
           ${produto.desconto > 0 ? `<p class="preco-original">R$ ${produto.precoOriginal.toFixed(2)}</p>` : ''}`;

    return `
        <div class="produto-card" data-categoria="${produto.categoria}">
            <div class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}">
                ${produto.desconto > 0 ? `<span class="desconto">-${produto.desconto}%</span>` : ''}
            </div>
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                ${precoHtml}
                ${parcelamento}
                <a href="${produto.link}" class="comprar-button" target="_blank">Comprar na Shopee</a>
            </div>
        </div>
    `;
}

// Função para carregar produtos
function carregarProdutos(categoria = 'todos') {
    const produtosGrid = document.querySelector('.produtos-grid');
    produtosGrid.innerHTML = ''; // Limpa o conteúdo atual

    const produtosFiltrados = categoria === 'todos' 
        ? produtos 
        : produtos.filter(produto => produto.categoria === categoria);

    produtosFiltrados.forEach(produto => {
        produtosGrid.innerHTML += criarCardProduto(produto);
    });
}

// Função para inicializar as categorias
function inicializarCategorias() {
    const categoriasContainer = document.querySelector('.categorias-grid');
    const categorias = [
        { id: 'todos', nome: 'Todos', icone: 'fa-store' },
        { id: 'bebe', nome: 'Bebê', icone: 'fa-baby' },
        { id: 'moda', nome: 'Moda', icone: 'fa-tshirt' },
        { id: 'eletronicos', nome: 'Eletrônicos', icone: 'fa-mobile-alt' },
        { id: 'casa', nome: 'Casa', icone: 'fa-home' },
        { id: 'suplementos', nome: 'Suplementos', icone: 'fa-dumbbell' }
    ];

    categoriasContainer.innerHTML = categorias.map(cat => `
        <div class="categoria" data-categoria="${cat.id}">
            <i class="fas ${cat.icone}"></i>
            <h3>${cat.nome}</h3>
        </div>
    `).join('');

    // Adicionar eventos de clique nas categorias
    document.querySelectorAll('.categoria').forEach(catElement => {
        catElement.addEventListener('click', () => {
            // Remove classe ativa de todas as categorias
            document.querySelectorAll('.categoria').forEach(el => 
                el.classList.remove('categoria-ativa'));
            
            // Adiciona classe ativa na categoria clicada
            catElement.classList.add('categoria-ativa');
            
            // Carrega os produtos da categoria
            carregarProdutos(catElement.dataset.categoria);
        });
    });
}

// Carregar produtos e inicializar categorias quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    inicializarCategorias();
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
