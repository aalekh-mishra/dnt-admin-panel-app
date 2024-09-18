export function getAuthHeaders() {
    const token = localStorage.getItem('accessToken'); // Example, can use Redux or other storage
    return {
        Authorization: `Bearer ${token}`,
    };
}
  
export function handleLogout() {
    localStorage.removeItem('accessToken'); // Clear token or any other session data
    window.location.href = '/sign-in'; // Redirect to login page
}