
console.clear();
let id = location.search.split('?')[1]
console.log(id)
if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("counter").innerHTML = counter
}
function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div')
    mainContainer.className = 'image_f'
    document.getElementById('single-image').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.className = 'small_images'

    let imgTag = document.createElement('img')
    imgTag.id = 'main_image'
    imgTag.src = ob.photos

    mainContainer.appendChild(imgTag)


    let p1 = document.createElement('div');
    p1.className = "single-image-details  section-p1";


    let h1 = document.createElement('h6')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let h3DetailsDiv = document.createElement('h2')
    let h3DetailsText = document.createTextNode('Rs ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let detailsDiv = document.createElement('select')

    const size = {
        "SMALL": "",
        "MEDIUM": "",
        "LARGE": "",
        "XL": "",
        "XLL": ""
    }
    for (let key in size) {
        let option = document.createElement("option");
        option.setAttribute('value', size[key]);

        let optionText = document.createTextNode(key);
        option.appendChild(optionText);

        detailsDiv.appendChild(option);
    }


    let button = document.createElement("button")
    button.className = "btn_2  count"
    b = document.createTextNode("Add To Cart")
    button.appendChild(b)

    let h5 = document.createElement('h4')
    let h5Text = document.createTextNode("Product Details")
    h5.appendChild(h5Text)
    console.log(h4);

    let para = document.createElement('span')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)
    button.onclick = function () {
        let order = id+" "
        let counter = 1
        if(document.cookie.indexOf(',counter=')>=0)
        {
            order = id + " " + document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("counter").innerHTML = counter
        console.log(document.cookie);

    }

    let i;
    for (i = 0; i < ob.preview.length; i++) {
        let productDetailsDi = document.createElement('div')
        productDetailsDi.className = 'small_images_col'
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.className="small_image"
        imgTagProductPreviewDiv.src = ob.preview[i]
        imgTagProductPreviewDiv.onclick = function (event) {
            console.log("clicked" + this.src)
            imgTag.src = ob.preview[i]
            document.getElementById("main_image").src = this.src

        }
        productDetailsDi.appendChild(imgTagProductPreviewDiv)
        imageSectionDiv.appendChild(productDetailsDi)

    }
    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    document.getElementById('single-image').appendChild(p1)
    p1.appendChild(h1)
    p1.appendChild(h4)
    p1.appendChild(h3DetailsDiv)
    p1.appendChild(detailsDiv)
    p1.appendChild(button)
    p1.appendChild(h5)
    p1.appendChild(para)
    document.getElementById('single-image').appendChild(p1);
}








let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', 'https:6400b4939f84491029970b0f.mockapi.io/product/' + id, true)
httpRequest.send()  