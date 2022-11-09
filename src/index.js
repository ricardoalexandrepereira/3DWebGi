import {
    ViewerApp,
    AssetManagerPlugin,
    addBasePlugins,
    CanvasSnipperPlugin,

   

} from "webgi";
import "./styles.css";
import gsap from 'gsap';
import{ ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pane } from 'tweakpane';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({scroller: ".mainContainer"})



async function setupViewer(){

    
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas'),
        useRgbm: false,
        isAntialiased: true,
    })

    const data = {
        position:{x:0, y:0, z:0},
        rotation:{x:0, y:0, z:0},

    }

    const pane = new Pane();

    viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);
    
    const manager = await viewer.addPlugin(AssetManagerPlugin)

    await addBasePlugins(viewer)
    const importer = manager.importer

    importer.addEventListener('onProgress',(e)=>{
        const progress = e.loaded/e.total

        document.querySelector('.progress').setAttribute('style',`transform: scaleX(${progress})`)
    })
    importer.addEventListener('onLoad', ()=>{
        introAnimation();
    })

  

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    const model = await manager.addFromPath("./assets/scene (2).glb")
    const Object3d = model[0].modelObject;
    const modelPosition = Object3d.position;
    const modelRotation = Object3d.rotation;

    const loaderElement = document.querySelector('.loader')

    function introAnimation(){
        const tl = gsap.timeline()

        tl.to('.loader',{
            x:'150%',
            duration: 0.8,
            ease:'power4.inOut',
            delay:1,
            onComplete: setupScrollAnimation
        })

    }

    pane.addInput(data,"position", {
        x: {step: 0.01},
        y: {step: 0.01},
        z: {step: 0.01},

    })
    pane.addInput(data,"rotation", {
        x: { min:-6.28 ,max: 6.28 ,step: 0.001 },
        y: { min:-6.28 ,max: 6.28 ,step: 0.001 },
        z: { min:-6.28 ,max: 6.28 ,step: 0.001 },

    })

    pane.on("change", (e)=>{
        if (e.presetKey === 'rotation'){
            const {x, y, z} = e.value;
            modelRotation.set(x,y,z);
        }else{
            const {x,y,z} = e.value;
            modelPosition.set(x, y, z);
        }
        onUpdate();
    })

    function setupScrollAnimation(){
        document.body.removeChild(loaderElement)

        const tl2 = gsap.timeline()
        tl2.to(modelPosition,{
            x:0,
            y:0,
            z:0,
            scrollTrigger:{
                trigger: '.first',
                start:'top top',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
            onUpdate,
        })
        //section second
        .to(modelPosition,{
            x:-1.050,
            y:0,
            z:-0.100,
            scrollTrigger:{
                trigger: '.second',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
            onUpdate,
        })
        
        .to(modelRotation,{
            x:0,
            y:0,
            z:-1.57,
            scrollTrigger:{
                trigger: '.second',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
            
        })
        //section three
        .to(modelPosition,{
            x:-1.12,
            y:-0.47,
            z:-1.12,
            scrollTrigger:{
                trigger: '.third',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
            onUpdate,
        })
        .to(modelRotation,{
            x:0.100,
            y:1,
            z:-0.125,
            scrollTrigger:{
                trigger: '.third',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
           
        })
         //section four
         .to(modelPosition,{
            x:0,
            y:-0.64,
            z:0.82,
            scrollTrigger:{
                trigger: '.fourth',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
            onUpdate,
        })
        .to(modelRotation,{
            x:0,
            y:1.633,
            z:0,
            scrollTrigger:{
                trigger: '.fourth',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
           
        })
         //section five
         .to(modelPosition,{
            x:2.12,
            y:-0.68,
            z:-0.96,
            scrollTrigger:{
                trigger: '.five',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
            onUpdate,
        })
        .to(modelRotation,{
            x:0.100,
            y:4.043,
            z:0.100,
            scrollTrigger:{
                trigger: '.five',
                start:'top bottom',
                end:'top top',
                scrub:0.2,
                immediateRender: false,
            },
           
        })
        .to(".section--one",{
            opacity:0,
            scrollTrigger:{
                trigger:".section--one",
                start:"top top",
                end:"bottom top",
                scrub:true,
                immediateRender:false,
            },
        }).to(".spec--wrapper",{
            opacity:0,
            scrollTrigger:{
                trigger:".second",
                start:"top bottom",
                end:"top center",
                scrub:true,
                immediateRender:false,
            },
        }).to('.section--two',{
           
            scrollTrigger:{
                trigger:".section--two",
                start:"top center",
                end:"bottom top",
                toggleClass:"activeRightSpecific",
                scrub:true,
            },
        }).to('.section--two--container2',{
           
            scrollTrigger:{
                trigger:".section--two--container2",
                start:"top center",
                end:"bottom center",
                toggleClass:"resetPosition",
                scrub:true,
            },
        }).to('.section--three',{
           
            scrollTrigger:{
                trigger:".section--three",
                start:"top center",
                end:"bottom top",
                toggleClass:"activeRightSpecific",
                scrub:true,
            },
        }).to('.section--three',{
           
            scrollTrigger:{
                trigger:".section--three",
                start:"top center",
                end:"bottom center",
                toggleClass:"resetPosition",
                scrub:true,
            },
        }).to('.section--four',{
           
            scrollTrigger:{
                trigger:".section--four",
                start:"top center",
                end:"bottom top",
                toggleClass:"activeRightSpecific",
                scrub:true,
            },
        }).to('.section--four',{
           
            scrollTrigger:{
                trigger:".section--four",
                start:"top center",
                end:"bottom center",
                toggleClass:"resetPosition",
                scrub:true,
            },
        }).to('.section--five',{
           
            scrollTrigger:{
                trigger:".section--five",
                start:"top center",
                end:"bottom top",
                toggleClass:"activeRightSpecific",
                scrub:true,
            },
        }).to('.section--five',{
           
            scrollTrigger:{
                trigger:".section--five",
                start:"top center",
                end:"bottom center",
                toggleClass:"resetPosition",
                scrub:true,
            },
        }).to('.background',{
           
            scrollTrigger:{
                trigger:".background",
                start:"top bottom",
                end:"bottom top",
                
                scrub:true,
            },
        }).to('.background',{
           
            scrollTrigger:{
                trigger:".background",
                start:"top center",
                end:"bottom center",
                toggleClass:"resetPosition",
                scrub:true,
            },
        })


    }

    function onUpdate(){
        viewer.setDirty();
    }

    document.querySelectorAll('.button--footer')?.forEach((item)=>{
        item.addEventListener('click', ()=>{
            const container = document.getElementsByClassName('mainContainer');
            
            container[0].scrollTo({top:0, left:0, behavior: "smooth"});
        })
    })

   
}

setupViewer()   
