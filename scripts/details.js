// Commonly used values
const access_token = "108903921378162";
const api_url = "https://superheroapi.com/api.php/"+access_token+"/";
const favFalse = '../assets/images/white_star.png';
const favTrue = '../assets/images/red_star.png';


driver();

async function driver(){
    const id = extractId();
    const data = await getInfo(id);
    renderPage(data);
}

//Extracting ID from url
function extractId(){
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}

// Function to call the API
async function getInfo(id){
    let response = await fetch(api_url+id);
    if(response.ok){
        var jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
    else{
        alert("HTTP-Error: ",response.status);
    }
}

function renderPage(data){
    document.getElementById('data-container').name = data.id;

    // Setting image of the hero
    var image = document.getElementById('image');
    image.firstElementChild.src = `${data.image.url}`;
    
    // Setting the fav icon
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));
    if(favs.indexOf(data.id) != -1){
        image.lastElementChild.src = favTrue;
    }
    else{
        image.lastElementChild.src = favFalse;
    }

    // Appearance
    document.getElementById('appearance').innerHTML = makePresentable(data.appearance);
    // Biography
    document.getElementById('biography').innerHTML = makePresentable(data.biography);
    // Occupation
    document.getElementById('occupation').innerHTML = makePresentable(data.work);
    // Connections
    document.getElementById('connections').innerHTML = makePresentable(data.connections);
}

// Converting JSON objects to paragraph
function makePresentable(jsonData){
    var str='';
    for (var key in jsonData){
        str += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ jsonData[key]+ '</p>';
    }
    return str;
}