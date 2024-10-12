  // Handle Google Credential Response
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

// Apple Sign-In Handler
function handleAppleLogin() {
    // Redirect to your backend for Apple OAuth handling
    window.location.href = '/auth/apple';
}

// Initialize all sign-in handlers
window.onload = function() {
    // Google Sign-In
    document.getElementById('googleSignIn').addEventListener('click', function() {
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
            callback: handleCredentialResponse
        });
        google.accounts.id.prompt(); // This will trigger the Google sign-in prompt
    });

    // Facebook SDK initialization
    FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v12.0'
    });

    // Facebook Sign-In
    document.getElementById('facebookSignIn').addEventListener('click', handleFacebookLogin);

    // Apple Sign-In
    document.getElementById('appleSignIn').addEventListener('click', handleAppleLogin);
};