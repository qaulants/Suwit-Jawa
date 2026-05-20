 // Pemetaan untuk mengubah teks pilihan menjadi emoji
const emojiMap = {
  'gajah': '🐘',
  'orang': '🧑',
  'semut': '🐜'
};

function getPilihanComputer(){
  const pilihan = ['gajah', 'orang', 'semut'];
  return pilihan[Math.floor(Math.random() * 3)];
}

function getHasil(comp, player){
  if (player == comp) return 'SERI';
  if (player == 'gajah') return (comp == 'orang') ? 'MENANG' : 'KALAH';
  if (player == 'orang') return (comp == 'gajah') ? 'KALAH' : 'MENANG';
  if (player == 'semut') return (comp == 'orang') ? 'KALAH' : 'MENANG';
}

function putar(){
  const compDisplay = document.getElementById('comp-display');
  const gambar = ['gajah', 'semut', 'orang'];
  let i = 0;
  const waktuMulai = new Date().getTime();

  compDisplay.classList.add('animate-shake');

  const interval = setInterval(function() {
    if(new Date().getTime() - waktuMulai > 1000){
      clearInterval(interval);
      compDisplay.classList.remove('animate-shake');
      return;
    }
    // animasi berputar mengganti teks 
    compDisplay.textContent = emojiMap[gambar[i++]];
    if(i == gambar.length) i= 0;
  }, 100);
}

const pilihan = document.querySelectorAll('.btn-pilihan');
let playerScore = 0;
let compScore = 0;
let isAnimating = false;

pilihan.forEach(function(pil){
  pil.addEventListener('click', function() {
    if(isAnimating) return;
    isAnimating = true;

    const pilihanComputer = getPilihanComputer();
    const pilihanPlayer = pil.dataset.pilihan;
    const hasil = getHasil(pilihanComputer, pilihanPlayer);

    // sembunyikan badge hasil sebelumnya
    const resultBadge = document.getElementById('result-badge');
    resultBadge.style.opacity = '0';
    resultBadge.style.transform = 'translate(-50%, -50%) scale(0.5)';

    document.getElementById('display-player').textContent = emojiMap[pilihanPlayer];

    putar();

    setTimeout(function(){
      const compDisplay = document.getElementById('comp-display');
      compDisplay.textContent = emojiMap[pilihanComputer];

      // logika skor
      if (hasil == 'MENANG') {
        playerScore += 10;
      } else if (hasil == 'KALAH'){
        compScore += 10;
      }

      // Tampilkan ke layar UI
      const elPlayerScore = document.getElementById('player-score');
      const elCompScore = document.getElementById('comp-score');
      elPlayerScore.textContent = playerScore;
      elCompScore.textContent = compScore;

      // Efek popup di UI skor
      elPlayerScore.classList.add('scale-125');
      elCompScore.classList.add('scale-125');
      setTimeout(() => {
        elPlayerScore.classList.remove('scale-125');
        elCompScore.classList.remove('scale-125');
      }, 200);
      // Panggil fungsi munculkan hasil
      showResultBadge(hasil);
      isAnimating = false;
    }, 1000);
  });
});

function showResultBadge(result){
  const badge = document.getElementById('result-badge');
  badge.className = 'absolute top-1/2 left-1/2 px-8 py-3 rounded-2xl text-xl sm:text-2xl font-black tracking-widest uppercase shadow-2xl transition-all duration-300 z-20';

  if (result === 'MENANG') {
    badge.textContent ='MENANG!';
    badge.classList.add('bg-emerald-500', 'text-white', 'shadow-rose-500/50');
  } else if (result === 'KALAH'){
    badge.textContent = 'KALAH!';
    badge.classList.add('bg-rose-500', 'text-white', 'shadow-rose-500/50');
  } else{
    badge.textContent = 'SERI!';
    badge.classList.add('bg-slate-700', 'text-white', 'shadow-slate-700/50');
  }

  requestAnimationFrame(() => {
    badge.style.opacity = '1';
    badge.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

