const footer = $("footer");

footer.on("click","span",(e)=>{
    const modId = e.target.dataset.mod;
    console.log(modId);
    const mods = document.querySelectorAll(".mod");
    mods.forEach(mod=>{
        mod.classList.add("mhide")
    })
    document.getElementById(modId).classList.remove("mhide")
})