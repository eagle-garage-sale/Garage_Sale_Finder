
export default function GetListingByIdJSON() {
    let ListingJSON;

    const token = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImV0aGFucndpbGxpbmdlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImFzZGYifQ.z7WC62VDa8jbNLEqiUg7oAlRVWjMDDQyPvksxmgIgXs"}
      fetch('http://127.0.0.1:5000/api/home/usersales', {
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

      .then(response => response.json())
      .then(data => {
        if (data.success) {
          //console.log('Loading successful');
          //window.location.reload();
          ListingJSON = data.sales
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
  };
  
  