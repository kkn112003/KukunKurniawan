document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('main-contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const accessKeyInput = contactForm.querySelector('input[name="access_key"]');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Mencegah reload halaman

        // Ganti dengan access key Anda jika belum diubah di HTML
        if (accessKeyInput.value === "GANTI_DENGAN_ACCESS_KEY_ANDA") {
            alert("Mohon ganti Access Key di file HTML Anda terlebih dahulu.");
            return;
        }

        const formData = new FormData(contactForm);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    // Sukses
                    submitBtn.style.backgroundColor = '#28a745'; // Warna hijau
                    submitBtn.textContent = 'Message Sent! ✔';
                } else {
                    // Gagal
                    console.log(response);
                    submitBtn.style.backgroundColor = '#dc3545'; // Warna merah
                    submitBtn.textContent = jsonResponse.message;
                }
            })
            .catch(error => {
                // Error jaringan
                console.log(error);
                submitBtn.style.backgroundColor = '#dc3545';
                submitBtn.textContent = 'Something went wrong!';
            })
            .then(() => {
                // Reset form dan tombol setelah 3 detik, baik sukses maupun gagal
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.backgroundColor = 'var(--accent-color)';
                }, 3000);
            });
    });
});