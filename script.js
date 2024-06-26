let allImages = [];

function displayImages(imagesToShow) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (imagesToShow.length === 0) {
        resultsDiv.textContent = 'No images found matching your search.';
        return;
    }
    imagesToShow.forEach(image => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        const img = document.createElement('img');
        img.src = 'images/' + image.path;
        img.alt = image.name;
        const name = document.createElement('p');
        name.textContent = image.name;
        imgContainer.appendChild(img);
        imgContainer.appendChild(name);
        resultsDiv.appendChild(imgContainer);
    });
}

function getRandomImages(images, count) {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayRandomImages() {
    const randomImages = getRandomImages(allImages, 50);
    displayImages(randomImages);
}

document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
        displayRandomImages();
    } else {
        const filteredImages = allImages.filter(image => 
            image.name.toLowerCase().includes(searchTerm)
        );
        displayImages(filteredImages);
    }
});

// Load JSON and display initial random images
fetch('images.json')
    .then(response => response.json())
    .then(data => {
        allImages = data;
        displayRandomImages();
    })
    .catch(error => {
        console.error('Error loading images:', error);
        document.getElementById('results').textContent = 'Error loading images. Please try again later.';
    });

// Dark mode toggle
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent = document.body.classList.contains('dark-mode') 
        ? 'Toggle Light Mode' 
        : 'Toggle Dark Mode';
});