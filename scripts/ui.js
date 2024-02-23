// Arayüz DOM işlemleri
export default class UI {
    constructor() {
      this.list = document.querySelector('#list')
      this.form = document.querySelector('#search-form')
      this.title = document.querySelector('#title')
      this.playArea = document.querySelector('.play-area')
      this.checkbox = document.querySelector('#mode-checkbox')
    }
    // Liste alanına yüklenme gifi basar
    renderLoader() {
      this.list.innerHTML = `
          <div class="loader">
          <div class="circle outer"></div>
          <div class="circle inner"></div>
          </div>`;
  
    }
    // Ekrana kartları bas
    renderCards(songs) {
      // Loader ekrandan kaldır
      this.list.innerHTML = ''
      //dizideki her bir eleman için aşağıdaki fonksiyonu çalıştır
      songs.forEach((songs) => {
        // 1) elementi oluştur
        const div = document.createElement('div')
        // 2) class ekleme
        div.className = 'card'
        // 3) innerHTML belirle
        div.innerHTML = `
              <figure>
                <img
                  src="${songs.images.coverarthq}"
                />
                <div id="play">
                  <i id="play-btn" class="bi bi-play-fill"></i>
                </div>
              </figure>
  
              <h4>${songs.title}</h4>
              <p>${songs.subtitle}</p>`
        // 4) daha sonra erişebilmek için data verileri ekle
        div.dataset.title = songs.title
        div.dataset.photo = songs.images.coverarthq
        div.dataset.url = songs.hub?.actions[1].uri // link gelmezse ? koyduk
        // 5) kartı html'e gönder
        this.list.appendChild(div)
      });
    }
    // Başlığı günceller
    changeTitle(text) {
      this.title.innerText = text
    }
    // Müzik oynatma kısmını ekrana bas
    renderPlayingInfo(song) {
      this.playArea.innerHTML = `
          <div class="play-area">
        <div>
          <img
            class="animate"
            src="${song.photo}"
            alt=""
          />
          <div>
            <p>Şu an oynatılıyor</p>
            <h3>${song.title}</h3>
          </div>
        </div>
        <audio controls autoplay src="${song.url}"></audio>
          `
    }
  }