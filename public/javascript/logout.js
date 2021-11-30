async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.reload('/');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('#logoutBtn').addEventListener('click', logout);