const btnNao = document.getElementById('btnNao');
const btnSim = document.getElementById('btnSim');
const telaPedido = document.getElementById('telaPedido');
const mensagemFinal = document.getElementById('mensagemFinal');
const audioPlayer = document.getElementById('audioPlayer');

// --- LÓGICA DO "NÃO" ---
function fogeBotao() {
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;
    const maxX = larguraJanela - btnNao.offsetWidth - 50;
    const maxY = alturaJanela - btnNao.offsetHeight - 50;

    const aleatorioX = Math.max(0, Math.floor(Math.random() * maxX));
    const aleatorioY = Math.max(0, Math.floor(Math.random() * maxY));

    btnNao.style.position = "fixed";
    btnNao.style.left = aleatorioX + "px";
    btnNao.style.top = aleatorioY + "px";
}

btnNao.addEventListener('mouseover', fogeBotao);
btnNao.addEventListener('touchstart', (event) => {
    event.preventDefault();
    fogeBotao();
});

// --- LÓGICA DO "SIM" ---
btnSim.addEventListener('click', () => {
    
    // 1. Inicia a chuva de confetes
    try {
        chuvaDeConfetes();
    } catch(e) { console.log("Erro no efeito") }

    // 2. Troca a tela
    telaPedido.style.display = 'none';
    mensagemFinal.classList.remove('hidden');
    
    // 3. Toca a música
    audioPlayer.volume = 1.0;
    try {
         audioPlayer.play();
    } catch (e) { console.log("Erro audio") }

    // 4. WhatsApp
    setTimeout(() => {
        const seuNumero = "5511934994424"; // <-- SEU NÚMERO
        const mensagem = "Eu disse SIM! Te amo! ❤️";
        const linkZap = `https://wa.me/5511934994424?text=Eu%20aceito%20seu%20pedido`;
        window.open(linkZap, "_blank");
    }, 5000); // 5 segundos para aproveitar a festa
});

// Tentar play no áudio no primeiro clique
document.body.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(e => console.log("Esperando interação"));
    }
}, { once: true });


// --- EFEITO DE CHUVA DE CONFETES (TIPO O VÍDEO) ---
function chuvaDeConfetes() {
    var duration = 5 * 1000; // Duração: 5 segundos
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    // Função que gera aleatoriedade
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      
      // Cria confetes caindo de cima (origin y: -0.1)
      // Espalhando por toda a largura (x entre 0.1 e 0.9)
      confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }));
      
      // Um pouco no centro também
      confetti(Object.assign({}, defaults, { 
          particleCount: particleCount / 2,
          origin: { x: 0.5, y: -0.1 } 
      }));

    }, 250);
}