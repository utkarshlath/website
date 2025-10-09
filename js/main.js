document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById("blog-list");
  if (blogList) {
    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((posts) => {
        blogList.innerHTML = "";
        posts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach((post) => {
            const today = new Date();
            const formattedDate = today.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            });
            const li = document.createElement("li");
            const date = new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            li.innerHTML = `<a href="${post.url}">${post.title}</a> <span class="date">${formattedDate}</span>`;
            blogList.appendChild(li);
          });
      })
      .catch(() => {
        blogList.innerHTML = "<li>Failed to load posts.</li>";
      });
  }
});
