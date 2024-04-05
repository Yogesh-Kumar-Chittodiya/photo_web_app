var users =[
    {
        profilePic: "image/user1profilepic.avif",
        displayPic:"image/user1displaypic.avif",
        pendingMessage:4,
        location: "Delhi, India",
        name: "Pragya",
        age: 22,
        interests: [{
            icon:  `<i class="text-sm ri-music-2-fill"></i>`,
            interest: "Music"
        },
        {
            icon:  `<i class="ri-brush-fill"></i>`,
            interest: "Painting"
        }],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus fugiat nostrum illum consectetur iusto voluptas beatae at delectus odit placeat cupiditate neque.",
        isFriend: null
    },
    {
        profilePic:"https://images.unsplash.com/photo-1649898969783-0d4b2cecaa7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
        displayPic:"https://images.unsplash.com/photo-1619538036719-af01c2eb1f41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
        pendingMessage:13,
        location: "Delhi, India",
        name: "Kajol",
        age: 22,
        interests: [{
            icon:  `<i class="text-sm ri-music-2-fill"></i>`,
            interest: "Music"
        },{
            icon:  `<i class="ri-disc-line"></i>`,
            interest: "Singing"
        }],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus fugiat nostrum illum consectetur iusto voluptas beatae at delectus odit.",
        isFriend: null
    },
    {
        profilePic:"image/user3profilepic.avif",
        displayPic:"image/user3displaypic.avif",
        pendingMessage:21,
        location: "Mumbai, India",
        name: "Shalini",
        age: 19,
        interests: [{
            icon:  `<i class="ri-walk-line"></i>`,
            interest: "Dancing"
        },
        {
            icon:  `<i class="ri-movie-2-line"></i>`,
            interest: "Acting"
        }],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        isFriend: null
    },
    {
        profilePic:"image/user4profilepic.avif",
        displayPic:"image/user4displaypic.avif",
        pendingMessage:21,
        location: "Mumbai, India",
        name: "Seema",
        age: 19,
        interests: [{
            icon:  `<i class="ri-walk-line"></i>`,
            interest: "Dancing"
        },
        {
            icon:  `<i class="ri-quill-pen-fill"></i>`,
            interest: "Writer"
        }],
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus fugiat nostrum illum consectetur iusto voluptas beatae at delectus odit placeat cupiditate neque.",
        isFriend: null
    },
];

function select(elem){
    return document.querySelector(elem);
}

let curr=0;
let isAnimating=false;

function setData(curr){
    select(".prflimg img").src = users[curr].profilePic;
    select(".badge h5").textContent = users[curr].pendingMessage;
    select(".location h3").textContent = users[curr].location;
    select(".name h1:nth-child(1)").textContent = users[curr].name;
    select(".name h1:nth-child(2)").textContent = users[curr].age;
    let clutter ="";
    users[curr].interests.forEach(function(interest){
        clutter +=`<div class="tag flex items-center justify-center bg-white/30 px-3 py-1 rounded-full gap-3">
        ${interest.icon}
        <h3 class="text-sm tracking-tight">${interest.interest}</h3>
    </div>`
    })
    select(".tags").innerHTML=clutter;

    select(".bio p").textContent = users[curr].bio;
}

//IIF imidiately invoked function
(function setInitial(){
    select(".maincard img").src = users[curr].displayPic;
    select(".incomingcard img").src = users[curr+1]?.displayPic;
    
    setData(curr);

    curr=2;
})();

function imageChange(){
    if(!isAnimating){
        isAnimating=true;
        let tl = gsap.timeline({  
            onComplete: function(){
                isAnimating=false;
                let main = select(".maincard");
                let incoming = select(".incomingcard");
    
                incoming.classList.remove("z-[2]");
                incoming.classList.add("z-[3]");
                incoming.classList.remove("incomingcard");
    
                main.classList.remove("z-[3]");
                main.classList.add("z-[2]");
                gsap.set(main,{
                    scale:1,
                    opacity:1
                })
                if(curr==users.length)curr=0;
                select(".maincard img").src=users[curr].displayPic;
                curr++;
                main.classList.remove("maincard");
                incoming.classList.add("maincard");
                main.classList.add("incomingcard");
            }
        });
    
        tl.to(".maincard",{
            scale:1.1,
            opacity:0,
            ease:Circ,
            duration:0.9
        },"a")
        .from(".incomingcard",{
            scale:0.9,
            opacity:0,
            ease:Circ,
            duration:1.1
        },"a") 
    }   
}

let deny = select(".deny");
let accept = select(".accept");

deny.addEventListener("click",function(){
    imageChange();
    setData(curr-1);
    gsap.from(".details .element",{
        y: "100%",
        opacity: 0,
        stagger: .06,
        ease: Power4.easeInOut,
        duration: 1.5
    });
});

(function containerCreator(){
   document.querySelectorAll(".element")
   .forEach(function(element){
        let div = document.createElement("div");
        div.classList.add(`${element.classList[1]}container`,"overflow-hidden");
        // console.log(div);
        div.appendChild(element);
        select(".details").appendChild(div);
   }) 
})();


