document.getElementById('captcha-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var url = document.getElementById('url').value;
    if (!url) {
        url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }

    fetch('/solve-captcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        document.getElementById('captcha-solution').textContent = 'Captcha solution: ' + data.solution;
    })
    .catch(function(error) {
        document.getElementById('captcha-solution').textContent = 'Error: ' + error.message;
    });
});