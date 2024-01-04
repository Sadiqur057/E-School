const CartsState = {};

let itemCounts = 0;
let totalPrice = 0;
let totalSeats = 60;
const courses = document.querySelectorAll(".course");
let cartsContainer = document.querySelector("#carts");

document.querySelector('#error-msg').classList.add('hidden');
document.querySelector('#success-msg').classList.add('hidden');
document.querySelector('#remove-msg').classList.add('hidden');

courses.forEach((singleCourse) => {
  const courseName = singleCourse.childNodes[3].innerText;
  const coursePrice = singleCourse.childNodes[5].childNodes[0].innerText;
  const courseImg = singleCourse.childNodes[1].src;
  const seatCounts =
    singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0]
      .innerText;
  const addToCartBtn = singleCourse.childNodes[7];

  addToCartBtn.addEventListener("click", () => {
    if (courseName in CartsState) {
      document.querySelector('#error-msg').classList.remove('hidden');
      setTimeout(() => {
        document.querySelector('#error-msg').classList.add('hidden');
      }, 2000);
    } else {
      CartsState[courseName] = {};
      CartsState[courseName]["img"] = courseImg;
      CartsState[courseName]["price"] = coursePrice;
      CartsState[courseName]["seats"] = seatCounts;
      document.querySelector('#success-msg').classList.remove('hidden');
      setTimeout(() => {
        document.querySelector('#success-msg').classList.add('hidden');
      }, 2000);
      updatePrice();
      updateItemInfo();
      updateSeats();
      CartsState[courseName]["seats"] = seatCounts - 1;
      singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0].innerText =
        CartsState[courseName]["seats"];
    }
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
  courses.forEach((singleCourse) => {
    const courseName = singleCourse.childNodes[3].innerText;
    if (courseName in CartsState) {
      singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0].innerText =
        CartsState[courseName].seats;
    } else {
      singleCourse.childNodes[9].childNodes[3].childNodes[3].childNodes[0].innerText = 60;
    }
  });
}

function updatePrice() {
  totalPrice = 0;
  for (courseName in CartsState) {
    totalPrice += Number(CartsState[courseName].price);
  }
  document.querySelector("#total-price").innerText = totalPrice;
}

function renderStateOnPage(CartsState) {
  if (Object.keys(CartsState).length == 0) {
    document.querySelector(
      "#carts"
    ).innerHTML = `<p class="text-center text-[#585859] text-sm md:text-base font-medium font-poppins py-8">You Still haven't Selected anything.</p>`;
  } else {
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
  delete CartsState[courseName];
  document.querySelector('#remove-msg').classList.remove('hidden');
  setTimeout(() => {
    document.querySelector('#remove-msg').classList.add('hidden');
  }, 2000);
  updatePrice();
  updateItemInfo();
  updateSeats();
  return renderStateOnPage(CartsState);
}
