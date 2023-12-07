
export default function buildObjectArray() {
    let data = sessionStorage.getItem("sales");
    const obj = JSON.parse(data)
    let collection = [];
    for (const jsonStr of obj) {
      collection.push(JSON.parse(jsonStr));
    }
  
    return collection;
  }
  
  
  
  