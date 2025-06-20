const fetchUserData = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    const dataContainer = document.getElementById("api-data");

    // Clear previous content
    while (dataContainer.firstChild) {
        dataContainer.removeChild(dataContainer.firstChild);
    }

    try {
        // Show loading state
        const loadingText = document.createElement('p');
        loadingText.textContent = 'Loading...';
        dataContainer.appendChild(loadingText);

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Clear loading message
        dataContainer.removeChild(loadingText);

        // Create heading
        const heading = document.createElement('h2');
        heading.textContent = 'User Data';
        dataContainer.appendChild(heading);

        // Create user list
        const userList = document.createElement('ul');
        userList.className = 'user-list';

        userData.forEach(user => {
            const userCard = document.createElement('li');
            userCard.className = 'user-card';

            const name = document.createElement('h3');
            name.textContent = user.name;

            const email = document.createElement('p');
            email.textContent = `Email: ${user.email}`;

            const phone = document.createElement('p');
            phone.textContent = `Phone: ${user.phone}`;

            const website = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = `http://${user.website}`;
            websiteLink.target = '_blank';
            websiteLink.textContent = user.website;
            website.textContent = 'Website: ';
            website.appendChild(websiteLink);

            userCard.appendChild(name);
            userCard.appendChild(email);
            userCard.appendChild(phone);
            userCard.appendChild(website);

            userList.appendChild(userCard);
        });

        dataContainer.appendChild(userList);

    } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Clear container
        while (dataContainer.firstChild) {
            dataContainer.removeChild(dataContainer.firstChild);
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';

        const errorText = document.createElement('p');
        errorText.textContent = `Error fetching user data: ${error.message}`;

        const retryButton = document.createElement('button');
        retryButton.textContent = 'Try Again';
        retryButton.onclick = fetchUserData;

        errorDiv.appendChild(errorText);
        errorDiv.appendChild(retryButton);
        dataContainer.appendChild(errorDiv);
    }
}

// Call the function to fetch user data
document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
});