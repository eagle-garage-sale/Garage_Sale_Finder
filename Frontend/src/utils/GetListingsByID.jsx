
export default function GetListingsByIdJSON() {
    let ListingJSON;

    const token = { token: document.cookie}
      fetch('http://127.0.0.1:5000/api/home/usersales', { //sales
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(token)
      })

      .then(response => {
        console.log("Response Status:", response.status);
    
        // Check if the response status is OK (200)
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Server returned status ${response.status}`);
        }
    })

      .then(data => {
        if (data.success) {
          //console.log('Loading successful');
          //window.location.reload();
          /*ListingJSON = data.sales
          sessionStorage.setItem("usersales", ListingJSON);
          console.log(token);
          */
         ListingJSON = data.sales;
         sessionStorage.setItem("usersales", ListingJSON);
         console.log(token);

        } else {
          console.error(data.msg);
          return "no"
        }
      })
      .catch(error => {
        console.error(error);
      });
     return(sessionStorage.getItem("usersales", ListingJSON));
  };
  
  