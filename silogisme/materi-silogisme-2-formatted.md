### Video Materi
- https://youtu.be/M4EM0J4yJp0?si=ZGwJ-kxur-k7wPBR
- https://youtu.be/NqtwlDF0J1s?si=HHCyWKUitT2pGbgk

---
### Contoh Umum:
- p = hari ini hujan
- q = saya membawa payung

- (~q) saya tidak membawa payung, (~p) hari ini tidak hujan (benar)
- (~p) hari ini tidak hujan, (~q) saya tidak membawa payung (salah/tidak dapat disimpulkan) --> ini merupakan contoh menyangkal anteseden (sebab), contoh lain kondisi serupa tetapi tidak sama ada di bagian MENYANGKAL ANTESEDEN

- (q) saya membawa payung, (p) hari ini hujan (salah/tidak dapat disimpulkan)
- (p) hari ini hujan, (q) saya membawa payung (benar)

- ~p v q hari ini tidak hujan atau saya membawa payung (ekuivalen)
- ~q v p saya tidak membawa payung atau hari ini hujan (tidak ekuivalen)

- ~p ʌ q hari ini tidak hujan dan saya membawa payung (bukan kesimpulan dan bukan negasi)
- p ʌ ~q hari ini hujan dan saya tidak membawa payung (negasi/ingkaran terhadap peraturan)

---
Semua tas yang sudah melewati proses penjahitan DAN finishing dilakukan pengecekan kualitas. Tas yang diproduksi hari ini belum dicek kualitasnya.

- p = tas yang sudah melewati proses penjahitan
- q = tas yang sudah melewati finishing
- r = dilakukan pengecekan kualitas

**Model logika:**
(p ʌ q) -> r = Semua tas yang sudah melewati proses penjahitan dan finishing dilakukan pengecekan kualitas
~r = Tas yang diproduksi hari ini belum dicek kualitasnya

**Kesimpulan**
~r -> ~(p v q)
(~r) Tas yang diproduksi hari ini belum dicek kualitasnya.(~(p v q)) Tas yang diproduksi hari ini belum melewati proses penjahitan ATAU belum melewati proses finishing

**Penjelasan Sederhana:**
Premis awal mengatakan bahwa untuk bisa dicek kualitasnya, sebuah tas harus memenuhi dua syarat sekaligus: sudah dijahit DAN sudah difinishing.
Faktanya, tas hari ini belum dicek kualitasnya. Ini berarti tas tersebut pasti telah gagal memenuhi setidaknya *salah satu* dari dua syarat wajib tersebut. Mungkin proses penjahitannya belum selesai, atau mungkin proses finishingnya yang belum selesai, atau bahkan kedua-duanya belum selesai. Ketiga kemungkinan ini dirangkum dengan sempurna oleh kata "ATAU"

---
#### SEMPURNAKAN STRUKTUR CONTOH DI BAWAH INI
**Premis Baru:** "Semua tas yang sudah melewati proses penjahitan ATAU finishing dilakukan pengecekan kualitas."
**Model Logika:** (p v q) → r
**Fakta:** "Tas yang diproduksi hari ini belum dicek kualitasnya."
**Model Logika:** ~r

Sekarang, dengan menggunakan Modus Tollens:
Jika (p v q) → r benar, dan ~r benar, maka kesimpulannya adalah ~(p v q).
Menurut Hukum De Morgan, ~(p v q) ekuivalen dengan ~p ʌ ~q.
**Kesimpulan dari Premis Baru:** "Tas yang diproduksi hari ini belum melewati proses penjahitan DAN belum melewati proses finishing."

**Logikanya:** Jika menyelesaikan salah satu dari dua proses itu (jahit ATAU finishing) saja sudah cukup untuk memicu pengecekan kualitas, dan ternyata pengecekan tidak terjadi, maka kita bisa 100% yakin bahwa kedua proses tersebut pasti belum ada yang selesai

---
- p: Seorang seniman ingin mengadakan pameran.
- q: Ia harus mendapat persetujuan dari galeri

**Kesimpulan:**
~q -> ~p Ia tidak mendapatkan persetujuan dari galeri, maka ia tidak mengadakan pameran

~p v q Seorang seniman tidak ingin mengadakan pameran atau ia mendapat persetujuan dari galeri

---
### DISTRAKTOR
Meskipun terdapat 3 premis, jika salah 1 premis adalah distraktor maka kesimpulan didapatkan dari 2 premis

**Contoh 1**
- Premis 1: Semua bunga mawar di taman ini berwarna merah.
- Premis 2: Sebagian bunga yang harum adalah bunga mawar.
- Premis 3: Beberapa tanaman berwarna merah tidak disukai serangga.

- Premis 2: (p) Sebagian bunga yang harum adalah (q) bunga mawar.
- Premis 1: (q) Semua bunga mawar di taman ini berwarna merah (r).

kesimpulan dari 2 premis ini adalah sebagian bunga yang harum berwarna merah

Premis 3: Premis 3: Beberapa tanaman berwarna merah tidak disukai serangga. Merupakan DISTRAKTOR

**Mengapa ini distraktor?**
- Premis ini memberikan informasi baru tentang kategori "tanaman berwarna merah", yaitu sebagian di antaranya "tidak disukai serangga".
- Kesalahan yang mungkin terjadi adalah mencoba menyimpulkan: "Sebagian bunga yang harum tidak disukai serangga."
- Kesimpulan ini tidak valid karena tidak ada jaminan logis bahwa "bunga harum berwarna merah" (yang kita simpulkan dari P1 & P2) adalah bagian dari kelompok "tanaman berwarna merah yang tidak disukai serangga" (yang disebutkan di P3).

**Premis 3 tidak akan menjadi distraktor jika:**
- Premis 1: Semua bunga mawar di taman ini berwarna merah.
- Premis 2: Sebagian bunga yang harum adalah bunga mawar.
- Premis 3: SEMUA tanaman berwarna merah tidak disukai serangga.

Sehingga kesimpulan: P2 & P1 adalah Sebagian bunga yang harum berwarna merah
Kemudian dihubungkan dengan P3 menjadi Sebagian bunga yang harum tidak disukai serangga

**Selanjutnya, bagaimana jika premisnya menjadi:**
- Premis 1: Sebagian bunga mawar di taman ini berwarna merah.
- Premis 2: Sebagian bunga yang harum adalah bunga mawar.
- Premis 3: SEMUA tanaman berwarna merah tidak disukai serangga.

Kesimpulannya: tidak dapat disimpulkan

---
https://www.youtube.com/watch?v=NqtwlDF0J1s&t=220s

**Pada contoh Al-Faiz ini no 10:**
- Semua pesawat adalah kendaraan
- Sebagian kendaraan tidak komersial
- Kesimpulan: Sebagian pesawat tidak komersial

**Apabila menggunakan logika yang sama untuk premis yang berbeda:**
- Semua lurah adalah laki-laki
- Sebagian laki-laki adalah kuli

Jika berdasarkan ilmu yang diajarkan Al-Faiz, otomatis untuk hal ini serta-merta disimpulkan "Sebagian lurah adalah kuli". Padahal sebenarnya kita tidak tahu "sebagian laki-laki" yang dimaksud di sini apakah yang ada bagian dengan "lurah" di dalamnya atau "tanpa lurah" di dalamnya, sehingga TDDS. Kecuali jika soal:

- Semua lurah adalah laki-laki
- Sebagian lurah adalah kuli

**Maka kesimpulan:**
1. Sebagian lurah adalah laki-laki dan kuli/kuli dan laki-laki
2. Semua lurah yang kuli adalah laki-laki
3. Sebagian lurah adalah laki-laki juga kuli

Jadi singkatnya rata-rata opsi menyediakan jawaban "Sebagian pesawat tidak komersial" tapi tidak menyediakan opsi TDDS, maka pilih saja opsi tersebut

**Contoh lain:**
- Semua polisi adalah penegak hukum
- Sebagian penegak hukum adalah koruptor

Sebagian polisi adalah koruptor?
TDDS?

---
### HANYA
Kalimat "Hanya A yang adalah B" secara logika berarti "Jika B, maka A"

- Hanya mahasiswa yang rajin yang mendapat nilai A
- Budi mendapat nilai A

**Pernyataan:** "Hanya mahasiswa yang rajin yang mendapat nilai A."
**Artinya:** "Jika seseorang mendapat nilai A, maka dapat dipastikan dia adalah mahasiswa yang rajin."
**Arah Logika:** Mendapat Nilai A → Mahasiswa Rajin

Penting untuk diperhatikan, hubungan ini tidak berlaku sebaliknya. Pernyataan di atas tidak berarti "Jika seorang mahasiswa rajin, maka dia pasti mendapat nilai A". Mungkin saja ada mahasiswa rajin yang karena suatu hal tidak mendapat nilai A.

### HANYA JIKA
Kalimat "A jika dan hanya jika B" berarti dua hal sekaligus:
1. Jika A, maka B.
2. Jika B, maka A.

**Pernyataan:** "Sebuah bilangan adalah genap jika dan hanya jika bilangan tersebut habis dibagi dua."
**Artinya:** Ini adalah hubungan dua arah yang mutlak.
- Arah 1: "Jika sebuah bilangan adalah genap, maka bilangan tersebut pasti habis dibagi dua." (Benar)
- Arah 2: "Jika sebuah bilangan habis dibagi dua, maka bilangan tersebut pasti genap." (Benar)
**Arah Logika:** Bilangan Genap ↔ Habis Dibagi Dua

Kedua kondisi tersebut saling mengunci dan tidak dapat dipisahkan. Anda tidak akan menemukan bilangan genap yang tidak habis dibagi dua, atau sebaliknya.

---
### MENYANGKAL ANTESEDEN
Menyangkal anteseden adalah kesesatan berpikir dimana menyangkan sebab. Contohnya:
- P1: Jika hujan (p), maka jalanan akan basah (q)
- ~q->~p benar; tetapi
- ~p->~q salah, ini namanya menyangkal sebab/anteseden.

**Lebih lanjut ada keadaan lain:**
Sebagaimana sudah disinggung sebelumnya, pada contoh umum, tidak semua ~p~q salah, tetapi ada beberapa kondisi yang membenarkan ini. Contoh adalah jika syarat satu-satunya untuk terjadi q terjadi p maka ketika p tidak terjadi maka q pasti tidak akan terjadi. Contohnya:

**soal dari Tiktok @siskamrd_**
- P1: Jika disiplin belajar, maka lulus SKD
- P2: Jika lulus SKD, maka lanjut ke SKB
- P3: Jika lanjut ke SKB, maka peluang jadi CPNS terbuka

**Fakta:** Budi tidak lulus SKD

**Pilihan jawaban:**
a. Budi tetap bisa lanjut ke SKB
b. Budi tetap punya peluang diangkat CPNS
c. Budi tidak bisa lanjut ke SKB
d. Budi lulus SKD meski tidak disiplin belajar
e. Tidak dapat disimpulkan

Jika hanya dilihat pada P2 saja, maka akan dapat dituliskan p->q, kemudian fakta ~p maka kesimpulan TDDS. Tetapi harus melihat rantai sebab akibat.

Satu-satunya jalan menuju q adalah p, maka ketika ~p tidak terjadi maka q sudah pasti tidak terjadi (bukan lagi melawan anteseden). Sehingga jawaban yang tepat adalah c. Budi tidak bisa lanjut ke SKB.

Jadi memang terkadang juga harus melihat apakah soal tersebut mengandung syarat pasti atau umum. Untuk soal tersebut bisa dimaknai juga sebagai HANYA JIKA, menjadi "Hanya jika lulus SKD, maka ia bisa lanjut ke SKB"

---
### BELUM TENTU DAN MUNGKIN
Jika terdapat 2 opsi jawaban yang menyodorkan ada mungkin dan belum tentu. Maka cara ini bisa diterapkan.

**Contoh soal dari Tiktok @siskamrd_**
- P1: Semua guru adalah pendidik
- P2: Sebagian pendidik adalah dosen
- P3: Semua dosen adalah ASN
- Fakta: Tono adalah guru

**Pilihan jawaban:**
a. Tono pasti ASN
b. Tono mungkin ASN
c. Tono belum tentu ASN
d. Tono pasti dosen
e. Tidak dapat disimpulkan

- **mungkin ASN** -> menyatakan ada kemungkinan Tono ASN (butuh dukungan positif dari premis/ada jalan terbuka yang jelas)
- **belum tentu ASN** -> artinya tidak bisa dipastikan ASN, lebih netral dan posisinya tidak ada jaminan iya atau tidak
Sehingga jawabn yang benar adalah c. Tono belum tentu ASN

---
### PELUANG (APA NAMA MATERINYA BELUM PASTI)
**soal dari Tiktok @siskamrd_**
- P1: Jika seseorang lulus SKD, maka ia berhak ikut SKB
- P2: Jika ikut SKB, maka peluang CPNS terbuka
- P3: Jika peluang CPNS terbuka, maka ada kesempatan menjadi ASN
- Fakta: Amir ikut SKB tetapi ia tidak menjadi ASN

**Pilihan jawaban:**
a. Amir tidak lulus SKD
b. Amir tetap berpeluang jadi ASN
c. Amir peluangnya tertutup sejak awal
d. Amir tidak memenuhi syarat menjadi ASN
e. Informasi tidak cukup

Jawaban dari author adalah b. Amir tetap berpeluang jadi ASN. Karena 'tidak menjadi ASN' tidak membatalkan bahwa ia tetap *sempat punya* peluang

---
### NEGASI DARI KESIMPULAN
- P1: Jika hujan (p), maka jalanan basah (q)
- P2: Jika jalanan basah (r), maka saya membawa payung (s)

**Negasi dari kesimpulannya adalah**

**Pilihan jawaban:**
a. Jika hujan maka saya membawa payung (masih bentuk premis)
b. Hujan atau saya tidak membawa payung (kesimpulan harus menggunakan dan untuk kasus ini karena dan menunjukkan bahwa kejadian harus terjadi saat bersamaan)
c. Tidak hujan atau saya membawa payung (bukan kesimpulan dan bukan negasi/tidak melanggar aturan premis, konjungsi harus dan)
d. Hujan dan saya tidak membawa payung
e. Tidak hujan dan saya membawa payung (bukan kesimpulan dan bukan negasi/tidak melanggar aturan premis, sah-sah saja membawa payung)

**Kesimpulan:** Jika hujan, maka saya akan membawa payung (kesimpulanya berupa aturan (implikasi), bukan fakta (konjungsi))
**Negasi:** Hujan dan saya tidak membawa payung (beda halnya jika kesimpulan berupa "hujan, dan saya akan membawa payung", jika demikian kesimpulannya menjadi "tidak hujan atau saya tidak bawa payung" baca **NEGASI DARI IMPLIKASI ATAUKAH DARI FAKTA**)

Tujuan kita adalah menemukan satu skenario yang membuktikan pernyataan ini adalah sebuah kebohongan atau aturan yang dilanggar. Jawaban yang benar d. Hujan dan saya tidak membawa payung. Kesimpulan dari premis yang diberikan adalah Jika hujan (p), maka saya membawa payung (s), maka pelanggaran (nagasi/ingkaran) dari ketentuan tersebut adalah Hujan dan saya tidak membawa payung (pʌ~s) (alias ini ngeyel woi, padahal sudah ditentukan aturan hujan dan bawa payung, tetapi malah ttp gabawa)

**Untuk menjawab kenapa bukan "Tidak hujan dan saya membawa payung" yang benar:**
**Analogi Sederhana**
Bayangkan seorang ibu berkata kepada anaknya:
"Jika kamu ranking 1, maka ibu akan belikan sepeda."
Kapan janji ibu ini terbukti bohong (negasinya terjadi)?

Janji ini hanya terbukti bohong jika:
"Kamu ranking 1, DAN ibu tidak membelikan sepeda."

Sekarang, mari kita lihat skenario yang mirip dengan pertanyaan Anda:
"Kamu tidak ranking 1, DAN ibu tetap membelikan sepeda."

Apakah dalam skenario ini janji ibu terbukti bohong? Tidak. Janji ibu hanya berlaku jika anaknya ranking 1. Jika tidak ranking 1, ibu bebas mau membelikan sepeda atau tidak karena kebaikan hatinya. Tindakan ibu ini tidak melanggar janji awalnya.

---
#### NEGASI DARI ATURAN (IMPLIKASI) ATAUKAH FAKTA (KONJUNGSI)
**Contoh kesimpulan berupa aturan (implikasi)**
- P1: Jika hujan (p), maka jalanan basah (q)
- P2: Jika jalanan basah (r), maka saya membawa payung (s)

**Kesimpulan:** Jika hujan, saya akan membawa payung
**Negasi:** Hujan, dan saya tidak bawa payung

**Contoh kesimpulan berupa fakta (konjungsi)**
- P1: Hari ini hujan (p)
- P2: Saya membawa payung (q)

**Kesimpulan:** Hujan dan saya membawa payung
**Negasi:** Tidak hujan dan saya tidak membawa payung

---
#### DAN-ATAU
***DAN***
Dalam silogisme, konjungsi "DAN" digunakan untuk menghubungkan dua atau lebih syarat yang bersifat akumulatif dan wajib. Ini berarti, untuk suatu kondisi atau kesimpulan dapat terpenuhi, SEMUA syarat yang dihubungkan oleh kata "DAN" harus benar atau terpenuhi tanpa terkecuali.

**Contoh Silogisme dengan "DAN"**
- Premis 1: Untuk lulus seleksi beasiswa, seorang mahasiswa harus memiliki IPK di atas 3,75 DAN aktif dalam organisasi kemahasiswaan.
- Premis 2: Anisa memiliki IPK 3,80, tetapi ia tidak aktif dalam organisasi kemahasiswaan manapun.

Karena logika "DAN" menuntut semua syarat terpenuhi, dan Anisa hanya memenuhi satu dari dua syarat, maka syarat utama tidak terpenuhi.

**Kesimpulan:** Anisa tidak akan lulus seleksi beasiswa

***ATAU***
Disjungsi "ATAU" digunakan untuk menghubungkan dua atau lebih syarat yang bersifat alternatif atau pilihan. Ini berarti, untuk suatu kondisi atau kesimpulan dapat terpenuhi, CUKUP SALAH SATU dari syarat yang dihubungkan oleh kata "ATAU" yang benar atau terpenuhi.

**Contoh Silogisme dengan "ATAU"**
- Premis 1: Sebuah laptop dinyatakan lolos kontrol kualitas jika lolos uji performa ATAU lolos uji ketahanan baterai.
- Premis 2: Laptop Model X tidak lolos uji performa, tetapi berhasil lolos uji ketahanan baterai.

Karena logika "ATAU" hanya membutuhkan minimal satu syarat terpenuhi, dan Laptop Model X telah memenuhi salah satunya (uji baterai), maka syarat utama sudah terpenuhi. Jika kedua syarat terpenuhi tidak menjadi masalah.

**Kesimpulan:** Laptop Model X dinyatakan lolos kontrol kualitas

**Contoh lebih lanjut tentang *ATAU*:**
- Premis Mayor: Saya akan membeli mobil baru atau saya akan merenovasi rumah.
- Premis Minor: Saya tidak membeli mobil baru.
- Kesimpulan: ...

Jika diuraikan berdasarkan segala kemungkinan dari Premis 1, maka:

**Kemungkinan Benar:**
- Saya tidak akan membeli mobil baru atau saya akan merenovasi rumah (ini yang sesuai dengan premis 2)
- Saya akan membeli mobil baru atau saya tidak akan merenovasi rumah
- Saya akan membeli mobil baru dan saya akan merenovasi rumah

**Pasti Salah:**
- Saya tidak akan membeli mobil baru dan saya tidak akan merenovasi rumah

---
#### SEMUA-SEBAGIAN-SEMENTARA (PLURAL-SINGULAR)
**Referensi Materi Youtube:**
1. https://www.youtube.com/watch?v=ToR7vNxxqGw

Di bawah ini (Variasi 1-4) adalah materi dari AI

**Variasi 1**
- Premis 1: Semua murid kelas 12 memakai seragam putih abu-abu.
- Premis 2: Sebagian yang memakai seragam putih abu-abu pergi ke kantin.
- Kesimpulan: ...

**Variasi 2**
- Premis 1: Semua murid kelas 12 memakai seragam putih abu-abu.
- Premis 2: Sebagian murid kelas 12 pergi ke kantin.
- Kesimpulan: ...

**Variasi 3**
- Premis 1: Semua yang memakai seragam putih abu-abu adalah murid kelas 12.
- Premis 2: Sebagian murid kelas 12 pergi ke kantin.
- Kesimpulan: ...

**Variasi 4**
- Premis 1: Tidak ada seniman yang merupakan birokrat.
- Premis 2: Semua birokrat adalah pegawai negeri.
- Kesimpulan: ...

**Variasi lain:**
Tiktok @belajarbareng_yuk https://vt.tiktok.com/ZSyh1j5XE/
- Premis 1: Semua X adalah A
- Premis 2: Sebagian X adalah B
- Kesimpulan: ...

A. Semua X yang bukan A adalah B
B. Semua X yang bukan B adalah A
C. Semua B yang bukan X adalah A
D. Semua A yang bukan X adalah B
E. Semua X adalah A dan B

Jika menurut author, maka diagram akan digambar seperti ini:
![materi-2.jpeg](tes-kemampuan-akademis/img/materi-2.jpeg)

Sedangkan, jika menurut AI Gemini dan ChatGPT maka diagram yang akan digambarkan adalah sebagai berikut:
![materi-1.jpeg](tes-kemampuan-akademis/img/materi-1.jpeg)

***Kontradiksi penjelasan terkait plural singular***
Ada beberapa perbedaan pendapat terkait kesimpulan untuk contoh Variasi 1. Ada yan gmengatakan TDDS tapi ada yang mengatakan bisa disimpulkan

**Variasi 1**
- Premis 1: Semua murid kelas 12 memakai seragam putih abu-abu.
- Premis 2: Sebagian yang memakai seragam putih abu-abu pergi ke kantin.
- Kesimpulan: ...

**Yang menyimpulkan ada kesimpulan:**
- Jika menggunakan teori dari buku Al-Faiz hal 196 maka kesimpulannya adalah "Sebagian murid kelas 12 pergi ke kantin"
- Jika menggunakan teori dari Tiktok @sobatrandra https://vt.tiktok.com/ZSyr3RBev/ maka kesimpulannya adalah "Sebagian murid kelas 12 pergi ke kantin"

**Yang menyimpulkan TDDS**
- Jika menggunakan teori Tiktok @hadyanriz pada video https://vt.tiktok.com/ZSyrbCDWR/ maka kesimpulannya TDDS. Karena kita tidak tau yang dimaksud "sebagian yang memakai seragam putih abu-abu" ini sebagian yang termasuk murid kelas 12 atau sebagian lain di luar itu (yang bukan murid kelas 12). Karena bisa jadi ada tukang, pegawai pabrik, dll yang memakai seragam putih abu-abu. Jadi bisa jadi malah tidak ada murid kelas 12 yang ke kantin tetapi ternyata malah pegawai pabrik yang kesana

- Jika menggunakan AI, Gemini dan ChatGPT menjawab TDDS. Sebagaimana penjelasan dari Variasi 1-4 sebelumnya

**Kesimpulan dari kontradiksi:**
Untuk saat ini berdasarkan pemahaman saya, sebenarnya masih masuk akal untuk bagian "Yang menyimpulkan ada kesimpulan" dan ini lebih aman karena mayoritas tentor mejelaskan demikian.

Sehingga sebaiknya sementara mengacu pada petunjuk di buku Al-Faiz halaman 196-197

Tetapi amannya, jika tidak ada opsi jawaban "Yang menyimpulkan ada kesimpulan" maka pilih saja jawaban "Yang menyimpulkan TDDS"
