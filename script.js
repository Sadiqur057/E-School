const CartsState = {};

const courses = document.querySelectorAll(".course");
cartsContainer = document.querySelector('#carts');

courses.forEach((singleCourse, idx) => {
  const courseName = singleCourse.childNodes[3].innerText;
  const coursePrice = singleCourse.childNodes[5].childNodes[0].innerText;
  const courseImg = singleCourse.childNodes[1].src;
  const seatCounts =
    singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0]
      .innerText;
    console.log(singleCourse.childNodes[7])
  const addToCartBtn = singleCourse.childNodes[7];


  addToCartBtn.addEventListener("click", () => {
    // console.log(`Clicked ${idx} || Course Price ${coursePrice} || Course Name: ${courseName}`)

    if (courseName in CartsState) {
      console.log("found");
    } else {
      CartsState[courseName] = {};
      CartsState[courseName]["img"] = courseImg;
      CartsState[courseName]["price"] = coursePrice;
      CartsState[courseName]["seats"] = seatCounts;
      singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0]
      .innerText = seatCounts-1;
    }
    console.log(CartsState);
    renderStateOnPage(CartsState);
  })
})

function renderStateOnPage(CartsState){
  let cartItemsHTML = "";
  for(const courseName in CartsState){
      const img_url = CartsState[courseName].img;
      const course_price = CartsState[courseName].price;
      const course_seat = CartsState[courseName].quantity;
      const cartItem = createCartItem(img_url, courseName, course_price, course_seat)
      cartItemsHTML += cartItem;
  }
  cartsContainer.innerHTML = cartItemsHTML;
}



function createCartItem(img_url, courseName, course_price, course_seat){
  cartsContainer = document.querySelector('#carts');
  cartsContainer.innerHTML="";
  cartsContent = ` <div class="flex py-2 justify-between">
  <img id="course-img" class="w-[66px] h-[62px] md:w-[70px] md:h-[70px] rounded-md" src="${img_url}" alt="">
  <div>
    <p class="font-poppins font-medium text-[#413960] text-[15px] md:text-base">${courseName}</p>
    <p class="text-[#585859] font-medium text-[15px] md:text-base"><span id="course-price">${course_price}</span> TK</p>
  </div>
  <a href=""><img class="w-6 h-6" src="./images/remove-btn.png" alt=""></a>
</div>`
return cartsContent;
}


