import { useState, useRef,useEffect} from "react"
import 'material-icons/iconfont/material-icons.css';

function TreeComponent(props) {
  const [instance,setInstance] = useState(props.instance)
  const [isShown,setIS] = useState(true)
  return (
      <div className=' border-gray-300 w-full' key={props.depth+'manager'}>
        {instance &&<><div onClick={()=>props.onClick(instance)} onDoubleClick={()=>setIS(!isShown)} style={props.current==instance?{borderLeft:'4px solid rgb(44,181,255)',backgroundColor:'rgba(4,141,215,0.2)'}:{}} className="hover-visibility flex pl-0 pr-2 mb-1 p-[.5px] w-full font-thin hover:bg-gray-300">
            <div className="text-overflow: ellipsis; overflow-hidden; font-thin whitespace-nowrap flex"><div className="scale-75">{'<'}{props.instance.type}{'/>'}</div>{instance.name}</div>
            <div className="hover-visibility-victim right-0 ms-auto scale-90">
                <div className="max-h-5 flex">

                <button className="opacity-[.3]" 
                    onClick={()=>{
                        setIS(true)
                        let newr = instance.newChild()
                        props.update[0](!props.update[1])
                        setTimeout(()=>props.onClick(newr),0)
                    }}>
                    <span className="material-icons" >add</span>
                </button>

                <button className="opacity-[.3]" 
                    onClick={()=>{
                        if(props.current==instance)
                        props.onClick(undefined)
                        instance.clip()
                        console.log(instance)
                        setInstance(undefined)
                        props.update[0](!props.update[1])
                    }}>
                    <span className="material-icons" >delete</span>
                </button>
                </div>
            </div>
        </div>
        <div className="pl-5">
        {
        instance.children&&isShown&&instance.children.map((val,index)=>(
        <TreeComponent instance={val} key={val.id} path={props.path+'/'+val.name} update={props.update} current={props.current} onClick={props.onClick}></TreeComponent>
        ))
        }
        </div>
        {/* <div className="pl-2 scale-75 origin-left">{'<'}{props.instance.type}{'/>'}</div> */}
        </>}
        
      </div>

  )
}

export default TreeComponent
