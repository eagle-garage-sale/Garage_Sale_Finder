
export default function buildListingObject() {
    const data = sessionStorage.getItem("usersales");
    const obj = JSON.parse(data)
    return obj;
  }
  
  
  