# Chat With Eva - Frontend AI

![Preview Proyek](https://via.placeholder.com/800x400?text=Chat+Dengan+Eva+Preview) <!-- Ganti dengan screenshot asli -->

Antarmuka chat AI yang realistis untuk berinteraksi dengan "Eva" yang memiliki pola bicara, perilaku, dan kepribadian alami layaknya manusia.

## Fitur Utama

- **Kepribadian Realistis**: Eva merespons dengan gaya bicara, ekspresi, dan kedalaman emosi seperti manusia
- **Integrasi OpenRouter**: Terhubung dengan berbagai model AI melalui API OpenRouter
- **Respons Dinamis**: Balasan yang memahami konteks percakapan
- **Kecerdasan Emosional**: Eva menyesuaikan nada bicara berdasarkan situasi
- **Indikator Mengetik**: Simulasi kecepatan respons yang alami
- **Memori Percakapan**: Menyimpan riwayat chat untuk diskusi yang koheren

## Panduan Instalasi

### Persyaratan

- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- API key dari OpenRouter

### Cara Install

1. Clone repositori:

   ```bash
   git clone https://github.com/JoshuaRVLS/chat-with-eva.git
   cd chat-with-eva
   ```

2. Install dependencies:

   ```bash
   npm install
   # atau
   yarn install
   ```

3. Buat file `.env` di direktori utama dengan API key OpenRouter:

   ```
   VITE_OPENROUTER_API_KEY=masukkan_api_key_anda_disini
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

## Konfigurasi

Sesuaikan kepribadian Eva dengan mengubah variabel lingkungan ini:

```
VITE_AI_PERSONA=Eva adalah asisten AI yang ramah, penuh rasa ingin tahu, dan berkarakter hangat...
VITE_TYPING_SPEED_VARIATION=0.5  # Atur keacakan kecepatan mengetik (0-1)
VITE_RESPONSE_VARIABILITY=0.7    # Atur kreativitas respons (0-1)
```

## Sifat Kepribadian

Eva dirancang dengan karakteristik utama:

- Nada bicara hangat dan empatik
- Pola bicara alami dengan kata-kata penyerta sesekali
- Respons emosional yang kontekstual
- Gaya percakapan yang menarik dan penuh rasa ingin tahu
- Kepribadian adaptif berdasarkan interaksi pengguna

````
## Deployment

Buat versi produksi:
```bash
npm run build
````

Deploy folder `dist` ke layanan hosting pilihan Anda.

## Lisensi

MIT License

## Kontribusi

Pull request diterima. Untuk perubahan besar, silakan buat issue terlebih dahulu untuk didiskusikan.

---

**Catatan**: Proyek ini membutuhkan API key OpenRouter. Pastikan Anda mematuhi ketentuan layanan OpenRouter saat menggunakan antarmuka ini.
