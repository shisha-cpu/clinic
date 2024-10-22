
document.addEventListener("DOMContentLoaded", function() {
fetch('header.html')
.then(response => response.text())
.then(data => {
    document.querySelector('#header-placeholder').innerHTML = data;


    const modal = document.getElementById("consultationModal");
    const btn = document.getElementById("consultationButton");
    const span = document.getElementById("closeModal");
    const form = document.getElementById("consultationForm");

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission
    form.onsubmit = function(event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        // Replace with your actual Telegram bot token and chat ID
        const telegramBotToken = '7812057575:AAH4af-MTD4MP6NTK9C3CPrZZYRErq0QwVI';
        const chatId = '1137493485';
        const message = `Имя: ${name}\nТелефон: ${phone}`;

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Ваше сообщение отправлено!');
                modal.style.display = "none"; // Close modal after submission
                form.reset(); // Reset form fields
            } else {
                alert('Ошибка при отправке сообщения.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка при отправке сообщения.');
        });
    }
});
})