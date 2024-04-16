export default function GetImageJSON(num) {
    let ImageJSON;
    const garage_id = {garage_sale_id: num};
    fetch('http://127.0.0.1:5000/garagesales/ImageViewer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(garage_id)
    })
    .then(response => {
        console.log("Response Status:", response.status);

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Server returned status ${response.status}`);
        }
    })
    .then(data => {
        if (data.success) {
            ImageJSON = data.images;
            sessionStorage.setItem("currentImages", ImageJSON);
        } else {
            console.error(data.msg);
            return "no"
        }
    })
    .catch(error => {
        console.error(error);
    });
}
