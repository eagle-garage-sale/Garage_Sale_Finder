
export default function GetListingJSON() {

  let ListingJSON;
    fetch('http://127.0.0.1:5000/api/home/sales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    .then(response => response.json())
    .then(data => {
      if (data.success) {

        ListingJSON = data.sales
        sessionStorage.setItem("sales", ListingJSON);
      } else {
        console.error(data.msg);
        return "no"
      }
    })
    .catch(error => {
      console.error(error);
    });



};

