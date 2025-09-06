p = hari ini hujan
q = saya membawa payung
(~q) saya tidak membawa payung, (~p) hari ini tidak hujan (benar)
(~p) hari ini tidak hujan, (~q) saya tidak membawa payung (salah/tidak dapat disimpulkan)

(q) saya membawa payung, (p) hari ini hujan (salah/tidak dapat disimpulkan)
(p) hari ini hujan, (q) saya membawa payung (benar)

~p v q hari ini tidak hujan atau saya membawa payung

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

