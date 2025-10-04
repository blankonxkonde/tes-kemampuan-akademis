Video Materi
https://youtu.be/M4EM0J4yJp0?si=ZGwJ-kxur-k7wPBR
https://youtu.be/NqtwlDF0J1s?si=HHCyWKUitT2pGbgk


=========

    p = hari ini hujan
    q = saya membawa payung
(~q) saya tidak membawa payung, (~p) hari ini tidak hujan (benar)
(~p) hari ini tidak hujan, (~q) saya tidak membawa payung (salah/tidak dapat disimpulkan)

(q) saya membawa payung, (p) hari ini hujan (salah/tidak dapat disimpulkan)
(p) hari ini hujan, (q) saya membawa payung (benar)

~p v q hari ini tidak hujan atau saya membawa payung (ekuivalen)
~q v p saya tidak membawa payung atau hari ini hujan (tidak ekuivalen)

Semua tas yang sudah melewati proses penjahitan DAN finishing dilakukan pengecekan kualitas. Tas yang
diproduksi hari ini belum dicek kualitasnya.

p = tas yang sudah melewati proses penjahitan
q = tas yang sudah melewati finishing
r = dilakukan pengecekan kualitas

Model logika:
(p ʌ q) -> r = Semua tas yang sudah melewati proses penjahitan dan finishing dilakukan pengecekan kualitas
~r = Tas yang diproduksi hari ini belum dicek kualitasnya

Kesimpulan
~r -> ~(p v q)
(~r) Tas yang diproduksi hari ini belum dicek kualitasnya.(~(p v q)) Tas yang diproduksi hari ini belum melewati proses penjahitan ATAU belum melewati proses finishing

Penjelasan Sederhana:
Premis awal mengatakan bahwa untuk bisa dicek kualitasnya, sebuah tas harus memenuhi dua syarat sekaligus: sudah dijahit DAN sudah difinishing.
Faktanya, tas hari ini belum dicek kualitasnya. Ini berarti tas tersebut pasti telah gagal memenuhi setidaknya *salah satu* dari dua syarat wajib tersebut. Mungkin proses penjahitannya belum selesai, atau mungkin proses finishingnya yang belum selesai, atau bahkan kedua-duanya belum selesai. Ketiga kemungkinan ini dirangkum dengan sempurna oleh kata "ATAU"
========SEMPURNAKAN STRUKTUR CONTOH DI BAWAH INI=====

Premis Baru: "Semua tas yang sudah melewati proses penjahitan ATAU finishing dilakukan pengecekan kualitas."
Model Logika: (p v q) → r
Fakta: "Tas yang diproduksi hari ini belum dicek kualitasnya."
Model Logika: ~r
Sekarang, dengan menggunakan Modus Tollens:
Jika (p v q) → r benar, dan ~r benar, maka kesimpulannya adalah ~(p v q).
Menurut Hukum De Morgan, ~(p v q) ekuivalen dengan ~p ʌ ~q.
Kesimpulan dari Premis Baru: "Tas yang diproduksi hari ini belum melewati proses penjahitan DAN belum melewati proses finishing."

Logikanya: Jika menyelesaikan salah satu dari dua proses itu (jahit ATAU finishing) saja sudah cukup untuk memicu pengecekan kualitas, dan ternyata pengecekan tidak terjadi, maka kita bisa 100% yakin bahwa kedua proses tersebut pasti belum ada yang selesai
=================
p: Seorang seniman ingin mengadakan pameran.
q: Ia harus mendapat persetujuan dari galeri
Kesimpulan:
~q -> ~p Ia tidak mendapatkan persetujuan dari galeri, maka ia tidak mengadakan pameran

~p v q Seorang seniman tidak ingin mengadakan pameran atau ia mendapat persetujuan dari galeri

DISTRAKTOR
Meskipun terdapat 3 premis, jika salah 1 premis adalah distraktor maka kesimpulan didapatkan dari 2 premis

Contoh 1
Premis 1: Semua bunga mawar di taman ini berwarna merah.
Premis 2: Sebagian bunga yang harum adalah bunga mawar.
Premis 3: Beberapa tanaman berwarna merah tidak disukai serangga.

Premis 2: (p) Sebagian bunga yang harum adalah (q) bunga mawar.
Premis 1: (q) Semua bunga mawar di taman ini berwarna merah (r).

kesimpulan dari 2 premis ini adalah sebagian bunga yang harum berwarna merah

Premis 3: Premis 3: Beberapa tanaman berwarna merah tidak disukai serangga. Merupakan DISTRAKTOR 

Mengapa ini distraktor?
- Premis ini memberikan informasi baru tentang kategori "tanaman berwarna merah", yaitu sebagian di antaranya "tidak disukai serangga".
- Kesalahan yang mungkin terjadi adalah mencoba menyimpulkan: "Sebagian bunga yang harum tidak disukai serangga."
- Kesimpulan ini tidak valid karena tidak ada jaminan logis bahwa "bunga harum berwarna merah" (yang kita simpulkan dari P1 & P2) adalah bagian dari kelompok "tanaman berwarna merah yang tidak disukai serangga" (yang disebutkan di P3).

Premis 3 tidak akan menjadi distraktor jika:
Premis 1: Semua bunga mawar di taman ini berwarna merah.
Premis 2: Sebagian bunga yang harum adalah bunga mawar.
Premis 3: SEMUA tanaman berwarna merah tidak disukai serangga.

Sehingga kesimpulan: P2 & P1 adalah Sebagian bunga yang harum berwarna merah
Kemudian dihubungkan dengan P3 menjadi Sebagian bunga yang harum tidak disukai serangga

Selanjutnya, bagaimana jika premisnya menjadi:

Premis 1: Sebagian bunga mawar di taman ini berwarna merah.
Premis 2: Sebagian bunga yang harum adalah bunga mawar.
Premis 3: SEMUA tanaman berwarna merah tidak disukai serangga.

Kesimpulannya: tidak dapat disimpulkan

=================
https://www.youtube.com/watch?v=NqtwlDF0J1s&t=220s

Pada contoh Al-Faiz ini no 10:
Semua pesawat adalah kendaraan
Sebagian kendaraan tidak komersial
Kesimpulan: Sebagian pesawat tidak komersial

Apabila menggunakan logika yang sama untuk premis yang berbeda:

Semua lurah adalah laki-laki
Sebagian laki-laki adalah kuli

Jika berdasarkan ilmu yang diajarkan Al-Faiz, otomatis untuk hal ini serta-merta disimpulkan "Sebagian lurah adalah kuli". Padahal sebenarnya kita tidak tahu "sebagian laki-laki" yang dimaksud di sini apakah yang ada bagian dengan "lurah" di dalamnya atau "tanpa lurah" di dalamnya, sehingga TDDS. Kecuali jika soal:

Semua lurah adalah laki-laki
Sebagian lurah adalah kuli

Maka kesimpulan:
1. Sebagian lurah adalah laki-laki dan kuli/kuli dan laki-laki
2. Semua lurah yang kuli adalah laki-laki
3. Sebagian lurah adalah laki-laki juga kuli

Jadi singkatnya rata-rata opsi menyediakan jawaban "Sebagian pesawat tidak komersial" tapi tidak menyediakan opsi TDDS, maka pilih saja opsi tersebut

Contoh lain:
Semua polisi adalah penegak hukum
Sebagian penegak hukum adalah koruptor

Sebagian polisi adalah koruptor?
TDDS?

===
Hanya

Kalimat "Hanya A yang adalah B" secara logika berarti "Jika B, maka A"

Hanya mahasiswa yang rajin yang mendapat nilai A
Budi mendapat nilai A

Pernyataan: "Hanya mahasiswa yang rajin yang mendapat nilai A."
Artinya: "Jika seseorang mendapat nilai A, maka dapat dipastikan dia adalah mahasiswa yang rajin."
Arah Logika: Mendapat Nilai A → Mahasiswa Rajin

Penting untuk diperhatikan, hubungan ini tidak berlaku sebaliknya. Pernyataan di atas tidak berarti "Jika seorang mahasiswa rajin, maka dia pasti mendapat nilai A". Mungkin saja ada mahasiswa rajin yang karena suatu hal tidak mendapat nilai A.

Hanya Jika

Kalimat "A jika dan hanya jika B" berarti dua hal sekaligus:
1. Jika A, maka B.
2. Jika B, maka A.

Pernyataan: "Sebuah bilangan adalah genap jika dan hanya jika bilangan tersebut habis dibagi dua."
Artinya: Ini adalah hubungan dua arah yang mutlak.
Arah 1: "Jika sebuah bilangan adalah genap, maka bilangan tersebut pasti habis dibagi dua." (Benar)
Arah 2: "Jika sebuah bilangan habis dibagi dua, maka bilangan tersebut pasti genap." (Benar)
Arah Logika: Bilangan Genap ↔ Habis Dibagi Dua

Kedua kondisi tersebut saling mengunci dan tidak dapat dipisahkan. Anda tidak akan menemukan bilangan genap yang tidak habis dibagi dua, atau sebaliknya.
