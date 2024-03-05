export default function buildListing() {
    let data = sessionStorage.getItem("usersales");
    const obj = JSON.parse(data)
    return obj;
}