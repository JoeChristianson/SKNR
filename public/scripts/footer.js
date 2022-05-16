const footer = $("footer");

footer.on("click","span",(e)=>{
    const modId = e.target.dataset.mod;
    console.log(modId);
    if (modId==="analysis-section"){
        window.location.replace("/analysis")
    }
    if (window.location.href[window.location.href.length-1]!=="/"){
        window.location.replace("/")
    }

    const mods = document.querySelectorAll(".mod");
    mods.forEach(mod=>{
        mod.classList.add("mhide")
    })
    document.getElementById(modId).classList.remove("mhide")
})