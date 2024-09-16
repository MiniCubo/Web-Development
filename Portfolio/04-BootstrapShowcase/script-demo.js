const imageUrls = [
    'puppy-play-group-beagle.jpg',
    'puppy2.jfif',
    'puppy3.jfif',
    'puppy4.jpg',
    'puppy5.jfif',
    'puppy6.jfif',
    'puppy7.jfif'
];


var popoverTrigger = document.getElementById('searchInput');
var popover = new bootstrap.Popover(popoverTrigger, {
            content: "<ul id='myUL'><li class = 'myli'><a href='#companions'>Dogs</a></li><li class = 'myli'><a href='#download'>Download</a></li><li class = 'myli'><a href='#signIn'>Sign In</a></li></ul>",
            html: true,
            placement: 'bottom'
})
var filter, ul, li, a, i, txtValue

popoverTrigger.addEventListener('shown.bs.popover', () => {
    li = document.querySelectorAll(".myli")

    li.forEach((element) =>{
        element.addEventListener("click", (e) =>{
            console.log(element.textContent)
            popoverTrigger.value = element.textContent
        })
    })
});

// Trigger the popover on page load
window.addEventListener('load', function() {
    var popoverInstance = bootstrap.Popover.getInstance(popoverTrigger);
    popoverInstance.show();
    popoverInstance.hide();
});

popoverTrigger.addEventListener("keydown", (e) =>{
    ul = document.getElementById("myUL")
    filter = popoverTrigger.value.toUpperCase()

    for (i = 0; i < li.length; i++) {
        a = li[i].querySelectorAll("a")[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = ""
        } else {
        li[i].style.display = "none"
        }
    }
    if(filter.length == 0){
        li.forEach((element) =>{
            console.log(element)
            element.style.display = ""
        })
    }
    
})
addEventListener("show.bs.modal", ()=>{
    $(".download-all").click((e) =>{
        e.preventDefault();
        imageUrls.forEach(url => downloadImage(url));
    })
})

function downloadImage(url) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = url.split('/').pop();  // Get the file name from the URL
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}