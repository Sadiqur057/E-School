
const CartsState = {};

let itemCounts = 0;
let totalPrice = 0;
let totalSeats = 60;
const courses = document.querySelectorAll(".course");
let cartsContainer = document.querySelector("#carts");

courses.forEach((singleCourse) => {
  const courseName = singleCourse.childNodes[3].innerText;
  const coursePrice = singleCourse.childNodes[5].childNodes[0].innerText;
  const courseImg = singleCourse.childNodes[1].src;
  const seatCounts =
    singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0]
      .innerText;
  console.log(singleCourse.childNodes[7]);
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
      updatePrice();
      updateItemInfo();
      singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0].innerText =
        seatCounts - 1;
    }
    console.log(CartsState);
    renderStateOnPage(CartsState);
  });
});

function updateItemInfo() {
  itemCounts = 0;
  for (courseName in CartsState) {
    itemCounts++;
  }
  document.querySelector("#course-counts").innerText = itemCounts;
}

function updateSeats() {
  totalSeats = 60;
  for (courseName in CartsState) {
    totalSeats = Number(CartsState[courseName].seats);
  }
  document.querySelector(".seat-counts").innerText = totalSeats;
}

function updatePrice() {
  totalPrice = 0;
  for (courseName in CartsState) {
    totalPrice += Number(CartsState[courseName].price);
  }
  document.querySelector("#total-price").innerText = totalPrice;
}

function renderStateOnPage(CartsState) {
  if(Object.keys(CartsState).length == 0){
    document.querySelector("#carts").innerHTML = `<p class="text-center text-[#585859] text-sm md:text-base font-medium font-poppins py-8">You Still haven't Selected anything.</p>`
  }else{
    let cartItemsHTML = "";
    for (const courseName in CartsState) {
      const img_url = CartsState[courseName].img;
      const course_price = CartsState[courseName].price;
      const cartItem = createCartItem(img_url, courseName, course_price);
      cartItemsHTML += cartItem;
    }
    cartsContainer.innerHTML = cartItemsHTML;
  }
}

function createCartItem(img_url, courseName, course_price, course_seat) {
  cartsContainer = document.querySelector("#carts");
  cartsContainer.innerHTML = "";
  cartsContent = ` <div class="flex py-1 md:py-2  justify-between">
  <img id="course-img" class="w-14 h-14 md:w-[70px] md:h-[70px] rounded-md" src="${img_url}" alt="">
  <div>
    <p class="font-poppins font-medium text-[#413960] text-sm md:text-base mb-[2px]">${courseName}</p>
    <p class="text-[#585859] font-medium text-sm md:text-base"><span id="course-price">${course_price}</span> TK</p>
  </div>
  <button class="self-start" onclick="deleteFromCarts('${courseName}')"><img class="w-6 h-6" src="./images/remove-btn.png" alt=""></button>
</div>`;
  return cartsContent;
}

function deleteFromCarts(courseName) {
  console.log(CartsState[courseName]);
  delete CartsState[courseName];
  updatePrice();
  updateItemInfo();
  updateSeats();
  console.log(Object.keys(CartsState).length);
  return renderStateOnPage(CartsState);
}
