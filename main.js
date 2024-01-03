const imageUrl = document.querySelector("#img-url");
const submitBtn = document.querySelector("#sbtBtn");
const imagesContainer = document.querySelector('#img-container')


submitBtn.addEventListener("click", () => {
  let imgURL = imageUrl.value.trim();
  storeImage(imgURL, () => {
    imagesContainer.innerHTML += `<img src='${imgURL}'>`;

    // empty the input
    input.value = "";
  });
});

// storing the image into cache
function storeImage(imgURL, callback) {
  caches
    .open("images")
    .then((cache) => {
      return cache.add(imgURL);
    })
    .then(() => {
      callback();
    });
}

// displaying cached images
function showImages() {
  caches.open("images").then((cache) => {
    cache.keys().then((keys) => {
      keys.forEach((request) => {
        imagesContainer.innerHTML += `<img src='${request.url}'>`;
      });
    });
  });
}

showImages();
