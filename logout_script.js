document.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('name'); // Retrieve the name from localStorage
    const message = document.getElementById('logoutMessage');
    if (name) {
        message.textContent = `You've been logged out, ${name}`;
    } else {
        message.textContent = 'You have been logged out.';
    }
});
