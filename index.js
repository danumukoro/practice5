const postDisplay = document.getElementById('post-display');

function renderPosts() {
    
    const posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];

    
    if (posts.length === 0) {
        postDisplay.innerHTML = `
            <div class="empty-state">
                <p>No stories published yet. Use the Owner Login to create your first post!</p>
            </div>`;
        return;
    }

    
    postDisplay.innerHTML = '';

    posts.forEach((post, index) => {
        const article = document.createElement('article');
        article.className = 'post-entry';

        article.innerHTML = `
            <time datetime="${post.date}">${post.date}</time>
            <h2><a href="#">${post.title}</a></h2>
            <p>${post.content}</p>
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;

        postDisplay.appendChild(article);
    });
}

function deletePost(index) {
    if (confirm("Permanently delete this post?")) {
        let posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('myBlogPosts', JSON.stringify(posts));
        renderPosts(); 
    }
}


renderPosts();