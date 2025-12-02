import re
import os

# Source and output paths
SOURCE_FILE = r'd:\Kode QC\tes-kemampuan-akademis\Al-Faiz\soal-penalaran-analitis.md'
OUTPUT_FILE = r'd:\Kode QC\tes-kemampuan-akademis\Al-Faiz\soal-penalaran-analitis.html'

# Solutions Dictionary
# Format: {Question Number: {'answer': 'Option', 'explanation': 'HTML Content'}}
SOLUTIONS = {
    1: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Urutan Waktu:</strong><br>
            1) Zidane < Valena (Zidane lebih cepat)<br>
            2) Wulan ≥ Xabiru (Wulan tidak lebih cepat, berarti lebih lambat atau sama)<br>
            3) Yuni > Valena (Yuni lebih lambat)<br>
            <strong>Kondisi Tambahan:</strong><br>
            Xabiru > Valena (Xabiru lebih lambat dari Valena)<br>
            Yuni ≥ Wulan (Yuni tidak lebih cepat dari Wulan)<br>
        </div>
        <div class="solution-step">
            <strong>Menggabungkan Persamaan:</strong><br>
            Z < V<br>
            V < X (dari kondisi)<br>
            X ≤ W (dari pernyataan 2)<br>
            W ≤ Y (dari kondisi)<br>
            <strong>Urutan Kecepatan (Cepat ke Lambat):</strong><br>
            1. Zidane<br>
            2. Valena<br>
            3. Xabiru<br>
            4. Wulan<br>
            5. Yuni
        </div>
        <div class="answer">Jawaban: Yang selesai pada urutan ke-4 adalah Wulan (C)</div>
        """
    },
    2: {
        'answer': 'E',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis:</strong><br>
            1) Z < V<br>
            2) W ≥ X<br>
            3) Y > V<br>
            <strong>Kondisi:</strong> W < V (Wulan lebih cepat dari Valena)<br>
        </div>
        <div class="solution-step">
            <strong>Urutan yang mungkin:</strong><br>
            Kita tahu:<br>
            - Z < V<br>
            - W < V<br>
            - X ≤ W (karena W ≥ X)<br>
            - Y > V<br>
            Jadi, X ≤ W < V < Y.<br>
            Dan Z < V.<br>
            Artinya, ada minimal 3 orang yang lebih cepat dari Y (X, W, V) dan minimal 3 orang yang lebih cepat atau sama dengan V (X, W, Z).<br>
            Valena dikalahkan oleh X, W, dan Z.<br>
            Jadi Valena minimal urutan ke-4.<br>
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. Zidane urutan 1 (Mungkin)<br>
            B. Wulan urutan 2 (Mungkin)<br>
            C. Xabiru urutan 2 (Mungkin)<br>
            D. Wulan urutan 3 (Mungkin)<br>
            E. Valena urutan 3 (PASTI SALAH, karena Valena minimal urutan 4)
        </div>
        <div class="answer">Jawaban: Valena selesai di urutan ke-3 (E)</div>
        """
    },
    3: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Kecepatan (Waktu):</strong><br>
            1) B ≥ A (Bima tidak lebih cepat)<br>
            2) A < C (Andrew lebih cepat dari Cecep)<br>
            3) D < A (Dava lebih cepat dari Andrew)<br>
            <strong>Kondisi:</strong> B ≥ E (Bima tidak lebih cepat dari Eva)<br>
        </div>
        <div class="solution-step">
            <strong>Urutan:</strong><br>
            D < A<br>
            A ≤ B<br>
            A < C<br>
            Jadi A lebih cepat dari B dan C.<br>
            D lebih cepat dari A.<br>
            Urutan sementara: D < A < {B, C}<br>
            Posisi E: E ≤ B. E bisa dimana saja relatif terhadap A dan D.<br>
        </div>
        <div class="solution-step">
            <strong>Mencari Pernyataan Salah:</strong><br>
            Andrew lebih cepat dari B dan C. Dava lebih cepat dari Andrew.<br>
            Jadi minimal Dava lebih cepat dari Andrew.<br>
            Andrew minimal urutan ke-2 (jika E lebih lambat) atau ke-3 (jika E lebih cepat).<br>
            Tapi Andrew TIDAK BISA urutan ke-4, karena dia mengalahkan B dan C.<br>
            Hanya ada 5 orang. Jika Andrew mengalahkan 2 orang, dia maksimal di posisi 3 (dari 5).<br>
            (5 - 2 = 3).
        </div>
        <div class="answer">Jawaban: Andrew mengumpulkan di urutan keempat (C)</div>
        """
    },
    4: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Berat Badan:</strong><br>
            A > B<br>
            C = E<br>
            F > D<br>
            Hanya ada dua orang yang sama (C dan E).
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan Pasti Salah:</strong><br>
            A. B > D (Mungkin)<br>
            B. A > F (Mungkin)<br>
            C. A = E (PASTI SALAH, karena sudah ada C=E, dan hanya ada sepasang yang sama)<br>
            D. D > A (Mungkin)<br>
            E. D < F (Benar, F > D)
        </div>
        <div class="answer">Jawaban: Berat Ajeng sama dengan berat Ebiet (C)</div>
        """
    },
    5: {
        'answer': 'A',
        'explanation': """
        <div class="solution-step">
            <strong>Kondisi Tambahan:</strong> B > F<br>
            <strong>Gabungan:</strong><br>
            A > B > F > D<br>
            C = E (terpisah)<br>
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. A > D (Benar, karena A > B > F > D)<br>
            B. F > A (Salah)<br>
            C. D > B (Salah)<br>
            D. C > F (Belum tentu)<br>
            E. E > C (Salah, C=E)
        </div>
        <div class="answer">Jawaban: Ajeng lebih berat daripada Desfira (A)</div>
        """
    },
    6: {
        'answer': 'B',
        'explanation': """
        <div class="solution-step">
            <strong>Kondisi Tambahan:</strong> C > A<br>
            <strong>Gabungan:</strong><br>
            E = C > A > B<br>
            F > D (terpisah)<br>
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. A > E (Salah, E > A)<br>
            B. E > B (Benar, karena E > A > B)<br>
            C. C > D (Belum tentu)<br>
            D. F > B (Belum tentu)<br>
            E. D > B (Belum tentu)
        </div>
        <div class="answer">Jawaban: Ebiet lebih berat daripada Bilqis (B)</div>
        """
    },
    7: {
        'answer': 'D',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Urutan Film:</strong><br>
            1) Komedi sesudah Laga (Laga ... Komedi)<br>
            2) Drama sebelum Laga (Drama ... Laga)<br>
            3) Komedi sebelum Horror (Komedi ... Horror)<br>
        </div>
        <div class="solution-step">
            <strong>Rangkaian:</strong><br>
            Drama -> Laga -> Komedi -> Horror
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. Drama sesudah Laga (Salah)<br>
            B. Drama dan Komedi berurutan (Salah, ada Laga)<br>
            C. Komedi sebelum Drama (Salah)<br>
            D. Horror ditayangkan terakhir (Benar)<br>
            E. Drama antara Laga dan Horror (Salah)
        </div>
        <div class="answer">Jawaban: Film horor akan ditayangkan terakhir (D)</div>
        """
    },
    8: {
        'answer': 'A',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis:</strong><br>
            Destinasi: Bali, Lombok, LB, RA, Flores.<br>
            1) Arsana = Lombok -> Cindy = Flores.<br>
            2) Ada 1 orang pilih Labuan Bajo (LB).<br>
            3) Tidak ada yang pilih Bali.<br>
        </div>
        <div class="solution-step">
            <strong>Deduksi:</strong><br>
            Arsana = Lombok.<br>
            Maka Cindy = Flores.<br>
            Sisa orang: Bulan.<br>
            Sisa destinasi (selain Bali): LB, RA.<br>
            Karena "Ada satu orang yang memilih LB", dan A & C sudah pilih yang lain, maka Bulan HARUS memilih Labuan Bajo.
        </div>
        <div class="answer">Jawaban: Bulan memilih Labuan Bajo (A)</div>
        """
    },
    9: {
        'answer': 'E',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Posisi Meja Bundar (4 Kursi):</strong><br>
            1) Sekar (S) hadap Uchi (U).<br>
            2) Rista (R) kiri Uchi.<br>
            Asumsi menghadap ke pusat meja.<br>
            Misal U di posisi jam 6 (Selatan) menghadap Utara.<br>
            - S di jam 12 (Utara).<br>
            - Kiri U adalah jam 9 (Barat). Jadi R di jam 9.<br>
            - Sisa Tiara (T) di jam 3 (Timur).
        </div>
        <div class="solution-step">
            <strong>Cek Posisi Relatif:</strong><br>
            Posisi searah jarum jam: S - T - U - R.<br>
            A. Sekar kanan Rista? R (jam 9) hadap Timur. Kanan R adalah jam 6 (U). (Salah)<br>
            B. Uchi kanan Tiara? T (jam 3) hadap Barat. Kanan T adalah jam 12 (S). (Salah)<br>
            C. Tiara kiri Rista? R (jam 9). Kiri R adalah jam 12 (S). (Salah)<br>
            D. Rista kanan Tiara? T (jam 3). Kanan T adalah S. (Salah)<br>
            E. Tiara kanan Uchi? U (jam 6) hadap Utara. Kanan U adalah jam 3 (T). (Benar)
        </div>
        <div class="answer">Jawaban: Tiara duduk di sebelah kanan Uchi (E)</div>
        """
    },
    10: {
        'answer': 'B',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Posisi (8 Kursi):</strong><br>
            1) Guru (G) kuning, berhadapan. Misal G1 di 1, G2 di 5.<br>
            2) M - J - N (Josh diantara Monalisa dan Nabil).<br>
            3) O hadap J.<br>
            4) L sebelah O.<br>
            5) K hadap M.<br>
        </div>
        <div class="solution-step">
            <strong>Simulasi Penempatan:</strong><br>
            Misal J di 3. Maka M di 2, N di 4 (atau sebaliknya).<br>
            Jika M di 2, maka K di 6 (hadap M).<br>
            O di 7 (hadap J di 3).<br>
            L sebelah O (7), bisa 6 atau 8. Tapi 6 sudah diisi K. Jadi L di 8.<br>
            Posisi: 1(G), 2(M), 3(J), 4(N), 5(G), 6(K), 7(O), 8(L).<br>
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. L sebelah N? L(8), N(4). (Salah)<br>
            B. Guru di antara Khaitami dan Nabil? G(5) diapit N(4) dan K(6). (Benar)<br>
            C. Khaitami sebelah Lintang? K(6), L(8). (Salah, ada O)<br>
            D. Guru di antara Nabil dan Monalisa? G(1) antara L dan M. G(5) antara N dan K. (Salah)<br>
            E. Josh sebelah Khaitami? J(3), K(6). (Salah)
        </div>
        <div class="answer">Jawaban: Guru duduk di antara Khaitami dan Nabil (B)</div>
        """
    },
    11: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Posisi:</strong><br>
            Sama seperti soal sebelumnya, tetapi kondisi baru: Lintang duduk berhadapan dengan Monalisa.<br>
            Dari soal sebelumnya kita punya pola: M-J-N.<br>
            Jika L hadap M.<br>
            Misal J di 1. O di 5 (hadap J).<br>
            M di 2, N di 8 (atau sebaliknya).<br>
            Jika M di 2, maka L di 6 (hadap M).<br>
            L harus sebelah O (5). 6 sebelah 5. Cocok.<br>
            Posisi: J(1), M(2), G(3), K(4), O(5), L(6), G(7), N(8).<br>
            (G di 3 dan 7 karena harus berhadapan dan sisa kursi).<br>
            K di 4 (sisa).
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. N sebelah L? N(8), L(6). (Salah)<br>
            B. Guru antara K dan L? G(7) antara L(6) dan N(8). G(3) antara M(2) dan K(4). (Salah)<br>
            C. Khaitami hadap Nabil? K(4), N(8). (Benar, 4 dan 8 berhadapan)<br>
            D. Okta antara K dan M? O(5). K(4), M(2). (Salah)<br>
            E. Lintang sebelah Josh? L(6), J(1). (Salah)
        </div>
        <div class="answer">Jawaban: Khaitami duduk di hadapan Nabil (C)</div>
        """
    },
    12: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Posisi (8 Ibu):</strong><br>
            1) Bu Mila (M) ketua. Bu Della (D) depan M.<br>
            2) Bu Galuh (G) dekat M.<br>
            3) D samping Bu Valen (V).<br>
            4) V hadap Bu Yulis (Y).<br>
            5) Bu Sasi (S) antara Bu Heni (H) dan D.<br>
        </div>
        <div class="solution-step">
            <strong>Simulasi:</strong><br>
            M di 1. D di 5.<br>
            S antara H dan D. D di 5. S bisa 4 atau 6.<br>
            Jika S di 4, H di 3.<br>
            V samping D. D di 5. V bisa 4 atau 6. Tapi 4 isi S. Jadi V di 6.<br>
            Y hadap V. V di 6 -> Y di 2.<br>
            G dekat M. M di 1. G bisa 2 atau 8. 2 isi Y. Jadi G di 8.<br>
            Sisa kursi 7 untuk Bu Cindy (C).<br>
            Posisi: M(1), Y(2), H(3), S(4), D(5), V(6), C(7), G(8).
        </div>
        <div class="solution-step">
            <strong>Posisi Bu Cindy (7):</strong><br>
            A. Hadapan Y(2)? 7 vs 3. (Salah)<br>
            B. Sebelah D(5)? 7 vs 5. (Salah)<br>
            C. Hadapan H(3)? 7 vs 3. (Benar, 7-3 selisih 4)<br>
            D. Sebelah M(1)? 7 vs 1. (Salah, ada G)<br>
            E. Sebelah Y(2)? 7 vs 2. (Salah)
        </div>
        <div class="answer">Jawaban: hadapan Bu Heni (C)</div>
        """
    },
    13: {
        'answer': 'E',
        'explanation': """
        <div class="solution-step">
            <strong>Posisi Awal:</strong><br>
            Fatih (F) kiri, Bu Lili (L) kanan.<br>
            F - A/W - W/A - L.<br>
            Misal: F(1), A(2), W(3), L(4). (Asumsi A dekat F).
        </div>
        <div class="solution-step">
            <strong>Pertukaran 1:</strong><br>
            F tukar dengan Azzam (yang paling dekat).<br>
            Posisi: A(1), F(2), W(3), L(4).
        </div>
        <div class="solution-step">
            <strong>Pertukaran 2:</strong><br>
            Azzam (sekarang di 1) tukar dengan Bu Lili (4).<br>
            Posisi: L(1), F(2), W(3), A(4).
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. F paling kanan? (Salah, F di 2)<br>
            B. W antara L dan F? (Salah, F antara L dan W)<br>
            C. L sebelah suami (W)? (Salah, L sebelah F)<br>
            D. A jauh dari ayah (W)? (Salah, A(4) sebelah W(3))<br>
            E. A di paling ujung menggantikan ibu? (Benar, A di 4, posisi L dulu)
        </div>
        <div class="answer">Jawaban: Azzam akhirnya duduk di paling ujung menggantikan posisi ibunya (E)</div>
        """
    },
    14: {
        'answer': 'E',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Urutan:</strong><br>
            1) S hanya jika sudah R dan T. (R, T ... S)<br>
            2) T tidak sebelum P (P ... T).<br>
            3) Q urutan ke-2.<br>
            Gabungan: P ... T ... S. Dan R ... S.<br>
            Q di 2.
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. T urutan 6? (Salah, S harus setelah T)<br>
            B. S urutan 4? (Sebelum S ada P, T, R, Q. Minimal 4 orang. S minimal ke-5). (Salah)<br>
            C. R urutan 6? (Salah, S harus setelah R)<br>
            D. T urutan 1? (Salah, P harus sebelum T)<br>
            E. P urutan 1? (Mungkin. Jika P(1), Q(2), R(3), T(4), S(5), U(6). Valid).
        </div>
        <div class="answer">Jawaban: Rumah Putu pada urutan ke-1 (E)</div>
        """
    },
    15: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Kondisi Tambahan:</strong> Rumah terakhir (6) adalah Ulfa (U).<br>
            Q di 2.<br>
            Sisa: P, R, S, T untuk posisi 1, 3, 4, 5.<br>
            S harus terakhir dari grup ini (karena butuh R dan T). Jadi S di 5.<br>
            Posisi 1, 3, 4 diisi P, R, T.<br>
            Syarat: P ... T.<br>
        </div>
        <div class="solution-step">
            <strong>Mencari Urutan 1 dan 3:</strong><br>
            Pilihan yang mungkin untuk (1, 3, 4):<br>
            - P, R, T (1=P, 3=R)<br>
            - P, T, R (1=P, 3=T)<br>
            - R, P, T (1=R, 3=P)<br>
            Cek Pilihan:<br>
            A. Q dan R (Salah, Q di 2)<br>
            B. R dan T (Jika 1=R, 3=T. Maka P harus di 4? Tidak bisa, P harus sebelum T. Salah)<br>
            C. P dan R (Jika 1=P, 3=R. Valid)<br>
            D. S dan P (S di 5. Salah)<br>
            E. T dan P (T tidak bisa di 1. Salah)
        </div>
        <div class="answer">Jawaban: Rumah Putu dan Rendra (C)</div>
        """
    },
    16: {
        'answer': 'D',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Waktu:</strong><br>
            Masuk:<br>
            D = B + 7<br>
            A = D - 3 = B + 4<br>
            Urutan Masuk: B (0), A (4), D (7).<br>
            Keluar:<br>
            B_out = A_out + 5<br>
            D_out = B_out - 2 = A_out + 3<br>
            Urutan Keluar: A (T), D (T+3), B (T+5).
        </div>
        <div class="solution-step">
            <strong>Durasi (Lama Belanja):</strong><br>
            Misal A keluar jam T.<br>
            Lama A = T - 4.<br>
            Lama B = (T + 5) - 0 = T + 5.<br>
            Lama D = (T + 3) - 7 = T - 4.<br>
            B paling lama. A dan D sama.<br>
            Urutan dari paling lama: B, A, D (atau B, D, A).
        </div>
        <div class="answer">Jawaban: Bagas, Aidil, Danda (D)</div>
        """
    },
    17: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Ruang:</strong><br>
            1) Pingkan (P) suara keras.<br>
            2) Flandy (F) & Gilang (G) dekat.<br>
            3) Shalza (S) alergi asap, Ruang O.<br>
            4) Ma'ruf (M) tidak suka suara keras.<br>
            5) Perokok: Rifki (R), F, M.<br>
        </div>
        <div class="solution-step">
            <strong>Deduksi:</strong><br>
            S (O) alergi asap -> Tetangga O (N, P) bukan perokok.<br>
            Perokok: R, F, M. Non: P, G, S.<br>
            Jadi N dan P diisi P dan G.<br>
            F dekat G. Jika G di N, F di M. Jika G di P, F di O (Salah, O isi S).<br>
            Jadi G harus di N. F di M.<br>
            Maka P (Pingkan) di P (Ruang).<br>
            Posisi: M(F), N(G), O(S), P(P).<br>
            Sisa K, L untuk R, M.<br>
            Smokers (R, F, M) ada di K, L, M.
        </div>
        <div class="answer">Jawaban: K, L, M (C)</div>
        """
    },
    18: {
        'answer': 'D',
        'explanation': """
        <div class="solution-step">
            <strong>Dari analisis sebelumnya:</strong><br>
            Posisi:<br>
            K/L: Rifki/Ma'ruf<br>
            M: Flandy<br>
            N: Gilang<br>
            O: Shalza<br>
            P: Pingkan
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan (Cari yang Salah):</strong><br>
            A. Rifki ruang K (Mungkin)<br>
            B. Ma'ruf ruang K (Mungkin)<br>
            C. Gilang ruang N (Benar)<br>
            D. Pingkan ruang N (SALAH, Pingkan di P)<br>
            E. Ma'ruf ruang L (Mungkin)
        </div>
        <div class="answer">Jawaban: Pingkan menempati ruang N (D)</div>
        """
    },
    19: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Urutan:</strong><br>
            1) B - A (Aqbil tepat setelah Bethardo)<br>
            2) 1 = Happy (H)<br>
            3) C ... A (Chofifah sebelum Aqbil)<br>
            4) D dan G pisah 2 rumah.<br>
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. C setelah A? (Salah)<br>
            B. C setelah A? (Salah)<br>
            C. H, G, C, F, D, B, A, E.<br>
               G(2), D(5). Pisah C, F (2 rumah). Benar.<br>
               C(3) sebelum A(7). Benar.<br>
               B(6), A(7). Berurutan. Benar.<br>
            D. C setelah A? (Salah)<br>
            E. D(3), G(7). Pisah 3 rumah. (Salah)
        </div>
        <div class="answer">Jawaban: Happy, Gladys, Chofifah, Fatah, Damar, Bethardo, Aqbil, Elsa (C)</div>
        """
    },
    20: {
        'answer': 'A',
        'explanation': """
        <div class="solution-step">
            <strong>Kondisi:</strong> Rumah ke-6 adalah Damar (D).<br>
            D dan G pisah 2 rumah. G harus di 3 atau 9. Jadi G di 3.<br>
            Posisi: 1(H), 2, 3(G), 4, 5, 6(D), 7, 8.<br>
            B-A berurutan. C sebelum A.<br>
        </div>
        <div class="solution-step">
            <strong>Cek Pilihan:</strong><br>
            A. Rumah Gladys urutan 3. (PASTI BENAR dari deduksi D=6 -> G=3).<br>
            B. Chofifah urutan 2. (Mungkin, tapi tidak pasti)<br>
            C. Bethardo urutan 4. (Mungkin)<br>
            D. Fatah urutan 7. (Mungkin)<br>
            E. Aqbil urutan 8. (Mungkin)
        </div>
        <div class="answer">Jawaban: Rumah Gladys dikunjungi di urutan 3 (A)</div>
        """
    },
    21: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Jalur Penerbangan A ke F:</strong><br>
            1. A -> F (Langsung)<br>
            2. A -> B -> D -> F<br>
            3. A -> C -> E -> F<br>
        </div>
        <div class="answer">Jawaban: 3 jalur (C)</div>
        """
    },
    22: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Jalur A ke E:</strong><br>
            1. A -> E (Langsung)<br>
            2. A -> B -> D -> E<br>
            3. A -> C -> E<br>
        </div>
        <div class="answer">Jawaban: 3 jalur (C)</div>
        """
    },
    23: {
        'answer': 'E',
        'explanation': """
        <div class="solution-step">
            <strong>Jalur P ke U:</strong><br>
            Rute yang tersedia:<br>
            P -> T -> U<br>
            Apakah ada jalur lain?<br>
            U -> P (Satu arah)<br>
            U -> Q ... (Satu arah)<br>
            Dari P hanya ada penerbangan ke T.<br>
            Dari T hanya ada penerbangan ke U.<br>
            Jadi hanya ada 1 jalur.
        </div>
        <div class="answer">Jawaban: 1 jalur (E)</div>
        """
    },
    24: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Jalur Wahana:</strong><br>
            Start: A.<br>
            A -> B, C.<br>
            C -> B, D, E.<br>
            D -> G.<br>
            E -> F.<br>
            G -> F (Asumsi terhubung F).<br>
            Exit dekat G (Asumsi G adalah akhir atau F akhir).<br>
        </div>
        <div class="solution-step">
            <strong>Mencari Jalur Terpanjang:</strong><br>
            1. A -> C -> D -> G (4 pos)<br>
            2. A -> C -> E -> F -> G (5 pos) (Asumsi F terhubung G)<br>
            Atau A -> B -> D -> G (4 pos) (Asumsi B terhubung D, umum di soal tipe ini)<br>
            Jika ada jalur A -> C -> B -> D -> G (5 pos).<br>
            Tapi C -> B adalah dead end jika B tidak ke D.<br>
            Dengan asumsi B->D dan F<->G:<br>
            Max pos adalah 5 (misal A-C-E-F-G atau A-C-B-D-G).
        </div>
        <div class="answer">Jawaban: 5 pos (C)</div>
        """
    },
    25: {
        'answer': 'A',
        'explanation': """
        <div class="solution-step">
            <strong>Jumlah Jalur ke Keluar (G):</strong><br>
            Dengan asumsi topologi yang memungkinkan 5 pos (B->D, F->G):<br>
            1. A -> C -> D -> G<br>
            2. A -> C -> E -> F -> G<br>
            3. A -> B -> D -> G<br>
            Total 3 jalur.
        </div>
        <div class="answer">Jawaban: 3 jalur (A)</div>
        """
    },
    26: {
        'answer': 'A',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Operan Bola:</strong><br>
            Tujuan: Grace (G) -> Marco (M).<br>
            Jalur:<br>
            1. G -> H -> K -> M (Valid)<br>
            2. G -> H -> J -> L (Stop, L tidak bisa ke M)<br>
            3. G -> I -> J -> L (Stop)<br>
            4. G -> I -> L (Stop)<br>
            Hanya ada 1 jalur yang sampai ke M.
        </div>
        <div class="answer">Jawaban: 1 cara (A)</div>
        """
    },
    27: {
        'answer': 'C',
        'explanation': """
        <div class="solution-step">
            <strong>Prinsip Perkalian:</strong><br>
            P -> Q: 5 rute.<br>
            Q -> R: 7 rute.<br>
            Total rute P -> Q -> R = \(5 \times 7 = 35\) cara.
        </div>
        <div class="answer">Jawaban: 35 cara (C)</div>
        """
    },
    28: {
        'answer': 'D',
        'explanation': """
        <div class="solution-step">
            <strong>Perjalanan Pulang Pergi:</strong><br>
            Berangkat: Ngasinan -> Jetis (2) -> Jabung (3). Total = \(2 \times 3 = 6\).<br>
            Pulang: Jabung -> Jetis (3) -> Ngasinan (2). Total = \(3 \times 2 = 6\).<br>
            Total PP = \(6 \times 6 = 36\) cara.
        </div>
        <div class="answer">Jawaban: 36 cara (D)</div>
        """
    },
    29: {
        'answer': 'B',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Posisi Duduk:</strong><br>
            Baris 1: T - B - R - E<br>
            Baris 2 (Berhadapan):<br>
            B hadap D.<br>
            R hadap S.<br>
            Y sebelah D. N sebelah S.<br>
            Susunan Baris 2: Y - D - S - N (agar Y sebelah D dan N sebelah S, dan D, S di posisi tengah).<br>
        </div>
        <div class="solution-step">
            <strong>Posisi:</strong><br>
            Yosep (Y) dan Shima (S).<br>
            Di antara Y dan S adalah Dodi (D).
        </div>
        <div class="answer">Jawaban: Dodi (B)</div>
        """
    },
    30: {
        'answer': 'A',
        'explanation': """
        <div class="solution-step">
            <strong>Analisis Posisi Duduk:</strong><br>
            Baris 1: S - A - R - E<br>
            Baris 2 (Berhadapan):<br>
            A hadap F.<br>
            R hadap D.<br>
            B sebelah F. N sebelah D.<br>
            Susunan Baris 2: B - F - D - N.<br>
            (B hadap S, F hadap A, D hadap R, N hadap E).
        </div>
        <div class="solution-step">
            <strong>Pertanyaan:</strong><br>
            Siapakah yang berada di depan Erlang (E)?<br>
            Erlang ada di ujung kanan Baris 1.<br>
            Di depannya (Baris 2 ujung kanan) adalah Novi (N).
        </div>
        <div class="answer">Jawaban: Novi (A)</div>
        """
    }
}

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by questions (assuming format **Number.**)
    # Regex to find **Number.** start
    questions = []
    # Split by **Number.**
    parts = re.split(r'\n\s*\*\*(\d+)\.', content)
    
    # parts[0] is header/intro
    # parts[1] is number 1, parts[2] is content 1
    # parts[3] is number 2, parts[4] is content 2...
    
    for i in range(1, len(parts), 2):
        num = int(parts[i])
        text = parts[i+1]
        
        # Extract question text and options
        # Usually options start with A. B. C. D. E.
        # Let's split by the first occurrence of A. 
        
        # Find the start of options
        opt_match = re.search(r'\n\s*A\.', text)
        if opt_match:
            question_text = text[:opt_match.start()].strip()
            options_text = text[opt_match.start():].strip()
            
            # Parse options
            options = {}
            for opt in ['A', 'B', 'C', 'D', 'E']:
                # Regex for Option. Text
                # Look ahead for next option or end of string
                pattern = fr'{opt}\.\s*(.*?)(?=\n\s*[B-E]\.|\n\s*$|$)'
                if opt == 'E':
                    pattern = r'E\.\s*(.*?)(?=\n\s*$|$)'
                
                match = re.search(pattern, options_text, re.DOTALL)
                if match:
                    options[opt] = match.group(1).strip()
            
            questions.append({
                'number': num,
                'text': question_text,
                'options': options
            })
            
    return questions

def generate_html(questions, solutions):
    html_template = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soal Penalaran Analitis - Pembahasan</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            padding: 40px;
        }
        h1 {
            text-align: center;
            color: #667eea;
            margin-bottom: 30px;
            font-size: 2.5em;
            border-bottom: 3px solid #667eea;
            padding-bottom: 15px;
        }
        .question {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .question-number {
            font-weight: bold;
            color: #667eea;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
        .question-text {
            margin-bottom: 15px;
            font-size: 1.05em;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        .options {
            margin-bottom: 15px;
            padding-left: 20px;
        }
        .option-item {
            margin-bottom: 5px;
        }
        .toggle-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .toggle-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .solution {
            display: none;
            margin-top: 20px;
            padding: 20px;
            background: #e8f4f8;
            border-radius: 8px;
            border-left: 4px solid #28a745;
            animation: slideDown 0.3s ease;
        }
        .solution.show { display: block; }
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .solution-title {
            font-weight: bold;
            color: #28a745;
            font-size: 1.1em;
            margin-bottom: 15px;
        }
        .solution-step {
            margin-bottom: 12px;
            padding-left: 15px;
            border-left: 2px solid #28a745;
        }
        .answer {
            background: #d4edda;
            padding: 15px;
            border-radius: 5px;
            margin-top: 15px;
            font-weight: bold;
            color: #155724;
            font-size: 1.1em;
        }
    </style>
    <script>
        function toggleSolution(id) {
            var sol = document.getElementById('solution' + id);
            var btn = document.querySelector('button[onclick="toggleSolution(' + id + ')"]');
            if (sol.classList.contains('show')) {
                sol.classList.remove('show');
                btn.textContent = 'Tampilkan Pembahasan';
            } else {
                sol.classList.add('show');
                btn.textContent = 'Sembunyikan Pembahasan';
            }
        }
    </script>
</head>
<body>
    <div class="container">
        <h1>Soal Penalaran Analitis - Tema 10</h1>
"""
    
    html_content = html_template
    
    for q in questions:
        num = q['number']
        text = q['text']
        options = q['options']
        
        # Get solution
        sol = solutions.get(num, {
            'answer': '?', 
            'explanation': '<div class="solution-step">Pembahasan belum tersedia.</div>'
        })
        
        html_content += f"""
        <div class="question">
            <div class="question-number">Soal {num}</div>
            <div class="question-text">{text}</div>
            <div class="options">
        """
        
        for key, val in options.items():
            html_content += f'<div class="option-item"><strong>{key}.</strong> {val}</div>'
            
        html_content += f"""
            </div>
            <button class="toggle-btn" onclick="toggleSolution({num})">Tampilkan Pembahasan</button>
            <div class="solution" id="solution{num}">
                <div class="solution-title">Pembahasan:</div>
                {sol['explanation']}
            </div>
        </div>
        """
        
    html_content += """
    </div>
</body>
</html>
"""
    return html_content

def main():
    questions = parse_markdown(SOURCE_FILE)
    html = generate_html(questions, SOLUTIONS)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"Successfully generated {OUTPUT_FILE} with {len(questions)} questions.")

if __name__ == '__main__':
    main()
