let id:number = parseInt(window.localStorage.getItem('maxId')||'0');

function createId(){
    id++;
    window.localStorage.setItem('maxId',JSON.stringify(id));
    return id;
}
export {createId}