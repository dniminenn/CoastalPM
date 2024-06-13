document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    axios.post(`${apiBaseUrl}/login`, formData)
    .then(function (response) {
        localStorage.setItem('token', response.data.token);

        // Store the expiry date (20 days from now)
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 20);
        localStorage.setItem('expiry', currentDate.toISOString());

        window.location.href = 'dashboard.html'; // Redirect to the dashboard
    })
    .catch(function (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.response.data.error || 'Unknown error'));
    });
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');  // Also clear the expiry date
    window.location.href = 'index.html';
}
