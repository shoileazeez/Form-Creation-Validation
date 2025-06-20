document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        let isValid = true;
        const messages = [];
        
        // Always show feedback div
        feedbackDiv.style.display = 'block';

        if (username === '' || email === '' || password === '') {
            feedbackDiv.textContent = 'All fields are required!';
            feedbackDiv.style.color = '#dc3545';
            feedbackDiv.style.backgroundColor = '#f8d7da';
            feedbackDiv.style.border = '1px solid #f5c6cb';
            feedbackDiv.style.padding = '10px';
            feedbackDiv.style.borderRadius = '4px';
            return;
        }

        if (username.length < 3) {
            isValid = false;
            messages.push('Username must be at least 3 characters long.');
        }

        // Better email validation using regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            messages.push('Please enter a valid email address.');
        }

        if (password.length < 8) {
            isValid = false;
            messages.push('Password must be at least 8 characters long.');
        }

        if (isValid) {
            feedbackDiv.textContent = 'Registration successful!';
            feedbackDiv.style.color = '#28a745';
            feedbackDiv.style.backgroundColor = '#d4edda';
            feedbackDiv.style.border = '1px solid #c3e6cb';
            feedbackDiv.style.padding = '10px';
            feedbackDiv.style.borderRadius = '4px';
            
            // Only show alert and reset form on success
            alert('Registration successful!');
            form.reset();
        } else {
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.style.color = '#dc3545';
            feedbackDiv.style.backgroundColor = '#f8d7da';
            feedbackDiv.style.border = '1px solid #f5c6cb';
            feedbackDiv.style.padding = '10px';
            feedbackDiv.style.borderRadius = '4px';
        }
    });
});
