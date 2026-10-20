/* ==========================================
   WEBSITE HANI — EDELWEISS EXPERIENCE
   Interactive Questions & Personal Responses
   ========================================== */

const container = document.querySelector(".container");

// ==========================================
// DEKORASI BUNGA
// ==========================================

function flowerHTML() {
    return `
        <div class="flower" aria-hidden="true">
            <span class="petal"></span>
            <span class="petal"></span>
            <span class="petal"></span>
            <span class="petal"></span>
            <span class="petal"></span>
            <span class="petal"></span>
            <span class="petal"></span>
            <span class="petal"></span>
        </div>
    `;
}

// ==========================================
// KERANGKA HALAMAN
// ==========================================

function renderScreen(content) {
    container.classList.remove("fade-in");
    container.classList.add("fade-out");

    setTimeout(() => {
        container.innerHTML = `
            ${flowerHTML()}
            ${content}
        `;

        container.classList.remove("fade-out");
        container.classList.add("fade-in");
    }, 180);
}

// ==========================================
// PARTIKEL MELAYANG
// ==========================================

function createParticles() {
    const particleContainer = document.querySelector(".particles");

    if (!particleContainer) return;

    particleContainer.innerHTML = "";

    for (let i = 0; i < 24; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration =
            `${8 + Math.random() * 12}s`;

        particle.style.animationDelay =
            `${Math.random() * 10}s`;

        const size = 3 + Math.random() * 4;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particleContainer.appendChild(particle);
    }
}

// ==========================================
// KOMPONEN TEKS
// ==========================================

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function showMessage(title, message, buttonText, nextAction) {
    renderScreen(`
        <div class="subtitle">A little moment for you</div>

        <h1>${escapeHTML(title)}</h1>

        <p>${escapeHTML(message)}</p>

        <button class="primary" id="continueButton">
            ${escapeHTML(buttonText || "Lanjut →")}
        </button>

        <div class="footer">
            Take your time 🌿
        </div>
    `);

    setTimeout(() => {
        const button = document.querySelector("#continueButton");

        if (button) {
            button.addEventListener("click", nextAction);
        }
    }, 220);
}

// ==========================================
// KOMPONEN PERTANYAAN
// ==========================================

function showQuestion(question, options) {
    let buttonsHTML = "";

    options.forEach((option, index) => {
        buttonsHTML += `
            <button
                class="answerButton"
                data-answer="${index}"
            >
                ${escapeHTML(option.label)}
            </button>
        `;
    });

    renderScreen(`
        <div class="subtitle">A little moment for you</div>

        <h1>${escapeHTML(question)}</h1>

        <p>Pilih yang paling sesuai denganmu, ya. 🤍</p>

        <div class="answerList">
            ${buttonsHTML}
        </div>

        <div class="footer">
            One little step at a time 🌼
        </div>
    `);

    setTimeout(() => {
        const buttons = document.querySelectorAll(".answerButton");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.answer);
                const selectedOption = options[index];

                if (!selectedOption) return;

                // Simpan pilihan yang diberikan.
                answers[question] = selectedOption.label;

                // Tampilkan respons khusus sebelum melanjutkan.
                showMessage(
                    selectedOption.response.title,
                    selectedOption.response.message,
                    "Lanjut →",
                    selectedOption.next
                );
            });
        });
    }, 220);
}

// ==========================================
// MENYIMPAN JAWABAN
// ==========================================

const answers = {};

// ==========================================
// HALAMAN PEMBUKA
// ==========================================

function startWebsite() {
    createParticles();

    renderScreen(`
        <div class="subtitle">A little moment for you</div>

        <h1>Hai, apa kabar?</h1>

        <p>
            Sebentar aja, yuk. Ada beberapa pertanyaan kecil
            yang mungkin bisa menemani harimu. 🌼
        </p>

        <button class="primary" id="healthy">
            🌼 Sehat
        </button>

        <button id="sick">
            🌿 Lagi sakit
        </button>

        <div class="footer">
            A small place for a little pause
        </div>
    `);

    setTimeout(() => {
        document.querySelector("#healthy")
            ?.addEventListener("click", () => {
                answers["Kondisi awal"] = "Sehat";

                showMessage(
                    "Wah, syukurlah! 🌼",
                    "Semoga hari ini ada banyak hal kecil yang bikin kamu tersenyum. Semoga hal-hal baik juga terus menghampiri kamu, ya.",
                    "Lanjut →",
                    questionOne
                );
            });

        document.querySelector("#sick")
            ?.addEventListener("click", () => {
                answers["Kondisi awal"] = "Lagi sakit";

                showMessage(
                    "Semoga lekas membaik, ya. 🤍",
                    "Jangan terlalu memaksakan diri. Tubuh kamu juga butuh waktu untuk beristirahat. Pelan-pelan aja, nggak harus semuanya diselesaikan hari ini.",
                    "Lanjut →",
                    questionOne
                );
            });
    }, 220);
}

// ==========================================
// PERTANYAAN 1 — SUASANA HARI
// ==========================================

function questionOne() {
    showQuestion(
        "Kalau hari ini bisa digambarkan dengan satu kata, kamu pilih apa?",
        [
            {
                label: "☀️ Menyenangkan",
                response: {
                    title: "Wah, senang dengarnya! ✨",
                    message: "Berarti ada sesuatu yang membuat harimu terasa lebih berwarna. Semoga kamu punya lebih banyak hari seperti ini, ya. Kamu pantas menikmati hal-hal baik yang datang ke hidupmu."
                },
                next: questionTwo
            },
            {
                label: "🌧️ Melelahkan",
                response: {
                    title: "Hei, istirahat dulu, ya. 🌿",
                    message: "Kamu sudah berusaha melewati hari ini. Kalau memang lelah, nggak apa-apa berhenti sebentar untuk mengambil napas. Kamu nggak harus selalu kuat setiap waktu. Istirahat bukan berarti menyerah, kok."
                },
                next: questionTwo
            },
            {
                label: "☁️ Biasa aja",
                response: {
                    title: "Hari biasa juga berarti. 🤍",
                    message: "Nggak semua hari harus menjadi hari yang luar biasa. Kadang, bisa melewati hari dengan tenang saja sudah cukup. Siapa tahu besok ada hal sederhana yang membuatmu tersenyum."
                },
                next: questionTwo
            }
        ]
    );
}

// ==========================================
// PERTANYAAN 2 — APA YANG DIBUTUHKAN
// ==========================================

function questionTwo() {
    showQuestion(
        "Kalau sekarang kamu boleh memilih, apa yang paling kamu butuhkan?",
        [
            {
                label: "🌿 Waktu untuk diri sendiri",
                response: {
                    title: "Nggak apa-apa mengambil jeda. 🌱",
                    message: "Kadang kita memang butuh waktu untuk menata pikiran dan menikmati suasana sendiri. Kamu nggak harus selalu tersedia untuk semua orang. Luangkan waktu untuk dirimu juga, ya."
                },
                next: questionThree
            },
            {
                label: "🌼 Sesuatu yang menyenangkan",
                response: {
                    title: "Semoga kamu menemukannya! ✨",
                    message: "Mungkin lagu favorit, makanan kesukaan, atau hal kecil yang sudah lama ingin kamu lakukan. Kamu juga boleh menikmati sesuatu hanya karena itu membuatmu bahagia."
                },
                next: questionThree
            },
            {
                label: "🤍 Seseorang untuk diajak cerita",
                response: {
                    title: "Semoga kamu menemukan tempat bercerita. 🌷",
                    message: "Kadang, kita nggak selalu membutuhkan solusi. Didengarkan tanpa dihakimi saja sudah cukup membantu. Semoga kamu punya ruang untuk bercerita ketika memang ingin melakukannya."
                },
                next: questionThree
            }
        ]
    );
}

// ==========================================
// PERTANYAAN 3 — HARAPAN KECIL
// ==========================================

function questionThree() {
    showQuestion(
        "Kalau boleh berharap satu hal baik untuk hari ini, kamu pilih apa?",
        [
            {
                label: "☀️ Hari yang lebih baik",
                response: {
                    title: "Semoga harapan itu terwujud. 🌼",
                    message: "Semoga hal-hal yang terasa sulit perlahan menjadi lebih ringan. Kamu nggak perlu menyelesaikan semuanya sekaligus. Satu langkah kecil pun tetap sebuah kemajuan."
                },
                next: questionFour
            },
            {
                label: "🕊️ Hati yang lebih tenang",
                response: {
                    title: "Semoga hatimu menemukan ketenangan. 🤍",
                    message: "Semoga pikiran yang ramai perlahan mereda dan kamu bisa bernapas lebih lega. Nggak semua hal harus punya jawaban hari ini. Beberapa hal boleh menunggu sampai kamu siap."
                },
                next: questionFour
            },
            {
                label: "🌷 Sesuatu yang sederhana",
                response: {
                    title: "Hal kecil juga bisa berarti besar. ✨",
                    message: "Terkadang, kebahagiaan datang dari hal-hal sederhana yang nggak kita rencanakan. Semoga hari ini ada satu momen kecil yang membuatmu berpikir, ternyata hari ini nggak seburuk itu."
                },
                next: questionFour
            }
        ]
    );
}

// ==========================================
// PERTANYAAN 4 — PENUTUP PERJALANAN
// ==========================================

function questionFour() {
    showQuestion(
        "Sebelum selesai, apa yang ingin kamu ingat hari ini?",
        [
            {
                label: "🌿 Aku sudah berusaha",
                response: {
                    title: "Dan itu layak kamu hargai. 🤍",
                    message: "Hasil nggak selalu datang secepat yang kita inginkan. Tapi usaha yang kamu berikan tetap punya arti. Jangan lupa menghargai dirimu sendiri dalam prosesnya."
                },
                next: ending
            },
            {
                label: "🌼 Aku boleh bahagia",
                response: {
                    title: "Tentu saja boleh! ☀️",
                    message: "Kamu nggak harus menunggu semuanya sempurna untuk menikmati hal-hal baik. Kamu boleh tertawa, beristirahat, dan menikmati momen kecil tanpa merasa bersalah."
                },
                next: ending
            },
            {
                label: "🕊️ Besok adalah kesempatan baru",
                response: {
                    title: "Pelan-pelan, hari baru akan datang. 🌱",
                    message: "Apa pun yang terjadi hari ini, kamu masih punya kesempatan untuk mencoba lagi. Nggak harus langsung sempurna. Cukup jalani satu langkah demi satu langkah."
                },
                next: ending
            }
        ]
    );
}

// ==========================================
// HALAMAN AKHIR
// ==========================================

function ending() {
    showMessage(
        "Terima kasih sudah mampir. 🌼",
        "Semoga ada hal-hal baik yang datang ke hidupmu, bahkan lewat hal sederhana yang mungkin nggak kamu sadari. Kalau hari ini menyenangkan, semoga kamu punya banyak alasan untuk tersenyum. Kalau hari ini terasa berat, semoga kamu diberi kekuatan untuk melewatinya pelan-pelan. Dan kalau hari ini biasa saja, semoga besok ada sesuatu yang membuatnya terasa sedikit lebih baik. Jangan lupa jaga diri, ya. Nggak harus selalu kuat, nggak harus selalu terlihat baik-baik saja. Semoga kamu selalu menemukan alasan kecil untuk tetap tersenyum. 🤍",
        "Selesai 🌿",
        finalScreen
    );
}

function finalScreen() {
    // Matikan musik saat tombol Selesai diklik
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    renderScreen(`
        <div class="subtitle">Until next time</div>

        <h1>Sampai di sini 🌿</h1>

        <p>
            Semoga ada hal baik yang menemanimu hari ini.
            Terima kasih sudah meluangkan sedikit waktumu di sini. 🤍
        </p>
    `);
}


/* ==========================================
   MULAI WEBSITE
   ========================================== */

const bgMusic = document.getElementById("bgMusic");

function playMusic() {
    if (!bgMusic) {
        console.error("Audio #bgMusic tidak ditemukan di HTML!");
        return;
    }

    bgMusic.play()
        .then(() => {
            console.log("Musik berhasil diputar!");
        })
        .catch(error => {
            console.error("Musik gagal diputar:", error);
        });
}

if (container) {
    startWebsite();

    // Putar musik ketika tombol pertama diklik
    document.addEventListener("click", function mulaiMusik() {
        playMusic();
        document.removeEventListener("click", mulaiMusik);
    }, { once: true });

} else {
    console.error(
        'Elemen ".container" tidak ditemukan. Periksa index.html.'
    );
}
