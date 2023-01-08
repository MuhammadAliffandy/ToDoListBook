// ======== data =========

const insBuku = document.getElementById('insert');
const cariBook = document.getElementById('searchBook')
const dataBukuKey = 'DATA_KEY';
const storageBuku = [];

// ======== function =========

insBuku.addEventListener("click", () => {

    
    const judul = document.getElementById("Judul").value;
    const author = document.getElementById("Author").value;
    const year = document.getElementById("Year").value;
    const check = document.getElementById("selesai").checked;

    if(judul != '' && author != '' && year != ''){

        const dataBuku = {
            'id': Math.floor(Math.random() * 10000),
            'title': judul,
            'author': author,
            'year': year,
            'isComplete': check  
        };
    
    
        storageBuku.push(dataBuku);
    
        const strDataBuku = JSON.stringify(storageBuku);
        localStorage.setItem(dataBukuKey, strDataBuku)
        document.location.reload();

    }
    
});



window.addEventListener('load', () => {
    let ParseData = JSON.parse(localStorage.getItem(dataBukuKey));
    
    if (localStorage.getItem(dataBukuKey) != null) {
        
        for (let i = 0; i < ParseData.length; i++) {
            storageBuku.unshift(ParseData[i]);
        }
    }
})


window.addEventListener( 'load', () => {
    
    let notDone = document.getElementById('listBelum');
    let Done = document.getElementById('listSelesai');
    
    for( let i = 0 ; i < storageBuku.length ; i++ ){
        
        
        const bookData = document.createElement('div')
        bookData.classList.add('bookData')
        
        const textBook = document.createElement('div')
        textBook.classList.add('textBook')
        
        const title = document.createElement('h3');
        title.innerText = storageBuku[i].title;
        
        const author = document.createElement('p');
        author.innerText = storageBuku[i].author + ', ' + storageBuku[i].year ;
        
        const iconBook = document.createElement('div');
        iconBook.classList.add('iconBook');
        
        const iDel = document.createElement('button')
        iDel.classList.add('trash-button')
        
        
        const iDone = document.createElement('button')
        const iNotDone = document.createElement('button')
        iDone.classList.add('selesai-button')
        iNotDone.classList.add('selesai2-button')
        
        textBook.append(title,author);
        
        bookData.append(textBook,iconBook);
        
        if(storageBuku[i].isComplete == false){
            iconBook.append(iDone,iDel);
            notDone.append(bookData);
        }else{
            iconBook.append(iNotDone,iDel);
            Done.append(bookData);
            
        }
        
        iDel.addEventListener("click", ()=> {
            storageBuku.splice(i,1);
            const strDataBuku = JSON.stringify(storageBuku);
            localStorage.setItem(dataBukuKey, strDataBuku)
            
            document.location.reload()
            
        });
        
        iDone.addEventListener("click", ()=> {
            storageBuku[i].isComplete = true;
            const strDataBuku = JSON.stringify(storageBuku);
            localStorage.setItem(dataBukuKey, strDataBuku)
            
            document.location.reload()
            
        });
        
        iNotDone.addEventListener("click", ()=> {
            storageBuku[i].isComplete = false;
            const strDataBuku = JSON.stringify(storageBuku);
            localStorage.setItem(dataBukuKey, strDataBuku)
            
            document.location.reload()
            
        });
        
        cariBook.addEventListener('keyup',() => {
            
            const filter = cariBook.value.toLowerCase();
            
            const dataDone = Done.getElementsByClassName('bookData')
            const dataNotDone = notDone.getElementsByClassName('bookData')
            
            
            
            for(let i = 0 ; i < dataDone.length ; i++){
                
                const a = dataDone[i].querySelectorAll('div h3')[0]
                
                if( a.innerText.toLowerCase().indexOf(filter) > -1){
                    
                    dataDone[i].style.display= 'flex' ;
                }
                else{
                    dataDone[i].style.display = 'none' ;
                }
            }
            
            for(let i = 0 ; i < dataNotDone.length ; i++){
                
                const a = dataNotDone[i].querySelectorAll('div h3')[0]
                
                if( a.innerText.toLowerCase().indexOf(filter) > -1){
                    
                    dataNotDone[i].style.display= 'flex' ;
                }
                else{
                    dataNotDone[i].style.display = 'none' ;
                }
            }
        }
        );
    }   
    
    
})







