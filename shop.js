console.log(document.cookie);
console.clear();
if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("counter").innerHTML = counter
}

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.className = "product1";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "/E-commerce/product.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.photos;

  let detailsDiv = document.createElement("div");
  detailsDiv.className = "pro";





  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("span");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let rating = document.createElement("div");
  rating.className = 'rating';
  let rate;
  let i;
  for(i = 0; i < 5; i++){
    rate = document.createElement("i");
    rate.className = 'fa fa-star';
    rating.appendChild(rate);
  }
  let h2 = document.createElement("h3");
  let h2Text = document.createTextNode("Rs  " + ob.price);
  h2.appendChild(h2Text);

  let para = document.createElement("p");
  para.className = "yo";
  let p = document.createTextNode("Rs  " + ob.actualprice);

  para.appendChild(p);

  let para2 = document.createElement("p");
  let p2 = document.createTextNode("50% OFF");
  para2.appendChild(p2);

  let icon = document.createElement("i");
  icon.id = "count";
  icon.className = "fa-solid fa-cart-shopping";

  icon.onclick=function(){
    let order = ob.id+" ";
        let counter = 0
        if(document.cookie.indexOf(',counter=')>=0)
        {
          order = ob.id + " " + document.cookie.split(',')[0].split('=')[1]
          if(document.cookie.split(',')[1].split('=')[1]== 0)
          {
            counter = counter + 1
          }
          else
          {
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
          }
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("counter").innerHTML = counter
        console.log(document.cookie)
  }

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(rating);
  detailsDiv.appendChild(h2);
  detailsDiv.appendChild(para);
  detailsDiv.appendChild(para2);
  detailsDiv.appendChild(icon);


  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("feature");
let product1 = document.getElementById("pro-container");

// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING

let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status == 200) {
      // console.log('call successful');
      contentTitle = JSON.parse(this.responseText);
      for (let i = 0; i < contentTitle.length; i++) {
        console.log(contentTitle[i]);
        product1.appendChild(dynamicClothingSection(contentTitle[i]));
      }
    } else {
      console.log("call failed!");
    }
  }
};

httpRequest.open('GET', 'https://6400b4939f84491029970b0f.mockapi.io/product', true)
httpRequest.send()