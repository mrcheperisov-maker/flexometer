async function sendFeedback() {
    const textarea = document.getElementById('feedbackText');
    const text = textarea.value.trim();
    
    if (!text) {
        alert("Поле ввода пустое!");
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/send-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        
        if (data.success) {
            alert("Сообщение успешно отправлено!");
            textarea.value = '';
        } else {
            alert("Ошибка при отправке: " + (data.error || 'Неизвестная ошибка'));
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Не удалось отправить сообщение.");
    }
}
