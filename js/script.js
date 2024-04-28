const key = 'MpyrK0S5wd1FtwIT5zoNuiCGGK7hXg48oGfs12gkqaurEvFFOpSpr8bF'
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const section = document.querySelector('#img-section');

const toast = document.querySelector('.toast');
const myToast = new bootstrap.Toast(toast);

const spinner = document.querySelector("#spinner")

const showSpinner = () => {
    spinner.classList.remove("d-none")
}

const hideSpinner = () => {
    spinner.classList.add("d-none")
}

const getImg = async (search = "random") => {
    showSpinner();
    try {
        const response = await fetch("https://api.pexels.com/v1/search?query=" + search, {
            headers: {
                "authorization": key
            }
        })
        const data = await response.json()
        if (response.ok) {            
            return data.photos  
        }
        else{
            errorSearch(data.code);
        }        
    } catch (error) {
        console.log(error);
    } finally{
        hideSpinner();
    }
}

getImg().then(res => 
    res.forEach(image => {
    createCard(image)
}))

const errorSearch = (error) => {
    const toastText = document.querySelector("#toast-desc");
    toastText.innerHTML = `<p>${error}</p>`;
    myToast.show();
}

const createCard = (image) =>{
    
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    imgContainer.classList.add("col-3");
    img.src = image.src.medium;
    img.classList.add("object-fit-cover");
    imgContainer.append(img);
    section.append(imgContainer);
}

searchBtn.addEventListener("click", ()=>{
    console.log(searchInput.value);
    getImg(searchInput.value).then(res =>{
        if (res) {
            section.innerHTML = "";
            res.forEach(image => {
                createCard(image)
            });
        }
    })        
})