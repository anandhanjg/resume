console.log(`https://drive.google.com/file/d/1qjGyx6sWTeOzetzn4PY9Qpfle4H0OkuD/view?usp=sharing`)

const colors=['blue','red','green','#5c2abb','tomato','yellowgreen'];

let index=Math.round(1.0*((Math.random()*((colors.length-1)-0))+0));
let ctab;


jQuery(
function(){
    main()   
    initType() 
    
})



// let hours=new Date().getHours();
// if(hours<6){
//     index=0;
// }else if(hours<12){
//     index=1;
// }else if(hours<18){
//     index=2
// }else{
//     index=3;
// }

document.querySelector(':root').style.setProperty('--main-color', colors[index]);

let audio=document.createElement('audio');
const tabs={
    home:"home",
    about:"about",
    education:"education",
    projects:"projects",
    skills:"skills",
    experience:"experience",
    contact:"contact"
}

 // $('.clicked').css('color',colors[index]);
function main(){
    

   addProDots();
   addExpDots();

    $('.box.nav').on('click',function(e){

        if(e.currentTarget.id==$('.box.clicked')[0].id)
        {
            return;
        }


        // $('.box.nav').removeClass('clicked');
        // $('.box.nav').css('color','black');
        // $(e.currentTarget).addClass('clicked');
        // $(e.currentTarget).css('color',colors[index]);

        showTab(e.currentTarget.id);
    });

    $('.my-img-inner').on('click',function(e){
        showOrHideParticles();
    })

    $('.social-icon').on('click',function(e){
        let id=e.currentTarget.id;
        if(id.includes('insta')){
            window.open("https://www.instagram.com/anandhan.ganesh/");
        }else if(id.includes('fb')){
            window.open("https://www.facebook.com/anandhanjg.dev")
        }else if(id.includes('wp')){
            window.open("https://wa.me/918608251288")
        }else if(id.includes('lin')){
            window.open("https://www.linkedin.com/in/anandhan-ganesh-577491156")
        }else if(id.includes('github')){
            window.open("https://www.github.com/anandhanjg")
        }else if(id.includes('twitter')){
            window.open('https://twitter.com/anandhanjg')
        }
    });

    

    function proSlideLeft(e){
        slidePro(cpi==0?(cpi=$('.project-slides').length-1):(--cpi));
    }

    function proSlideRight(e){
        slidePro(cpi==($('.project-slides').length-1)?(cpi=0):(++cpi));
    }

    function expSlideLeft(e){
        slideExp(cpe==0?(cpe=$('.experience-slides').length-1):(--cpe));
    }

    function expSlideRight(e){
        slideExp(cpe==($('.experience-slides').length-1)?(cpe=0):(++cpe));
    }

    $('.project-arrow-left').on('click',proSlideLeft);
    $('.project-arrow-right').on('click',proSlideRight);

 
    $('.experience-arrow-left').on('click',expSlideLeft);
    $('.experience-arrow-right').on('click',expSlideRight);


    $('.skill-content').on('mouseover',function(e){
        let [img,perc]=e.currentTarget.children;
        img.style.opacity=0;
        perc.style.opacity=1;
    });

    $('.skill-content').on('mouseout',function(e){
        let [img,perc]=e.currentTarget.children;
        img.style.opacity=1;
        perc.style.opacity=0;
    })

    $('.exp_dots > span').on('click',function(e){
        $('.exp_dots span > span').removeClass('selected-dot');
        slideExp(cpe=Number(e.currentTarget.id.replace('exp_',"")));
        e.currentTarget.children[0].setAttribute('class','selected-dot')
    });

    $('.pro_dots > span').on('click',function(e){
        $('.pro_dots span > span').removeClass('selected-dot');
        cpi=Number(e.currentTarget.id.replace('pro_',""))
        slidePro(cpi);
        e.currentTarget.children[0].setAttribute('class','selected-dot')
    });
}

function showTab(tabId){
    $('.box.nav').removeClass('clicked');
    $('.box.nav').css('color','black');
    $(`#${tabId}`).addClass('clicked');
    $('.content').css('transition','opacity 0.5s ease-in-out 0s')
    $('.content').css('opacity',0)
    ctab=tabId;
    setTimeout(()=>{
        $('.content').css('display','none');
        $(`.content.${tabId}`).css('display','block');
    },501)

    // transition: opacity 1s ease-out;
    setTimeout(()=>{
        $(`.content.${tabId}`).css('opacity',1);
    },800);  


    if(tabId==tabs.projects){
        $('.pro_dots span > span').removeClass('selected-dot');
        $('.pro_dots span > span')[0].setAttribute('class','selected-dot')
        slidePro(cpi=0);
    }

    if(tabId==tabs.experience){
        $('.exp_dots span > span').removeClass('selected-dot');
        $('.exp_dots span > span')[0].setAttribute('class','selected-dot');
        slideExp(cpe=0);
    }
}

function initType(){
    let el=document.querySelector('.text-typewriter');
    let data=JSON.parse(el.getAttribute('data-value'));
    let dwait=el.getAttribute('data-wait');
    let typ=new Typewriter(el,data,dwait);
    typ.typewrite();
}

function showOrHideParticles(){
    let particles=$('.particle')
    let music=$('.music-head')
    if(particles.css('display')=='none'){
        music.css('display','block')
        audio.src="assets/others/Neeye_Oli-StarMusiQ.Vip.mp3"
        audio.play();
        particles.css('display','block');
        
        setTimeout(()=>{
            music.css('opacity',1);
        },600)
    }else{
        music.css('opacity',0);
        audio.pause();
        particles.css('display','none');
        

        setTimeout(()=>{
            music.css('display','none')
        },600)
    }
    
}

function Typewriter(el,data,wait){
    this.el=el;
    this.data=data;
    this.wait=wait;
    this.tc=true;
    this.ci=0;
    this.t="";
    this.typewrite=function(){
        const txt=this.data[this.ci];
        if(!this.tc){
            this.t=txt.substring(0,this.t.length-1);
        }else{
            this.t=txt.substring(0,this.t.length+1);
        }
        this.el.innerHTML=this.t;
        let ts=300;
        if(!this.tc)
            ts/=2;
        if(this.tc && txt==this.t){
            this.tc=false;
            ts=this.wait;
        }else if(!this.tc && this.t==""){
            this.tc=true;
            ts=this.wait;
            this.ci=this.ci==this.data.length-1?0:this.ci+1;
        }  
        setTimeout(()=>this.typewrite(),ts);
    }
}

audio.onended=function(e){
    showOrHideParticles();
}


// setInterval(()=>{
//     let tbs=Object.values(tabs);
//     let ind=tbs.indexOf(ctab);
//     ind=ind==tbs.length-1?tbs[0]:tbs[ind+1]
//     showTab(ind);
//     console.log(ind)
//     $(`.box`).removeClass('clicked');
//     $(`#${ind}`).addClass('clicked');
// },1000000)

var cpi=0,cpe=0;


function slidePro(index){
    $('.project-slides').removeClass('d-block');
    let cs=$('.project-slides')[index];
    $(cs).addClass('d-block')
}

function slideExp(index){
    $('.experience-slides').removeClass('d-block');
    let cs=$('.experience-slides')[index];
    $(cs).addClass('d-block')
}

window.onload=clearLoader;
function clearLoader(e){
    let loader=document.querySelector('.loader')
    setTimeout(()=>{
        // if(window.innerWidth>900){
            loader.style.opacity=0;
            setTimeout(()=>{
                loader.style.display='none';
                // document.querySelector('.main-box').style.opacity=1;
                document.querySelector('.main-box').style.display='block';
                showTab(tabs.home);    
            },1001);
        // }else{
        //     document.querySelector('.error').style.display='block';
        // }
    },3000);
}

setTimeout(()=>{
    document.querySelector('.loader').style.opacity=1;
},200);


// window.onresize=function(e){
//     if(window.innerWidth>900){
//         if(document.querySelector('.loader').style.opacity==0){
//             clearLoader();
//         }
//     }else{
//         window.location.reload()
//     }
// }



//add pro_dots inside projects-content
function addProDots(){
    let len=$('.project-slides').length
    let div=document.createElement('div')
    div.setAttribute('class','pro_dots');

    for(var i=0;i<len;i++){
        let span=document.createElement('span');
        let childSpan=document.createElement('span');
        span.setAttribute('id',`pro_${i}`);
        
        if(i==0){
            childSpan.setAttribute('class','selected-dot')
        }
        span.appendChild(childSpan);
        div.appendChild(span);
    }
    document.getElementsByClassName('projects-content')[0].appendChild(div);
}

// add exp_dots inside experiences-content
function addExpDots(){
    let len=$('.experience-slides').length

    let div=document.createElement('div')
    div.setAttribute('class','exp_dots');

    for(var i=0;i<len;i++){
        let span=document.createElement('span');
        let childSpan=document.createElement('span');
        span.setAttribute('id',`exp_${i}`);
        
        if(i==0){
            childSpan.setAttribute('class','selected-dot')
        }
        span.appendChild(childSpan);
        div.appendChild(span);
    }
    document.getElementsByClassName('experiences-content')[0].appendChild(div);
}

function selectProDot(index){

}

function selectExpDot(index){

}

setTimeout(()=>{
    console.table({DevelopedBy:"Anandhan"})
},2000);
