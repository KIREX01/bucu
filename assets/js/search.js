document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const pages = [
        { title: 'Home', url: 'index.html', content: 'Welcome to Bugema University Christian Union Fellowship' },
        { title: 'About Us', url: 'about.html', content: 'Our Church, Ministry, Team, Weekly program' },
        { title: 'Ministries', url: 'ministries.html', content: 'Worship, prayer, evangelism, helping others' },
        { title: 'Weekly Programs', url: 'programs.html', content: 'Bible studies, intercession, services' },
        { title: 'Sermons', url: 'sermons.html', content: 'Messages and teachings from our leaders' },
        { title: 'Visitors', url: 'visitors.html', content: 'New visitors, fellowship, membership' },
        { title: 'Contact', url: 'contact.html', content: 'Contact us at Bugema University Christian Union' },
    ];

    const results = pages.filter(page => page.content.toLowerCase().includes(query));
    displayResults(results);
});

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
        resultItem.innerHTML = `<a href="${result.url}">${result.title}</a>`;
        resultsContainer.appendChild(resultItem);
    });
}