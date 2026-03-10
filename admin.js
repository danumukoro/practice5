const postForm = document.querySelector('.post-form');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const contentInput = document.getElementById('content');

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    
    const newPost = {
        title: titleInput.value,
        date: dateInput.value,
        content: contentInput.value
    };

    
    let posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];

    
    posts.unshift(newPost);

    
    localStorage.setItem('myBlogPosts', JSON.stringify(posts));

    alert('Published Successfully!');
    window.location.href = 'index.html'; 
});