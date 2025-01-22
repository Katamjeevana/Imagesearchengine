document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('search-input').value;
  if (query) {
    searchImages(query);
  }
});

async function searchImages(query) {
  const accessKey = 'CUaUdrBYwJaoUh2qPr4MFW16ScxMjLscD0DPRzDa4BM'; // Replace with your Unsplash Access Key
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  const imageResults = document.getElementById('image-results');
  imageResults.innerHTML = '';

  if (images.length === 0) {
    imageResults.innerHTML = '<p>No images found. Please try a different search.</p>';
    return;
  }

  images.forEach(image => {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    const img = document.createElement('img');
    img.src = image.urls.small;
    img.alt = image.alt_description;

    const caption = document.createElement('p');
    caption.textContent = image.alt_description || 'No description available';

    imageItem.appendChild(img);
    imageItem.appendChild(caption);
    imageResults.appendChild(imageItem);
  });
}
/*<div id="image-results">
<div class="image-item">
<img src="image1_url" alt="Description of image 1">
<p>Description of image 1</p>
</div>
<div class="image-item">
<img src="image2_url" alt="Description of image 2">
<p>Description of image 2</p>
</div>
<!-- Additional image items -->
</div>*/

