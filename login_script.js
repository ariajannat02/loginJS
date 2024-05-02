const handleSubmit = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
        return ['Email and password are required'];
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const result = await response.json();

        if (result.errors) {
            return result.errors;
        } else {
            // Redirect to user page or handle successful login
            window.location.href = 'user_page.html';
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return ['An error occurred. Please try again later.'];
    }
};

export default handleSubmit;
