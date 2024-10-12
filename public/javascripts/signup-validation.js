function validateEmail(email) {
    // Regex to ensure the email ends with @gmail.com
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
}

// Password validation
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Form validation
function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please re-enter.");
        return false;
    }

    return true;
}

// Google Sign-In Handler
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    window.location.href = `/auth/google/callback?token=${response.credential}`;
}

// Facebook Login Handler
function handleFacebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome! Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                window.location.href = `/auth/facebook/callback?token=${FB.getAuthResponse().accessToken}`;
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email'});
}

// Apple Sign-In Handler (Apple-specific logic required)
function handleAppleLogin() {
    // Redirect to your backend for Apple OAuth handling
    window.location.href = '/auth/apple';
}

// Initialize all sign-in handlers
window.onload = function() {
    // Google Sign-In
    document.getElementById('googleSignIn').addEventListener('click', function() {
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID",
            callback: handleCredentialResponse
        });
        google.accounts.id.prompt();
    });

    // Facebook Sign-In
    FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
    });

    document.getElementById('facebookSignIn').addEventListener('click', handleFacebookLogin);

    // Apple Sign-In
    document.getElementById('appleSignIn').addEventListener('click', handleAppleLogin);
};