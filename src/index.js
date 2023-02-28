document.addEventListener('DOMContentLoaded', () => {
    fetchImg();
    fetchBreed();
});


function fetchImg() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(response => response.json())
    .then(results => {
        results.message.forEach(dog => renderImg(dog))
    })
};

function renderImg(dog) {
    const dogImgContainer = document.getElementById('dog-image-container')
    const newImg = document.createElement('img')
    newImg.src = dog;
    newImg.style.height = '200px';
    newImg.style.width = '200px';
    dogImgContainer.append(newImg)
};

function fetchBreed() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(response => response.json())
    .then(results => renderBreed(results))
};

function renderBreed(breed) {
    const ul = document.getElementById('dog-breeds')
    const newBreed = Object.keys(breed.message)

    const breedOption = document.getElementById('breed-dropdown')
    breedOption.addEventListener('change', (e) => {
        dynamicList = newBreed.filter((breed) => {
            return breed.charAt(0) === e.target.value
        })
        
        ul.innerHTML = ''

        dynamicList.forEach(dog => {
            li = document.createElement('li')
            if(breed.message[dog]) {
                li.innerText = `${[dog]} ${breed.message[dog]}`
            } else {
                li.innerText = dog
            };
            
            li.addEventListener('click', (e) => {
                if (e.target.style.color === 'black') {
                    e.target.style.color = 'blue'
                } else {
                    e.target.style.color = 'black'
                }
            });
            ul.append(li)
        });
    });
};
