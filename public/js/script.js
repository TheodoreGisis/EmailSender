// script.js
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const senderEmail = document.getElementById('senderEmail').value;
    const receiverEmail = document.getElementById('receiverEmail').value;
    const message = document.getElementById('message').value;
    const errorDiv = document.getElementById('error');

    fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ senderEmail, receiverEmail, message })
    }).then(response => {
        if (response.ok) {
            console.log('Email sent successfully');
            window.location.href = '/html/success.html'; // Navigate to the success page
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Failed to send email');
            });
        }
    }).catch(error => {
        console.error('Error:', error);
        errorDiv.textContent = error.message;
    });
});
