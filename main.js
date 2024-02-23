import API from './scripts/api.js';
import UI from './scripts/ui.js';

// Classı kullanmak için örneğini oluştur
const api = new API()
const ui = new UI()

//sayfanın yüklenme olayını izle
document.addEventListener('DOMContentLoaded', async () => {
    // 1)ekrana yüklenme gifi bas
    ui.renderLoader()
    // 2)api istek at
    await api.getPopular();
    // 3)gelen verileri ekrana bas
    ui.renderCards(api.songs)
})
// Formun gönderilme olayını izle
document.addEventListener('submit', async (e) => {
    //sayfa yenilemeyi engelle
    e.preventDefault()
    // aratılan kelimeye eriş
    const query = e.target[0].value
    // kelime boşsa uyarı göster
    if (!query.trim()) { // boş mu diye kontrol eder
        return alert("Lütfen aratılacak kelimeyi giriniz.")
    }
    // ekrana yükleniyor bas
    ui.renderLoader()
    // başlığı güncelle
    ui.changeTitle(query + ' için sonuçlar')
    //api'den şarkıları al
    await api.searchMusic(query)
    // şarkıları ekrana bas
    ui.renderCards(api.songs)
})
// cartların playBtn'ine tıklanma olayını izleme
ui.list.addEventListener('click', (e) => {
    if (e.target.id === 'play-btn') {

        // tıklanılan karttaki şarkının bilgilerini al
        const song = e.target.closest(".card").dataset // closest: en yakın '.card' olan elementi al, veya parent kullanılabilir.

        // şarkıyı oynatma kısmını ekrana bas
        ui.renderPlayingInfo(song)
    }
})

//localden mode verisini al
const mode = localStorage.getItem('mode')
document.body.className = mode === 'true' ? 'dark' : 'light'
ui.checkbox.checked = mode === 'true'
// checkboxin degerinin degisimini izle
ui.checkbox.addEventListener('change', (e) => {
    //false açık mod
    //true koyu mod
    const isDark = e.target.checked

    // kullanıcının seçtiği değeri kaybetmemek için localde tut
    localStorage.setItem('mode', isDark)

    document.body.className = isDark ? 'dark' : 'light'
})