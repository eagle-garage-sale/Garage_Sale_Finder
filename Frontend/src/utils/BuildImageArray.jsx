export default function buildImageArray() {
    let data = sessionStorage.getItem("currentImages");
    console.log(data);
    const obj = JSON.parse(data)
    let collection = [];
    for (const jsonStr of obj) {
        collection.push(jsonStr);
    }

    return collection;
}