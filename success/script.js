// Função para criar corações
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.hearts-container').appendChild(heart);
    
    // Remove o coração após a animação
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Cria corações a cada 300ms
setInterval(createHeart, 300);

// Função para gerar rotação aleatória
function getRandomRotation() {
    return Math.random() * 10 - 5; // Rotação entre -5 e 5 graus
}

// Função para carregar as fotos
function loadPhotos() {
    const container = document.getElementById('photosContainer');
    
    // Carregar as 10 fotos
    for (let i = 1; i <= 10; i++) {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo-item');
        photoDiv.style.setProperty('--rotation', `${getRandomRotation()}deg`);
        
        const img = document.createElement('img');
        // Ajustando o caminho para funcionar no Cloudflare Pages
        img.src = `/Photos/foto${i}.jpg`;
        img.alt = 'Nossa foto';
        
        // Adicionar tratamento de erro para imagens que não carregam
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x400?text=Adicione+sua+foto+aqui';
        };
        
        // Adicionar evento de clique para visualização em tela cheia em dispositivos móveis
        img.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    this.requestFullscreen().catch(err => {
                        console.log(`Erro ao tentar entrar em tela cheia: ${err.message}`);
                    });
                }
            }
        });
        
        photoDiv.appendChild(img);
        container.appendChild(photoDiv);
    }
}

// Função para verificar se o dispositivo é móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Carrega as fotos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
    
    // Inicia a música
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.5; // Define o volume para 50%
    
    // Adiciona um botão para tocar a música em dispositivos móveis
    if (isMobileDevice()) {
        const playButton = document.createElement('button');
        playButton.innerHTML = '▶️ Tocar Música';
        playButton.style.position = 'fixed';
        playButton.style.bottom = '20px';
        playButton.style.right = '20px';
        playButton.style.zIndex = '1000';
        playButton.style.padding = '10px 15px';
        playButton.style.borderRadius = '50px';
        playButton.style.background = 'rgba(255, 255, 255, 0.8)';
        playButton.style.border = 'none';
        playButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        playButton.style.cursor = 'pointer';
        
        playButton.addEventListener('click', () => {
            bgMusic.play().catch(error => {
                console.log('Erro ao tocar música:', error);
            });
            playButton.style.display = 'none';
        });
        
        document.body.appendChild(playButton);
    } else {
        // Em desktop, tenta tocar a música automaticamente
        bgMusic.play().catch(error => {
            console.log('Erro ao tocar música:', error);
        });
    }
}); 