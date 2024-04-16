export default function buildImageArray() {
    let data = sessionStorage.getItem("currentImages");
    console.log(data);
    const obj = JSON.parse(data)
    let collection = [];
    for (const jsonStr of obj) {

        const entry = {
            image: jsonStr
        }
        collection.push(entry);
    }

    return collection;
}