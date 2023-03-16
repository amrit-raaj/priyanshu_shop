console.clear()
console.log(document.cookie)
let pri=0;let s=0;
let row = document.getElementById("row");
let t = document.getElementById("last");
document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
if (document.cookie.indexOf(',counter=') > 0) {
    let counter = document.cookie.split(',')[1].split('=')[1]
    console.log(counter)
    document.getElementById("counter").innerHTML = counter
  }

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter,subtotal, pri) {
    let boxDiv = document.createElement('tr')
    boxDiv.id = ob.id;
    row.appendChild(boxDiv)

    let boxDiv1 = document.createElement('td')
    let boxImg = document.createElement('img')
    boxImg.src = ob.photos
    boxDiv1.appendChild(boxImg)

    let boxDiv2 = document.createElement('td')
    let h3Text = document.createTextNode(ob.name + ' x ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxDiv2.appendChild(h3Text)

    let boxDiv3 = document.createElement('td')
    let h4Text = document.createTextNode('Rs' + ob.price)
    boxDiv3.appendChild(h4Text)

    let boxDiv5 = document.createElement('td')
    boxDiv5.className=ob.id
    let h4Text1 = document.createTextNode(subtotal)
    boxDiv5.appendChild(h4Text1)

    let boxDiv6 = document.createElement('td')
    let atag = document.createElement("a");
    let itag = document.createElement("i");
    itag.className = "far fa-times-circle";
    itag.style = "cursor:pointer"
    atag.appendChild(itag);
    boxDiv6.appendChild(atag);
    let k = 0;
    itag.addEventListener("click",myfunction) 
        
    function myfunction()
    {
        var q = document.cookie.split(',')[0].split('=')[1].split(" ");
        k = ob.id;
        let row = document.getElementById(ob.id)
        let col=row.getElementsByTagName("td")[3]
        row.remove();
        let order;
        let counter = 1;
        if(document.cookie.indexOf(',counter=')>=0)
        {
            order = document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1])-itemCounter
        }
        q=q.filter(i=>i!=k)
        console.log(q)
        var i=0;var p=" ";
        while(i<q.length)
        {
            p+=q[i]+" "
            i++
        }document.cookie = "orderId=" + p + ",counter=" + counter
        document.getElementById("counter").innerHTML = counter
        console.log(document.cookie)
        if (pri) {
            s+=Number(col.textContent);
            pri -= s;
            amountUpdate(pri)

        }
        
    }
    
    amountUpdate(pri)

    boxDiv.appendChild(boxDiv1)
    boxDiv.appendChild(boxDiv2)
    boxDiv.appendChild(boxDiv3)
    boxDiv.appendChild(boxDiv5)
    boxDiv.appendChild(boxDiv6)
    // console.log(boxContainerDiv);

    // buttonLink.appendChild(buttonText)
    row.appendChild(boxDiv);
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)
}
let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('td')
totalh2.colSpan = 3;
let h2Text = document.createTextNode('Total Amount')
totalh2.style="font-weight:bold;font-size:20px;"
totalh2.appendChild(h2Text)
t.appendChild(totalh2)
let totalh4 = document.createElement('td')
totalh4.style="font-weight:bold;font-size:20px;"
totalh4.id = 'toth4';
let flag = 0; let totalh4Text = 0;
// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
    if (amount == 0) {
        t.remove();
    }
    if (flag == 0) {
        totalh4Text = document.createTextNode('Rs ' + amount)
        totalh4.appendChild(totalh4Text)
        t.appendChild(totalh4)
        t.appendChild(buttonDiv)
        flag=1;
    }
    else {

        let pls = document.getElementById("toth4")
        pls.textContent = "";
        totalh4Text = document.createTextNode('Rs ' + amount)
        pls.appendChild(totalh4Text)
        t.appendChild(totalh4)
        t.appendChild(buttonDiv)
    }

}


let buttonDiv = document.createElement('div')
buttonDiv.className = "placeorder"
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonTag.className = "btn_2"
let buttonTag1 = document.createTextNode("PLACE ORDER")
buttonTag.appendChild(buttonTag1)
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = "/E-commerce/order.html"
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function () {
    window.location.href="/E-commerce/order.html"
}

let httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status == 200) {
            // console.log('call successful');
            contentTitle = JSON.parse(this.responseText)
             

            // document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)
            var item = document.cookie.split(',')[0].split('=')[1].split(" ");
            const counts = {};

            for (const num of item) {
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            console.log(counts);
            for (const key in counts) {
                if (key == 0) continue;
                // console.log(key);
                // }console.log(itemCounter)
                // console.log((contentTitle[item[i]-1]))

                pri += Number(contentTitle[key-1].price) * counts[key]
            }    
            let subtotal = 0;
            for (const key in counts) {
                if (key == 0) continue;
                // console.log(key);
                // }console.log(itemCounter)
                // console.log((contentTitle[item[i]-1]))
                subtotal = Number(contentTitle[key-1].price) * counts[key]
                dynamicCartSection(contentTitle[key-1], counts[key],subtotal, pri)
                // console.log(i);
                
            } 
            //amountUpdate(pri)
        }

    }
}
httpRequest.open('GET', 'https://6400b4939f84491029970b0f.mockapi.io/product', true)
httpRequest.send()
