let useAPI = document.getElementsByClassName("useAPIproduct");
//fetch cái sản phẩm:
fetch("./product.json")
    .then((response) => response.json())
    .then((data) => {
        for (i = 0; i < data.length; i++) {
            //lấy ra từng phần tử trong file product.json
            for (j = 0; j < useAPI.length; j++) {
                //Lập ra tương ứng các phần tử có trong file json
                useAPI[j].innerHTML += `
                <div class="col-md-6">
            <div class="image_2"><img src="${data[i].image}"></div>
            <div class="price_text">Price $ <span style="color: #3a3a38;">${data[i].price}</span></div>
            <h1 class="game_text">${data[i].title}</h1>
            <p class="long_text">${data[i].disc}</p>
          </div>
            `;
            }
        }
    });
