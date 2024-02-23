// API istegi attığımız fonksiyon
const options = {
    headers: {
        'X-RapidAPI-Key': 'eaff681099mshef35ee76fabf6fbp18a96bjsn880cb3aaec6b',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
    },
}
// API işlemlerini yöneten class
export default class API {
    //kurucu method
    constructor() {
        this.songs = []
    }
    // Popüler Türk müziklerini alıyoruz
    async getPopular() {
        const res = await fetch(
            'https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-TR&locale=tr',
            options
        );
        // Gelen veriyi işle
        const data = await res.json();

        // Class'ta tanımlanan songs değişkenine verileri aktar
        this.songs = data.tracks
    }
    // Aratılan kelimeye uygun şarkıları al
    async searchMusic(query) {
        const res = await fetch(`
        https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`,
            options);
        //Gelen cevabı işle
        const data = await res.json();

        // Gelen cevabın formatını değiştir
        const formatted = data.tracks.hits.map((song) => {
            return song.track
        })
        // Gelen veriyi değişkene aktar
        this.songs = formatted
    }
}