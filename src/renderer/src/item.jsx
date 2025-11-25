class Item{
    static pages = [[],[]]
    static pageNames =['index.html','404.html']
    static curPage = 'index.html'
    static itemRefs = Item.pages[Item.pageNames.indexOf(Item.curPage)]
    static prefabs = {}
    
    static body = {
        name:'body',
        type:'body',
        _id:'main',
        classes:'flex flex-col gap-1',
        childrenn:Item.itemRefs,
        font:'arial',
        weight:'400',
        content:'',
        alignment:0,
        extras:'',
        inline:true,
        gray:0,
        css:'',
        shadow:[0,0,0,'ffff00'],
        parent:undefined,
        src:'',
        shiftUp(){},
        shiftDown(){}
        }
    constructor(name,type,children=[],parent=undefined){
        this.name=name
        this.type=type
        this.content=''
        this.order=0
        this.classes=''
        this.extras=''
        this.children=[]
        this.font='arial'
        this.weight='400'
        this.alignment=0
        this.isPrefab=false
        this.prefab=''
        this.gray=0
        this.css=''
        this.shadow=[0,0,0,'#ffff00']
        this.inline=false
        this.parent=parent
        this.pushChildren(children)
        parent?parent.pushChildren([this]):''
        this.id = `${Item.itemRefs.length}-${Math.random().toString(36).slice(2)}`
        this._id = ``
        this.src='https://placehold.co/600x400'
        this._type='text'
        Item.itemRefs.push(this)
        this.isChild=!!parent
    }
    shiftUp(){
            let tosort = this.isChild?this.parent.children:Item.itemRefs
            let time = tosort.indexOf(this)-1
            tosort.forEach((val,i)=>{
                if(i==time){
                    val.order=i+1
                }else if(i==time+1){
                    val.order=time
                }else{
                    val.order=i
                }
            })
            tosort.sort((a,b)=>a.order-b.order)
    }

    shiftDown(){
            let tosort = this.isChild?this.parent.children:Item.itemRefs
            let time = tosort.indexOf(this)+1
            tosort.forEach((val,i)=>{
                if(i==time){
                    val.order=i-1
                }else if(i==time-1){
                    val.order=time
                }else{
                    val.order=i
                }
            })
            tosort.sort((a,b)=>a.order-b.order)
    }
    pushChildren(items){
        if(this.type=='img')return
        for(let i of items){
        this.children.push(i)
        i.parent=this
        i.isChild = true
        }
    }
    isChildOf(testParent){
        return testParent.children.includes(this)
    }
    purgeChildren() {
        // Copy the array before modifying it
        const all = [...this.children];
        this.children.length = 0;
        for (let c of all) c.clip();
    }

    clip() {
        // Step 1: recursively delete children first
        for (let c of [...this.children]) c.clip();
        this.children.length = 0;

        // Step 2: remove self from parent's child list if applicable
        if (this.parent) {
            this.parent.children = this.parent.children.filter(ch => ch !== this);
        }

        // Step 3: remove self from global itemRefs
        Item.pages[Item.pageNames.indexOf(Item.curPage)] = Item.pages[Item.pageNames.indexOf(Item.curPage)].filter(ref => ref !== this);
        Item.itemRefs = Item.pages[Item.pageNames.indexOf(Item.curPage)]
    }
    newChild(){
         return new Item('Item '+this.children.length,this.children.length>0?this.children[this.children.length-1].type:'div',[],this)
    }
    static new(){
         return new Item('Item '+Item.itemRefs.length,'div',[])

    }
    static loadPage(page){
        Item.curPage = Item.pageNames.indexOf(page)!=-1? page: '404.html'
        Item.itemRefs = []
        Item.itemRefs = Item.pages[Item.pageNames.indexOf(Item.curPage)]
    }
    static newPage(name){
        if(name.length==0)return
        if(Item.pageNames.includes(name))return
        if(!name.includes('.html'))name=name+'.html'
        Item.pages.push([])
        Item.pageNames.push(name)
        Item.curPage=name
        Item.itemRefs = Item.pages[Item.pageNames.indexOf(Item.curPage)]
    }
    static registerPrefab(content,name){
        Item.prefabs[name] = content
    }
}
export default Item