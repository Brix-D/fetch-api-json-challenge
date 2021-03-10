function getPostsJson(urlLink) {
    fetch(urlLink, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
}

module.exports.posts = getPostsJson;