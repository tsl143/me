/* https://medium.com/humans-create-software/semicolons-cannot-save-you-bf991756174e */
const createLi = (type, parent, key, data) => {
    let li = document.createElement('li')
    switch (type) {
        case 'string':
            if(key !== '') {
                let span1 =  document.createElement('span')
                span1.className = 'objectKey'
                span1.textContent = `"${key}": `
                li.appendChild(span1)
            }
            let span2 =  document.createElement('span')
            span2.textContent = `"${data}",`
            li.appendChild(span2)
            break;
        case 'objectOpen':
            li.className = 'objectKey'
            li.textContent = `${key!=='' ? '"' + key +'": ' : ''} {`
            break;
        case 'objectClose':
            li.textContent = `},`
            li.className = 'objectKey'
            break;
        case 'arrayOpen':
            li.className = 'arrayKey'
            li.textContent = `${key!=='' ? '"' + key + '": ' : ''} [`
            break;
        case 'arrayClose':
            li.textContent = `],`
            li.className = 'arrayKey'
            break;
            
        default:
            break;
    }
    parent.appendChild(li)
}

const treatMe = (data, parent, key) => {
    key = key || ''

    if( typeof data === 'string'){
        createLi('string', parent, key, data)
    }

    if( typeof data === 'object' && !data.length){
        const ul = document.createElement('ul')
        createLi('objectOpen', parent, key)
        parent.appendChild(ul)
        for(let x in data){
            treatMe(data[x], ul, x)
        }
        createLi('objectClose', parent)
    }

    if( typeof data === 'object' && data.length){
        const ul = document.createElement('ul')
        createLi('arrayOpen', parent, key)
        parent.appendChild(ul)
        data.forEach( y => treatMe(y, ul) )
        createLi('arrayClose', parent)
    }
    
}

const body = document.body
const parentUL = document.createElement('ul')

const handleLastComma = () => {
    const allLis = document.querySelectorAll('li')
    for (let i=allLis.length-1; i>allLis.length-3; i--){
        allLis[i].textContent = allLis[i].textContent.slice(0, -1)
    }

}

const drawMe = me =>{
    createLi('objectOpen', body, '')
    document.body.appendChild(parentUL)
    for(let key in me){
        treatMe(me[key], parentUL, key)
    }
    createLi('objectClose', body, '')
    handleLastComma()
}

fetch('me.json').then(
    response => response.json()
).then(drawMe);
