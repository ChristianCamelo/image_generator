export function getNonce() {
    const range = 99999999999999999 - 1 + 1;
    const value = Math.floor(Math.random() * range) + 1;
    return value.toString();
  }
  
export function getSession(){
  return (new Date()).getTime()
}  
