// fetching the data from the JSON file 
var counter = 1;
var on = counter * 50;

// <html> elements ..
var div,rand,p,img,year,a;  
var song_name,artist,year,img;
var container,anotherContainer;
var idx = 0;
var song_list = [];

fetch('./static/data/data.json')
    .then(function(response) {
        return response.json();
})
    .then(function (data) {
        appendData(data,0,50);
})
    .catch(function (err) {
        console.log('error: '+err);
});


var startButton = document
.querySelector("#btn")
.addEventListener("click", () => {
    if(song_list.length == 0) 
    {
        alert("Queue empty ..")
    } 
    else if(song_list.length < 5) {
        alert("Atleast 5 songs to be added")
    }
    else 
    {
        $.ajax({
            url:"/recommend",
            type:"POST",
            contentType: "application/json",
            data: JSON.stringify(song_list)});
        window.setTimeout(this.start,10000)
    }
});


function start() {
    var counter = 1;
    var strt = 50*counter;
    var lst = strt+50; 
    console.log("connected-to-output json")
    document.getElementById("song").innerHTML = " "
    fetch('./static/data/output.json')
        .then(function(response) {
            return response.json();
    })
        .then(function (data) {
            counter = counter + 1;
            appendData(data,strt,lst);
    })
        .catch(function (err) {
            console.log('error: ' + err);
    });
}

function appendData(data,init,n) {
    // Getting the main div for the song tiles ..
    var mainContainer = document.getElementById("song");

    for (var i = init; i < n; i++) {
        
        rand = Math.floor(Math.random() * data.length);
        // Creating a individual div for songs tile ..
        div = document.createElement("div");
        a = document.createElement("a");

        // under div creating the element of the song ..
        song_name = document.createElement("p");
        artist = document.createElement("p");
        year = document.createElement("p");
        img = document.createElement("img");
        
        // assigning id to the element of the song ..
        div.className = 'S';
        div.setAttribute('id','songs')
        song_name.setAttribute('id','name')
        artist.setAttribute('id','artists')
        a.setAttribute('id','A' + i );
        year.setAttribute('id','yr');
        
        year.innerHTML = data[rand].year;
        img.src = './static/data/logo.png';

        // getting data from the data.json file ..
        song_name.innerHTML = data[rand].name;
        artist.innerHTML = data[rand].artists;
        // appending the element to the div ..
        a.append(div);
        div.append(img);
        div.append(song_name);
        div.append(artist);
        artist.append(" - " + year.innerHTML);
        div.append(year);
        
        mainContainer.appendChild(a);
    }

    var link = document.getElementById("song");
    link.onclick = function assignData() {
        let links = document.getElementsByTagName('a')
        for (let index=0; index < links.length; index++){

            let id = links[index].onclick = function() {
                var container = document.getElementById(this.id);
                var anotherContainer = document.getElementById('Song');

                var div1 = document.createElement('div');
                div1.setAttribute("id","A" + this.id);
                div1.innerHTML = container.innerHTML;
                
                if (document.getElementById(div1.id)) {
                    functionAlert();
                }

                else 
                {
                    anotherContainer.append(div1);
                    i = i+1;
                    song_list[idx]= {
                        "name" : div1.querySelector('#name').innerHTML,
                        "year" : parseInt(div1.querySelector("#yr").innerHTML),
                    }
                    
                    console.log(song_list)
                    localStorage.setItem("user",JSON.stringify(song_list));
                    idx = idx+1;
                }
            }
        }
    }
}

function functionAlert() {
    alert("Selected song already been added to Queue");
}

