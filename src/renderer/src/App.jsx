import { useState, useRef, useEffect } from "react"
import 'material-icons/iconfont/material-icons.css';
import TreeComponent from "./TreeComponent";
import Item from "./item";
import { useMultiDrag } from "../useDrag";
import fontsDir from './google-fonts.json'
import components from './components.json'
import ViewportContainer from "./cool";
function App() {

  const [_, update] = useState(false)
  const theme =useRef({primary:[200,200,200]})
  const [searchQuery,setSQ] = useState('')
  const [panes,setPanes] = useState({})
  const [fontPane,setFP] = useState(false)
  const [prefabPane,setPP] = useState(false)
  const [prefabBar,setPB] = useState(false)
  const [pagePane,setNPP] = useState(false)
  const prevElement = useRef(false)
  const initialFrame = useRef(null)
  const importedFonts = useRef({'arial':'sans-serif'})
  const [sel, setSel] = useState(Item.body)
  const tree = useRef(Item.itemRefs)
  const [docy, setDoc] = useState('')
  const fontsDirectory = fontsDir
  const frames = useRef([])
  const [, force] = useState(0);
  components.sigma='uwu'
  const [displays,setDisplays] = useState([])
  const innerPane=''
  // `
  //     <div class='p-2'>
  //     <div class='h-16 border-2 border-dashed border-spacing-3 border-gray-500 flex flex-wrap w-full justify-center items-center gap-3'>
  //       <button class='border-2 bg-blue-600 text-white h-fit p-2 pt-0 pb-0 font-thin'>Add Box</button>
  //       <button class='border-2 bg-neutral-700 text-white h-fit p-2 pt-0 pb-0 font-thin'>Add Base</button>
  //     </div>
  //     <div class='absolute flex justify-center'>
  //       <button class='material-icons'>grid_on</button>
  //       <button class='material-icons'>view_comfy</button>

  //     </div>

  //   </div>
  // `

  useMultiDrag('viewport')


function pull(given) {
  let extras=''
  if (given==sel){
    extras=innerPane
  }
  if(Object.keys(Item.prefabs).includes(given.type)){
    return Item.prefabs[given.type]
  }
  if(given.type=='img'){
        let content = `
      <img id='${given._id}' class="${given.classes}"
      style="${parseCss(given)}"
      src='${given.src}'
      ${given.extras}
      />`
      return content
  }else if(given.type == 'input'){
        let content = `
      <input id='${given._id}' class="${given.classes}"  type='${given._type}'
      ${given.extras}
      style="${parseCss(given)}"
      src='${given.src}'
      />`
      return content
      }
      let content = `
      <${given.type} id='${given._id}'
      style="${parseCss(given)}"
      class="${given.classes}" 
      ${given.extras}>
      ${given.content.replaceAll('\n','<br>')}
      {!!!!}
      ${extras}
      </${given.type}>
      `

      let push = ''
      for (let itm of given.children) {
        push += pull(itm)
      }
      return content.replace(`{!!!!}`, push)
    }

function toPrefab(given,name){
 let content = ''
    for (let itm of given.children) {
        content += pull(itm)
    }
    content=`
      <${given.type} id='${given._id}'
      style="${parseCss(given)}"
      class="${given.classes}" 
      ${given.extras}>
      ${given.content.replaceAll('\n','<br>')}
      {!!!!}
      </${given.type}>
      `.replace('{!!!!}', content)
    given.clip()
    Item.registerPrefab(content,name)
}


  function Inject() {
    let content = ''
    for (let itm of Item.itemRefs) {
      if (!itm.isChild) {
        content += pull(itm)
      }
    }
    return content
  }
  // useEffect(()=>{
  //   // api.cook(docy, window._src)
  // },[_c])

// handle updates
const parseCss =(given)=>{
return given.inline?`font-family:'${given.font}' ${given.font=='arial'?',':''} ${['sans-serif','serif'].includes('importedFonts.current[given.font]')?importedFonts.current[given.font]:''}; font-weight:${given.weight};text-align:${['left','center','right'][given.alignment]};filter:drop-shadow(${given.shadow[0]}px ${given.shadow[1]}px ${given.shadow[2]}px ${given.shadow[3]}) grayscale(${given.gray*100}%);${given.css}`:''

}
// handle scen changes

useEffect(() => {
    function handleMessage(event) {
      // optional: check event.origin
      if (event.data?.type === "redirect") {
        Item.loadPage(event.data.href)
        
        // setTimeout(()=>update(!_),0)
        update(!_)
        force(n => n + 1);
        console.log('i felt that')
        console.log("Iframe says:", event.data.href);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);



  useEffect(() => {
    window.electron.ipcRenderer.once("css", (_, css) => {
      window._css = css
    });

    if (prevElement.current) {
      let docy = Inject()
      console.log(window._css)
      let extras=innerPane
  
      let src = `
<!DOCTYPE html>
<html>
<head>
    <title>My Styled Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://firebasestorage.googleapis.com/v0/b/fiddle-mokk.firebasestorage.app/o/fiddleMokk.css?alt=media&token=ec476c8d-3ce5-4ae5-940f-45e1eee69c1c" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes">
    <style>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee&display=swap');
${Object.keys(importedFonts.current).reduce((acc,val)=>{if(val!='arial') return acc+`family=${val.split(' ').join('+')}&`; return acc},
      `@import url('https://fonts.googleapis.com/css2?`)+"display=swap');"}
    html{
      width:100dvw;
      height:100dvh;
    }
  

    
    </style>
</head>
<body 
id='main'
style="${parseCss(Item.body)}"

class="${Item.body.classes}"
>
${Item.body.content}
    ${docy}
${sel==Item.body?extras:''}
<div class='max-h-[38px] h-[38px]'>&nbsp;</div>
<div class='z-[500] fixed bottom-0 left-0 p-1 pt-4 pb-4 pl-5 pr-5 pointer-events-none bg-black w-[100%] h-[38px] max-h-[38px] text-white justify-between items-center flex'>
      <div class='material-icons text-[20px]'>arrow_back_ios</div>
      <div class='material-icons -scale-x-100'>radio_button_unchecked</div>
      <div class='material-icons -scale-x-100'>crop_square</div>
</div>
<script>

document.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault(); // stop normal navigation

    const url = a.getAttribute("href");

    window.parent.postMessage(
      { type: "redirect", href: url },
      "*"
    );
  });
});

document.querySelectorAll(".switch-fm").forEach(swap => {
  swap.addEventListener("click", (e) => {
    swap.classList.toggle('switch-on-fm')

  });
});

</script>
</body>
</html>
`
if(frames.current){
  for(let item of frames.current){
    console.log(item)
    let frame = item.querySelector('iframe')
    if(frame)
    if (frame.contentDocument || frame.contentWindow) {
    let doc = frame.contentDocument || frame.contentWindow.document || null
          doc.open();
          doc.write(src);
          doc.close();
    }
  }
}
      // if (prevElement.current)
      //   if (prevElement.current.contentDocument || prevElement.current.contentWindow) {
      //     let doc = prevElement.current.contentDocument || prevElement.current.contentWindow.document || null
      //     doc.open();
      //     doc.write(src);
      //     doc.close();
      //   }
      setDoc(src)
    }
    
  })
  //keep up to date!!
  useEffect(() => {
    tree.current = Item.itemRefs
  })

  const setSelWrapper = (val)=>setSel(val)

  useEffect(()=>{
    console.log(Item.newCB)
  },[])
  const closeFont = () => setFP(false)

  const closeFontAndSet = (family) => {
    importedFonts.current[family[0]]=family[1]
    setFP(false)
    if(sel){
    sel.font=family[0]
    update(!_)
    }
  }
  return (
    <div className='w-full h-full overflow-hidden mt-10'>
      <div className="text-center flex border-b absolute mt-[-45px] p-3 h-[45px] no-drag bg-gray-200 w-full font-thin">
        <p className='w-full font-thin text-right tb'>Fiddle</p>
        <div className="w-full text-left flex">
          <div className='w-full mr-2 tb'>Mokk</div>
          <div>Export</div>
        </div>
      </div>
      <div className="absolute right-5 flex flex-col h-full z-20 w-min justify-center mt-10 ml-10">
        <span></span>
        
      </div>
      {/* fonts!!!!!! */}
      {fontPane&&<div className='absolute w-full h-full flex items-center justify-center z-50 backdrop-blur-md bg-[rgba(0,0,0,0.5)]'>
        <div className="max-w-xl p-5 w-full h-[400px] shadow-xl bg-gray-100 rounded-lg flex flex-col" tabIndex='0'>
          <div className="border-b border-gray-400 pl-0 p-2 flex items-center">
            <button className="material-icons pr-2" onClick={closeFont}>arrow_back</button>Fonts
            <input value={searchQuery} onChange={(e)=>setSQ(e.target.value)} className='ml-2 p-2 rounded-full w-full' id='fontQuery' placeholder="search fonts..."></input>
            </div>
          <div className='overflow-scroll flex-col flex border-b border-gray-400'>
          {
            fontsDirectory.filter((val)=>val.family.toLowerCase().includes(searchQuery.toLowerCase())).map((val,index)=>(
              <button className="p-2 border-b border-l border-r border-gray-400" onClick={()=>closeFontAndSet([val.family,val.category])}>
                <p className="text-left font-semibold">{val.family}</p>
                <p className="text-left ">{val.category}</p>
              </button>
            ))
          }
          
          </div>
          <div className="flex m-auto">Check these fonts out at&nbsp;<a href='https://fonts.google.com/' className=" pb-[0.5px] border-b-2 hover:text-blue-400 border-blue-400" target='_blank'>google fonts!</a></div>
        </div>
      </div>}
      {/* prefab pane!!!!! */}
      {prefabPane&&<div className="absolute w-full h-full flex items-center justify-center z-50 backdrop-blur-md bg-[rgba(0,0,0,0.5)]">
        <div className="max-w-xl p-6 w-full h-[200px] shadow-xl bg-gray-100 rounded-lg flex flex-col" tabIndex='0'>
          <div className="flex"><button className="material-icons pr-2" onClick={()=>setPP(false)}>arrow_back</button><p className="text-xl">Prefab Name...</p></div>
          <input id='prefabI' className="border-2 bg-transparent p-2" type='text'></input>
          <button className="bg-gray-300 w-fit mt-3 p-3 rounded-xl" onClick={()=>{toPrefab(sel,document.getElementById('prefabI').value);update(!_);setPP(false)}}>Proceed</button>
        </div>
        </div>}
      {/* new page pane!!!!! */}
        {pagePane&&<div className="absolute w-full h-full flex items-center justify-center z-50 backdrop-blur-md bg-[rgba(0,0,0,0.5)]">
        <div className="max-w-xl p-6 w-full h-[200px] shadow-xl bg-gray-100 rounded-lg flex flex-col" tabIndex='0'>
          <div className="flex"><button className="material-icons pr-2" onClick={()=>setNPP(false)}>arrow_back</button><p className="text-xl">File Name...</p></div>
          <input id='newpageI' className="border-2 bg-transparent p-2" placeholder="File.html..." type='text'></input>
          <button className="bg-gray-300 w-fit mt-3 p-3 rounded-xl" onClick={()=>{Item.newPage(document.getElementById('newpageI').value);update(!_);setNPP(false)}}>Proceed</button>
        </div>
        </div>}
      {/* content */}
      <div className='flex w-full h-full no-drag'>
        {/* side pane */}
        <div className="absolute z-[500] max-w-[300px] overflow-y-scroll h-full bg-gray-200">
          {/* tabs */}
          
          <div className='flex  border-gray-500 w-full h-[32px]'>
          <div className='pl-2'><div className={!prefabBar?"rounded-t-xl bg-gray-100 w-fit p-1 pl-3 pr-3 font-thin z-[2] duration-200":"duration-200 rounded-t-xl bg-gray-400 w-fit p-1 pl-3 pr-3 font-thin pt-0 pb-0 mt-2 origin-bottom"} onClick={()=>setPB(false)}>Divvy</div></div>
          <div className='pl-2'><div className={!prefabBar?"rounded-t-xl bg-gray-400 w-fit p-1 pl-3 pr-3 font-thin z-[1] pt-0 pb-0 mt-2 duration-200":"duration-200 rounded-t-xl bg-gray-100 w-fit p-1 pl-3 pr-3 font-thin origin-bottom"} onClick={()=>setPB(true)}>Boxxy</div></div>
          <div className='pl-2 flex-grow w-full'>&nbsp;</div>
          <div className="absolute bg-gray-200 w-full h-[32px] z-[-2] p-3  rounded-b-xl"></div>
          </div>

        {!prefabBar&&<div className=' bg-gray-100 flex-grow shadow-xl border-gray-500 flex flex-col'>
          
          
          <div>
            <div className='flex p-3'>
              page:&nbsp;
                <select className='w-full p-1 rounded-xl' value={Item.curPage} onChange={(e)=>{if(e.target.value=='add'){setNPP(true);return}Item.loadPage(e.target.value); update(!_)}}>
                  {Item.pageNames.map((val,index)=>(<option key={'files'+index} value={val}>{val}</option>))}
                  <option value={'add'}>+</option>
                </select>

              </div>            
          </div>

          {/* hierarchy */}
          <div className="border-b pb-1 border-gray-500 pl-1 flex font-thin shadow-lg">{}</div>
          <div className="w-full pt-2 border-gray-500">
            <div className="border-b pb-1 border-gray-500 pl-1 flex font-thin shadow-lg">Hierarchy</div>
            <div className="overflow-y-auto h-64 border border-gray-400 m-1 resize-y">
              {/* body element */}
              <div onClick={()=>setSel(Item.body)} style={sel==Item.body?{borderLeft:'4px solid rgb(44,181,255)',backgroundColor:'rgba(4,141,215,0.2)'}:{}} className="hover-visibility flex pr-2 mb-1 p-[.5px] w-full font-thin hover:bg-gray-300">
                <div className="text-overflow: ellipsis; overflow-hidden; font-thin whitespace-nowrap flex">
                  <div className="scale-75 ">{'<body>'}</div>
                  {'body'}</div>
                  <div className="hover-visibility-victim right-0 ms-auto scale-90">
                <div className="max-h-5 flex">

                <button className="opacity-[.3]" 
                    onClick={()=>{
                        let newr =Item.new()
                        setTimeout(()=>setSel(newr),0)
                        update(!_)
                    }}>
                    <span className="material-icons" >add</span>
                </button>
                </div>
            </div>
                </div>

              {
                  
              tree.current.map((val, index) => (
                <div key={'mainbranch'+index} className="pl-5">{!val.isChild
                  &&
                  <TreeComponent instance={val} path={val.name} onClick={setSel} update={[update, _]} current={sel} key={val.id} ></TreeComponent>}
                </div>
              ))
            }
              <div className="flex pr-2 mb-1 p-[.5px] w-full font-thin mt-auto">
                  <div className="text-overflow: ellipsis; overflow-hidden; font-thin whitespace-nowrap flex">
                    <div className="scale-75">{'</body>'}</div></div>
                    
              </div>
            </div>

          </div>
          <div className="border-b pb-1 border-gray-500 pl-1 flex font-thin shadow-lg">
            <button className="material-icons p-1 border border-gray-500 mr-1" onClick={()=>{if(sel){sel.shiftUp();update(!_)}}}>keyboard_arrow_up</button>
            <button className="material-icons p-1 border border-gray-500 mr-1" onClick={()=>{if(sel){sel.shiftDown();update(!_)}}}>keyboard_arrow_down</button>
            <input value={sel?sel.name:''} className='border p-1 border-gray-500 flex-grow mr-1' onChange={(e)=>{if(sel){sel.name=e.target.value;update(!_)}}} type="text"></input>
          </div>
          {/* <div className="flex w-full">
              <div className="pr-2">
                <button>
                  <span class="material-icons border-[.5px] bg-gray-100 border-gray-500 rounded-sm hover:scale-90 duration-200">add</span>
                </button>
              </div>
            </div> */}
            <div className=" border-gray-500 border-b border-b-black pb-1 pl-1 font-thin shadow-lg">
          <div className="flex items-center ">
            <div className="pl-1 pr-1 pt-2 pb-2 font-thin">{'<'}</div>
            {/* tag + id */}
            <div className="flex items-center relative">
              <div className="border-[1px] h-min border-gray-400 bg-transparent w-full flex  font-thin">
                <select className="basis-full text-transparent h-min bg-transparent border-gray-500" value={sel ? sel.type : ''} disabled={sel?sel.type=='body'?true:false:false} onChange={(e) => {
                  if (sel) {
                    sel.type = e.target.value
                    update(!_)
                  }
                }}>
                  {(!sel && !tree.current.length) && <option value='' >...</option>}
                  {(sel && sel.type=='body') && <option value='body' >body</option>}
                  <option value='p'>p</option>
                  <option value='a'>a</option>
                  <option value='h1'>h1</option>
                  <option value='h2'>h2</option>
                  <option value='h3'>h3</option>
                  <option value='h4'>h4</option>
                  <option value='div'>div</option>
                  <option value='img'>img</option>
                  <option value='input'>input</option>
                  <option value='button'>button</option>
                  <option value='section'>section</option>
                  {Object.keys(Item.prefabs).map((val,index)=>(
                  <option className='' value={val} key={index+'prefaboptions'}>{val}

                  </option>))}
                </select>

                <div className="absolute flex-grow pointer-events-none font-thin flex justify-center pl-1"><div className="mt-[-2px] font-thin">{sel ? sel.type : ''}</div></div>
              </div>


            </div>
            <div className="mt-1 p-1 items-center border-gray-400 flex pl-1">
              <p className="font-thin p-1">id</p>=&nbsp;"
              <input value={sel ? sel._id : ''} className="h-min border-[1px] border-gray-400 bg-transparent w-full pl-1 font-thin" onChange={(e) => { sel._id = e.target.value; update(!_) }} type="text" />
              "
            </div>
          </div>
          {/* class input */}
          <div className="flex items-center">
            <p className="font-thin p-1">class</p>=&nbsp;"
              <input value={sel ? sel.classes : ''} className=" border-gray-400 border-[1px] text-left bg-transparent w-full pl-1 pr-1 font-thin" onChange={(e) => {if(sel){sel.classes = e.target.value; update(!_)}}} type="text" />
                "<p className="p-1 font-thin">{sel? sel.type!='img'?'>':'':''}</p>
            </div>
            {/* any other attributes */}
           <div className="flex items-center pb-2 p-1 mt-2 pt-0">
            <input value={sel ? sel.extras : ''} placeholder={"attribute=\"...\""} className=" border-gray-400 border-[1px] text-left bg-transparent w-full pl-1 pr-1 font-thin" onChange={(e) => { sel.extras = e.target.value; update(!_) }} type="text" />
          </div>

          
         
          {/* image src */}
          {sel && sel.type=='img'&&
          <div className="flex items-center">
          <p className="font-thin p-1">src</p>=&nbsp;"
            <input value={sel ? sel.src : ''} className="ml-1 border-gray-500 border-[1px] text-left bg-transparent w-full pl-1 font-thin" onChange={(e) => { sel.src = e.target.value; update(!_) }} type="text" />
              "<p className="font-thin">{'/>'}</p>
          </div>
          }
          {/* input type */}
          {sel && sel.type=='input'&&
          <div className="flex items-center">
          <p className="font-thin p-1">type</p>=&nbsp;'
              <select className="w-full bg-transparent border-gray-500 border pl-1 pr-1 pt-1 m-1" onChange={(e)=>{if(sel){sel._type=e.target.value;update(!_)}}}>
              {["text","email","password","number","tel","url","search","checkbox","radio","date","time","datetime-local","file","range","submit","reset"].map((val,index)=>(
                <option value={val} key={'inputopts'+index}>
                  {val}
                </option>
              ))}
              </select>
              '<p className="font-thin">{'/>'}</p>
          </div>
          }

          {/* text-content */}
          {sel && sel.type!='img' && sel.type!='input' &&
          <>
          <div className="mt-1 mr-1 pb-0  bg-transparent border-[1px] border-gray-300 text-center pl-1">
            <textarea placeholder='text content...' value={sel ? sel.content : ''} className="text-left bg-transparent w-full pl-1 font-thin" onChange={(e) => { sel.content = e.target.value; update(!_) }} type="text" />
          </div>
          <p className="pl-1">{'{...}'}</p>
          <p className="font-thin">{'</'+sel.type+'>'}</p>
          </>
        }

        
      </div>
        <div>
          <div className="border-b pb-1 border-gray-500 pl-1 p-2 pt-3 pb-3 flex">
            Style <p className="pl-2 font-thin opacity-75 flex-grow">(Inline)</p>

            <span onClick={()=>{
              if(sel){
              sel.inline=!sel.inline
              update(!_)
              }
            }} className={sel?sel.inline?"switch switch-on shadow-sm":'switch shadow-sm':'switch shadow-sm'}>
            </span>

            </div>
            {/* typography */}
          <p className="font-thin hover:tracking-[5px] p-1 text-center duration-150">Typography</p>
          <hr className="border-gray-600"></hr>
          <div className="flex">
            <button className='material-icons p-1 border border-gray-500 m-1' onClick={()=>setFP(true)}>text_fields</button>
            <select className=" border-gray-500 border-[1px] bg-transparent w-full pl-1 font-thin m-1" onChange={(e)=>{
              if(sel){
                sel.font=e.target.value
                update(!_)
              }
            }} value={sel?sel.font:''}>
              {Object.keys(importedFonts.current).map((val,index)=>(
                <option value={val} key={'fontss'+index}>{val}</option>
              ))}
            </select>
          </div>
          <div className="flex shadow-md border-b border-gray-500 pb-1">
            <button className="material-icons p-1 border border-gray-500 scale-75" style={sel?sel.alignment==0?{transform:'scale(0.9)'}:{}:{}} onClick={()=>{if(sel){sel.alignment=0;update(!_)}}}>format_align_left</button>
            <button className="material-icons p-1 border border-gray-500 scale-75" style={sel?sel.alignment==1?{transform:'scale(0.9)'}:{}:{}} onClick={()=>{if(sel){sel.alignment=1;update(!_)}}}>format_align_center</button>
            <button className="material-icons p-1 border border-gray-500 scale-75" style={sel?sel.alignment==2?{transform:'scale(0.9)'}:{}:{}} onClick={()=>{if(sel){sel.alignment=2;update(!_)}}}>format_align_right</button>
            <div className="flex p-1 border border-gray-500">
              <span className="material-icons">line_weight</span>
              <input onChange={(e)=>{if(sel){sel.weight=e.target.value;update(!_)}}} value={sel?sel.weight:''} className="w-full bg-transparent" placeholder="100-900" type='text'></input>
            </div>
          </div>
        </div>
        <div>
          <div className="font-thin duration-150 flex relative text-center w-full p-1 pb-4 border-b border-gray-500">
            <p className="inline origin-left text-gray-400 vfx w-full font-thin h-fit">Visual + Effects</p>
          </div>
          <div>
            <div className="p-1 border-b border-gray-500">
              <p className="p-1 text-center font-thin shadaw">Drop Shadow</p>
              <div>
              <div className='w-full font-thin p-1 pl-2'>filter:drop-shadow(</div>
              <div className="flex pl-1 pr-1 pt-1">
              <input type='number' value={sel?sel.shadow[0]:0} onChange={(e)=>{if(sel){sel.shadow[0]=e.target.value;update(!_)}}} step={1} className="w-full border bg-transparent border-gray-400 text-right ml-1"></input>px
              <input type='number' value={sel?sel.shadow[1]:0} onChange={(e)=>{if(sel){sel.shadow[1]=e.target.value;update(!_)}}} className='w-full border bg-transparent border-gray-400 text-right ml-1'></input>px
              <input type='number' value={sel?sel.shadow[2]:0} onChange={(e)=>{if(sel){sel.shadow[2]=e.target.value;update(!_)}}} className='w-full border bg-transparent border-gray-400 text-right ml-1'></input>px
              <input type='color' value={sel?sel.shadow[3]:'#e66465'} onChange={(e)=>{if(sel){sel.shadow[3]=e.target.value;}}} onBlur={()=>update(!_)} className="w-full ml-1"></input><p className="font-thin">);</p></div>
              <div><p className="scale-95 font-thin text-center pb-2">(offset-x) &nbsp;(offset-y) &nbsp;(radius) &nbsp;(color)</p></div>
              
              
              
              </div>
            </div>
            <div className=" border-b border-gray-500 mb-2">
              <p className="p-1 text-center font-semibold duration-300 mb-2 text-white w-full bg-blue-300 hover:bg-neutral-400 fluid">Grayscale</p>
              <div className="flex p-1">
              <div className='font-thin p-1'>filter:grayscale(</div>
              <input type='number' max='1' min='0' step='0.05' value={sel?sel.gray:0} onChange={(e)=>{if(sel){sel.gray=e.target.value;}}} onMouseUp={(e)=>{update(!_)}} className="w-full border bg-transparent border-gray-500 p-0 pl-1 pr-1"></input><p className="font-thin">);</p>
              </div>
              <p className="scale-95 font-thin text-center pb-2">(amount)</p>
            </div>
            <div className='w-full flex pb-4'>
              <textarea className='flex-grow p-1 m-1' onChange={(e)=>{if(sel){sel.css=e.target.value;update(!_)}}} value={sel?sel.css:''} placeholder="additional inline css..."></textarea>
            </div>
          </div>
          <div className="p-1">
          <button className=" border-2 border-gray-400 w-full mb-2 p-2" onClick={()=>{setPP(true)}}>
                To Prefab
          </button></div>
          <div className="mt-3">&nbsp;</div>
        </div>

        </div>}

        {prefabBar&&<div className='bg-gray-100 shadow-xl flex-grow w-[300px] h-full border-gray-500 flex flex-col gap-2 p-2'>
         <div className="w-full h-full">
          <div className="flex p-1 items-center border font-thin border-black w-full" onClick={()=>{panes['lo-fi']?setPanes({...panes, 'lo-fi':undefined}):setPanes({...panes, 'lo-fi':true})}}><p className="material-icons" >{panes['lo-fi']?'keyboard_arrow_down':'keyboard_arrow_right'}</p>Lo-fi-components</div>
         <div className='border-black border border-t-0 overflow-y-scroll max-h-50 p-2'>
          <div className="origin-top-left h-fit overflow-hidden">
          {panes['lo-fi']? Object.keys(components.lofi.Text).map((key,index)=>(

          <button className="p-1 zoom w-[550px] relative rounded-md duration-200 hover:brightness-[1.05]"  key={'component_'+key} onClick={()=>{
            Item.prefabs[key]=components.lofi.Text[key]
            let it = sel==Item.body? Item.new():sel.newChild()
            it.name=key
            it.type=key
            it.prefab=components.lofi.Text[key]
            it.isPrefab=true
            update(!_)
          }}>
            <div class=' overflow-hidden' dangerouslySetInnerHTML={{__html:components.lofi.Text[key]}}></div>
            {/* {key} */}
          </button>
        )):<div>{'{...}'}</div>}</div></div>
          </div>
          <div className="flex items-center border-2 font-thin border-black"><p className="material-icons">keyboard_arrow_right</p>Hi-fi-components</div>
         
       
          </div>}


        </div>
        {/* actual board */}
        
        <div className='flex-grow bg-neutral-800'>
          <ViewportContainer >
            <div className="relative w-min flex flex-col drag-target bg-neutral-700 p-[17px] pt-[40px] rounded-lg" ref={initialFrame=>frames.current[0] = initialFrame}>
              <div>
                <div className='absolute mt-[30px] right-[-5px] p-3 pb-10 bg-neutral-800 shadow-lg z-[-200]'></div>
                <div className='absolute mt-[90px] right-[-5px] p-3 pb-10 bg-neutral-800 shadow-lg z-[-200]'></div>
                <div className='absolute mt-[90px] left-[-5px] p-3 pb-10 bg-neutral-800 shadow-lg z-[-200]'></div>
              </div>
              <div className="w-full mt-[-20px] min-w-[20px] h-[20px] max-h-[20px] overflow-hidden invert drag-handle " >
                  <p className="text-center pointer-events-none grippy h-[20px]"></p>
              </div>
              <iframe className="rounded-xl mt-2 min-w-[160px] min-h-[260px] flex-grow bg-white p-0 drag-disable" ref={prevElement} onMouseUp={()=>update(!_)} onMouseMove={() => update(!_)}></iframe>
              
              <p className="pointer-events-none opacity-50 text-white scale-75 origin-top-left min-w-[110px]">{prevElement.current ? Math.floor(prevElement.current.offsetWidth) : '??'}px x {prevElement.current ? Math.floor(prevElement.current.offsetHeight) : '??'}px</p>
      
          </div>
          {displays.map((val,index)=>(
            <div ref={el => frames.current[index+1] = el} style={{left:`${400*index}px`}} className="absolute w-min flex flex-col drag-target">
              <div className="absolute w-full mt-[-20px] min-w-[20px] h-[20px] max-h-[20px] overflow-hidden  invert drag-handle " >
                  <p className="text-center  grippy h-[20px]"></p>
                </div>
               
              <iframe className="min-w-[160px] min-h-[260px] theframe flex-grow shadow-lg bg-white drag-disable"  onMouseMove={() => update(!_)}></iframe>
              
              <p className="pointer-events-none opacity-50 text-white scale-75 origin-top-left min-w-[110px]">{frames.current && frames.current[index+1]? Math.floor(frames.current[index+1].querySelector('iframe').offsetWidth) : '??'}px x {frames.current && frames.current[index+1]? Math.floor((frames.current[index+1].querySelector('iframe').offsetHeight)) : '??'}px</p>
      
          </div>
          ))}
      </ViewportContainer>
        </div>
      </div>
    </div>
  )
}

export default App
