// Módulos
const ProductModule = {
    produtos: [
        {
            nome: "Máquina De Cortar Cabelo Para Barba Masculina Designer Aleatório Elétrico Profissional",
            preco: 16.99,
            precoOriginal: 100.00,
            precoMaximo: 19.99,
            precoMaximoOriginal: 100.00,
            desconto: 83,
            imagem: "./imagens/9.jpg",
            link: "https://s.shopee.com.br/1ViDSpVZIh",
            categoria: "casa",
            variacoes: true
        },
        {
            nome: "Kit 3 Garrafa Agua Squeeze Galão Com Adesivos Lembretes beber Agua",
            preco: 23.90,
            precoOriginal: 99.00,
            desconto: 76,
            imagem: "./imagens/8.jpg",
            link: "https://s.shopee.com.br/8UrxnDclIg",
            categoria: "casa",
            parcelas: {
                quantidade: 4,
                valor: 6.03
            }
        },
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
        },
        {
            nome: "Pano de prato estampado com bainha",
            preco: 18.07,
            precoOriginal: 19.97,
            desconto: 10,
            imagem: "./imagens/10.jpg",
            link: "https://s.shopee.com.br/2qDb3xinEf",
            categoria: "casa"
        }
    ],
    
    criarCardProduto(produto) {
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
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                         data-src="${produto.imagem}" 
                         alt="${produto.nome}"
                         loading="lazy"
                         class="lazy">
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
};

const UIModule = {
    init() {
        this.initLazyLoading();
        this.initSmoothScroll();
        this.initCategories();
        this.loadProducts();
    },

    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    },

    initSmoothScroll() {
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
    },

    initCategories() {
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

        this.addCategoryListeners();
    },

    addCategoryListeners() {
        document.querySelectorAll('.categoria').forEach(catElement => {
            catElement.addEventListener('click', () => {
                document.querySelectorAll('.categoria').forEach(el => 
                    el.classList.remove('categoria-ativa'));
                
                catElement.classList.add('categoria-ativa');
                this.loadProducts(catElement.dataset.categoria);
            });
        });
    },

    loadProducts(categoria = 'todos') {
        const produtosGrid = document.querySelector('.produtos-grid');
        produtosGrid.innerHTML = '';

        const produtosFiltrados = categoria === 'todos' 
            ? ProductModule.produtos 
            : ProductModule.produtos.filter(produto => produto.categoria === categoria);

        produtosFiltrados.forEach(produto => {
            produtosGrid.innerHTML += ProductModule.criarCardProduto(produto);
        });

        this.initLazyLoading();
    }
};

// Cache Module
const CacheModule = {
    set(key, data, ttl = 3600) {
        const item = {
            data,
            timestamp: Date.now(),
            ttl: ttl * 1000
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    get(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const { data, timestamp, ttl } = JSON.parse(item);
        if (Date.now() - timestamp > ttl) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    },

    clear() {
        localStorage.clear();
    }
};

// Error Handler Module
const ErrorModule = {
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        // Implementar sistema de log de erros aqui
    }
};

// Snow Effect Module
const SnowModule = {
    init() {
        this.createSnowflakes();
    },

    createSnowflakes() {
        const numberOfSnowflakes = 50;
        
        for (let i = 0; i < numberOfSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 8}s`;
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
            document.body.appendChild(snowflake);

            // Remove snowflake after animation
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
                this.createOneSnowflake();
            });
        }
    },

    createOneSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 8}s`;
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
        document.body.appendChild(snowflake);

        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            this.createOneSnowflake();
        });
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    try {
        UIModule.init();
        SnowModule.init();
    } catch (error) {
        ErrorModule.handleError(error, 'application initialization');
    }
});
