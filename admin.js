// 1. Password Protection (Same as before)
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
        const password = prompt("Enter Admin Password:");
        if (password === 'admin123') {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
        } else {
            alert("Access Denied");
            window.location.href = 'index.html';
        }
    }
}
checkAuth();

// 2. Helper Function for Real-Time Date String
function getFormattedDateTime() {
    const now = new Date();
    
    // Formats like: "Mar 19, 2026 • 8:45 PM"
    return now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(',', ' •'); 
}

// 3. Elements
const postForm = document.querySelector('.post-form');
const adminPostList = document.getElementById('admin-post-list');

// 4. Render Posts for Admin
function renderAdminPosts() {
    const posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];
    
    if (posts.length === 0) {
        adminPostList.innerHTML = "<p style='color: #666;'>No posts to manage.</p>";
        return;
    }

    adminPostList.innerHTML = '';

    posts.forEach((post, index) => {
        const item = document.createElement('div');
        item.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #eee;";
        
        item.innerHTML = `
            <div>
                <strong style="display: block;">${post.title}</strong>
                <small style="color: #007bff; font-weight: bold;">Published: ${post.date}</small>
            </div>
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;
        adminPostList.appendChild(item);
    });
}

// 5. Delete Logic
window.deletePost = function(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        let posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('myBlogPosts', JSON.stringify(posts));
        renderAdminPosts();
    }
}

// 6. Updated Handle Form Submission with Real-Time Date
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        // This captures the exact time of the click
        date: getFormattedDateTime() 
    };

    let posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];
    posts.unshift(newPost);
    localStorage.setItem('myBlogPosts', JSON.stringify(posts));

    alert('Published to the Empire successfully!');
    window.location.href = 'index.html';
});

// Initial Render
renderAdminPosts();

// Logout logic
window.logout = function() {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'index.html';
}