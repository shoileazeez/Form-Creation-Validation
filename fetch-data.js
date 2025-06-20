const fetchUserData = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    const dataContainer = document.getElementById("api-data");

    try {
        // Show loading state
        dataContainer.innerHTML = '<p>Loading...</p>';

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Build the HTML string
        let userListHTML = `<h2>User Data</h2>`;
        userData.forEach(user => {
            userListHTML += `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.phone}</p>
                    <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                </div>
            `;
        });

        // Set the innerHTML of the dataContainer
        dataContainer.innerHTML = userListHTML;

    } catch (error) {
        console.error('Error fetching user data:', error);
        dataContainer.innerHTML = `
            <div class="error-message">
                <p>Error fetching user data: ${error.message}</p>
                <button onclick="fetchUserData()">Try Again</button>
            </div>`;
    }
}

// Call the function to fetch user data
document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
});