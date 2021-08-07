

let index=0;
let ctab;


jQuery(
function(){
    main()   
    initType() 
    
})

const colors=['red','blue','green','#5c2abb']

let hours=new Date().getHours();
if(hours<6){
    index=0;
}else if(hours<12){
    index=1;
}else if(hours<18){
    index=2
}else{
    index=3;
}

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

function main(){
    

    // $('.clicked').css('color',colors[index]);

    $('.box.nav').on('click',function(e){

        if(e.currentTarget.id==$('.box.clicked')[0].id)
        {
            return;
        }


        $('.box.nav').removeClass('clicked');
        $('.box.nav').css('color','black');
        $(e.currentTarget).addClass('clicked');
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

    $('.project-arrow-left').on('click',function(e){
        slidePro(cpi==0?(cpi=$('.project-slides').length-1):(--cpi));
    });

    $('.project-arrow-right').on('click',function(e){
        slidePro(cpi==($('.project-slides').length-1)?(cpi=0):(++cpi));
    });

 
    $('.experience-arrow-left').on('click',function(e){
        slideExp(cpe==0?(cpe=$('.experience-slides').length-1):(--cpe));
    });

    $('.experience-arrow-right').on('click',function(e){
        slideExp(cpe==($('.experience-slides').length-1)?(cpe=0):(++cpe));
    });


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
}

function showTab(tabId){
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
        slidePro(cpi=0);
    }

    if(tabId==tabs.experience){
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


setInterval(()=>{
    let tbs=Object.values(tabs);
    let ind=tbs.indexOf(ctab);
    ind=ind==tbs.length-1?tbs[0]:tbs[ind+1]
    showTab(ind);
    console.log(ind)
    $(`.box`).removeClass('clicked');
    $(`#${ind}`).addClass('clicked');
},1000000)

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

window.onload=function(e){
    setTimeout(()=>{
        document.querySelector('.loader').style.opacity=0;


        setTimeout(()=>{
            document.querySelector('.loader').style.display='none';
            document.querySelector('.main-box').style.opacity=1;
            showTab(tabs.home);    
        },1001);
    },3000);
}

setTimeout(()=>{
    document.querySelector('.loader').style.opacity=1;
},200);