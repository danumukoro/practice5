const postDisplay = document.getElementById('post-display');

function renderPosts() {
    const posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];

    if (posts.length === 0) {
        postDisplay.innerHTML = `
            <div class="empty-state">
                <p>No stories published yet. Stay tuned for Daniel's empire! 😊</p>
            </div>`;
        return;
    }

    postDisplay.innerHTML = '';

    posts.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'post-entry';

        // Notice the DELETE button is removed here for public safety
        article.innerHTML = `
            <time datetime="${post.date}">${post.date}</time>
            <h2><a href="#">${post.title}</a></h2>
            <p>${post.content}</p>
        `;

        postDisplay.appendChild(article);
    });
}

// Only render posts on the index page
renderPosts();