document.addEventListener('DOMContentLoaded', function() {
    const fetchBtn = document.getElementById('fetchBtn');
    const reloadBtn = document.getElementById('reloadBtn');
    const userContainer = document.getElementById('userContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    const API_URL = 'https://jsonplaceholder.typicode.com/users';
    
    // Fetch users data
    function fetchUsers() {
        // Show loading state
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        userContainer.innerHTML = '';
        
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
            })
            .catch(error => {
                showError(`Failed to fetch users: ${error.message}`);
            })
            .finally(() => {
                loadingElement.style.display = 'none';
            });
    }
    
    // Display users in the DOM
    function displayUsers(users) {
        if (users.length === 0) {
            showError('No users found');
            return;
        }
        
        userContainer.innerHTML = users.map(user => `
            <div class="user-card">
                <div class="user-name">${user.name}</div>
                <div class="user-email">📧 ${user.email}</div>
                <div class="user-address">
                    <strong>🏠 Address:</strong><br>
                    ${user.address.street}, ${user.address.suite}<br>
                    ${user.address.city}, ${user.address.zipcode}<br>
                    <strong>📍 Geo:</strong> ${user.address.geo.lat}, ${user.address.geo.lng}
                </div>
            </div>
        `).join('');
    }
    
    // Show error message
    function showError(message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Event listeners
    fetchBtn.addEventListener('click', fetchUsers);
    reloadBtn.addEventListener('click', fetchUsers);
    
    // Initial fetch when page loads
    fetchUsers();
});