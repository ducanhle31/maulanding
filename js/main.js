


//passive scroll Jquery
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: true });
  },
};
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("mousewheel", handle, { passive: true });
  },
};

let bar = document.getElementById("bar");
let navbar = document.getElementById("nav-bar");
let closebar = document.getElementById("close-bar");
let body = document.querySelector("body");
let linklist = document.getElementById("link-list");
let nav_item = document.querySelectorAll(".nav_category");

let flag = false;

bar.onclick = function () {
  navbar.style.width = "250px";
  bar.style.visibility = "hidden";
  body.style.overflowY = "hidden";
  linklist.style.display = "block";
};

closebar.onclick = function () {
  navbar.style.width = "0px";
  body.style.overflowY = "inherit";
  linklist.style.display = "none";
  setTimeout(function () {
    bar.style.visibility = "inherit";
  }, 200);
};

nav_item.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navbar.style.width = "0px";
    body.style.overflowY = "inherit";
    linklist.style.display = "none";
    setTimeout(function () {
      bar.style.visibility = "inherit";
    }, 200);
  });
});

let question_icon = document.querySelectorAll(".question_icon");

question_icon.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let question_info =
      this.parentElement.parentElement.querySelector(".question_item");
    if (question_info.style.display == "block") {
      question_info.style.display = "none";
      this.querySelector("img").src = "img/down-arrow.svg";
    } else if (question_info.style.display == "none") {
      question_info.style.display = "block";
      this.querySelector("img").src = "img/up-arrow.svg";
    }
  });
});

question_icon.forEach(function (btn) {
  question_icon.onclick = function () {
    console.log("hi");
  };
});

function checkValid(name, phone, email) {
  let valid = true;

  const nameMessage = document.querySelector(".name-message");
  const phoneMessage = document.querySelector(".phone-message");
  const emailMessage = document.querySelector(".email-message");

  if (name.value.trim() == "") {
    name.classList.remove("valid");
    name.classList.add("invalid");
    nameMessage.innerText = "Vui lòng nhập đúng họ tên";
    valid = false;
  } else {
    name.classList.remove("invalid");
    name.classList.add("valid");
    nameMessage.innerText = "";
  }

  if (phone.value.trim() == "") {
    phone.classList.remove("valid");
    phone.classList.add("invalid");
    phoneMessage.innerText = "Vui lòng nhập đúng số điện thoại";
    valid = false;
  } else {
    phone.classList.remove("invalid");
    phone.classList.add("valid");
    phoneMessage.innerText = "";
  }

  if (email.value.trim() == "" || !email.value.includes("@")) {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailMessage.innerText = "Vui lòng nhập đúng email";
    valid = false;
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
    emailMessage.innerText = "";
  }

  return valid;
}




function toggleModal() {
  const body = document.querySelector("body");
  successModal.classList.toggle("showUp");
  body.classList.toggle("preventScroll");
}

const successModal = document.getElementById("successModal");
successModal.addEventListener("click", function () {
  toggleModal();
});



document.getElementById("btn-register").addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const note = document.getElementById("note");

  if (checkValid(name, phone, email)) {
    let nameVal = name.value;
    let phoneVal = phone.value;
    let emailVal = email.value;
    let noteVal = note.value;

    let req = {
      FullName: nameVal,
      Email: emailVal,
      Phone: phoneVal,
      Note: noteVal,
      Link: window.location.href,
      ItemId: "nl2",
      // Type: 1,
    };

    let myJSON = JSON.stringify(req);

    $.ajax({
      url: "https://techmaster.vn/submit-advisory",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: myJSON,
      dataType: "json",
      success: function () {
        name.value = phone.value = email.value = note.value = "";
        name.classList.remove("valid");
        phone.classList.remove("valid");
        email.classList.remove("valid");
        toggleModal();

      },
      error: function (result) {
        console.error(result);
      },
    });
  }
});





$(window)
  .scroll(function () {
    var scrollDistance = $(window).scrollTop();

    $(".menu-section").each(function (i) {
      if ($(this).position().top <= scrollDistance) {
        $(".nav_category a.active").removeClass("active");
        $(".nav_category a").eq(i).addClass("active");
      }
    });
  })
  .scroll();

/* slide khác biệt... */

var data = [
  {
    id: 1,

    title: "Một tuần 10 buổi. Thực hành làm bài tập 100% tại lớp so với thực hành(40% tại lớp 60 % tại nhà của lớp tối) "
  },
  {
    id: 2,

    title: "Phương pháp học lớp toàn thời gian, nhấn mạnh kỹ năng làm việc nhóm, chủ động thực hành ngay tại lớp. Buổi tối sinh viên có thể làm việc khác hoặc đi làm thêm."
  },
  {
    id: 3,

    title: "Quy mô lớp dưới 12 sinh viên, chia thành 4-6 nhóm. "
  },
  {
    id: 4,

    title: "Cấp chứng chỉ riêng biệt cho từng kỹ năng. Thiết kế web (giao diện+ HTML/CSS, JavaScript). Lập trình Front-End React.js . Lập trình Back-End Node.js"
  },
  {
    id: 5,

    title: "Phụ huynh được xem báo cáo tiến độ học của con liên tục bất kỳ lúc nào. "
  }
];
var activeItem = 0;
var autoPlayInterval;

function mutableRotateLeft() {
  activeItem--;
  if (activeItem < 0) {
    activeItem = data.length - 1;
  }
  updateCarousel();
}

function mutableRotateRight() {
  activeItem++;
  if (activeItem >= data.length) {
    activeItem = 0;
  }
  updateCarousel();
}

function autoPlay() {
  autoPlayInterval = setInterval(mutableRotateRight, 2000); // Thời gian chuyển slide: 3000ms = 3 giây
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function updateCarousel() {
  var leftItem = activeItem - 1;
  if (leftItem < 0) {
    leftItem = data.length - 1;
  }
  var rightItem = activeItem + 1;
  if (rightItem >= data.length) {
    rightItem = 0;
  }

  var slideLeft = document.getElementById("slideLeft");
  slideLeft.innerHTML = data[leftItem].title;

  var slideActive = document.getElementById("slideActive");
  slideActive.innerHTML =
    '<div class="slide_title">' + data[activeItem].title + "</div>";

  var slideRight = document.getElementById("slideRight");
  slideRight.innerHTML = data[rightItem].title;

  var pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    li.classList.add("pagination-item");
    if (i === activeItem) {
      li.classList.add("active");
    }
    li.setAttribute("data-index", i);
    li.addEventListener("click", paginationClickHandler);
    pagination.appendChild(li);
  }
}

function paginationClickHandler(event) {
  var targetIndex = parseInt(event.target.getAttribute("data-index"));
  activeItem = targetIndex;
  updateCarousel();
}

updateCarousel();
autoPlay();


function getAllPosts() {
  $.ajax({
    url: "https://techmaster.vn/api/class/kUZjW387/outline?type=group",
    // url: dataAws,
    method: "GET",
    success: (result) => {
      if (result.length > 0) {
        let groupContent = "";
        const groups = [];
        result?.forEach((lesson, i) => {
          const groupIndex = groups.findIndex(
            (group) => group.name === lesson.group_name
          );

          if (groupIndex !== -1) {
            groups[groupIndex].lessons.push(lesson);
          } else {
            groups.push({ id: i, name: lesson.group_name, lessons: [lesson] });
          }
        });

        // if (result.length > 0) {
        let indexLesson = 0;
        groups.forEach((item, index) => {
          let content = "";
          $.each(item.lessons, function (index, item) {
            let courselist = "";
            if (item.lectures != null) {
              for (let i = 0; i < item.lectures.length; i++) {
                courselist += `
                  <li>
                    ${item.lectures[i].title}
                  </li>
                  `;
              }
            }
            ++indexLesson;
            content += `
                            <div class="course_content">
                              <div class="triangle">
                              </div>
                              <div class="track_container">
                                <div class="track_content">
                                  <div class="title">
                                    <span>Buổi ${indexLesson}: ${item.name}</span>
                                    <span class="toggle_btn">
                                      <img src="img/down-arrow.svg">
                                    </span>
                                  </div>
                                  <div class="list course_info" style="display:none">
                                  <ul>
                                  ${courselist}
                                  </ul>
                                </div>
                                </div>
                              </div>
                            </div>
                        `;
          });

          groupContent += `  <h2 id="module-item"  style="margin-top: 48px;">Phần ${index + 1
            } : ${item.name}</h2>
            <div class="course_content_container" id="course_content_container1">
            ${content}
            </div>
            
            `;
        });

        $("#module-container").html(groupContent);
        let track_content = document.querySelectorAll(".track_content");

        track_content.forEach(function (btn) {
          btn.addEventListener("click", function () {
            let course_info = this.querySelector(".course_info");
            if (course_info.style.display == "block") {
              course_info.style.display = "none";
              this.querySelector("toggle_btn").src = "img/down-arrow.svg";
            } else if (course_info.style.display == "none") {
              course_info.style.display = "block";
              console.log(this.src);
              this.querySelector("toggle_btn").src = "img/up-arrow.svg";
            }
          });
        });
      }
    },
    error: (e) => {
      console.error(e.message);
    },
  });
}
// }

getAllPosts();
function hideToast() {
  $(".btn-close-toast").on("click", function () {
    $("#liveToast1").css("display", "none");
    $("#liveToast2").css("display", "none");
    clearInterval(showToast()[1]);
    clearInterval(showToast()[0]);
  });
}
hideToast();
function showToast1() {
  $(".toast-container1")
    .css("opacity", "1")
    .css("right", "0")
    .css("transition", "2s ease");
  $(".toast-container2")
    .css("opacity", "0")
    .css("right", "-400px")
    .css("transition", "2s ease");
}
function showToast2() {
  $(".toast-container2")
    .css("opacity", "1")
    .css("right", "0")
    .css("transition", "2s ease");

  $(".toast-container1")
    .css("opacity", "0")
    .css("right", "-400px")
    .css("transition", "1s ease");
}
function showToast() {
  showToast1();
  let id = setTimeout(function () {
    showToast2();
  }, 8000);
  let id1 = setInterval(() => {
    showToast1();
    setTimeout(function () {
      showToast2();
    }, 10000);
  }, 20000);
  return [id, id1];
}






// Tắt thông báo ưu đãi (showToast)
// showToast();
function showQuestion() {
  $(".question_item").on("click", function (e) {
    $(e.target.closest(".question_item")).find(".answer").fadeToggle();
  });
}
showQuestion();

$(document).ready(function () {
  // Zalo contact
  $(".button__zalo").on("click", function (e) {
    const $toggleZalo = $(this).siblings(".overlay");
    $toggleZalo.fadeToggle();
    if ($toggleZalo.is(":visible")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }

    // Thêm lắng nghe sự kiện "click" trên phần tử "overlay"
    $toggleZalo.on("click", function (e) {
      // Kiểm tra xem sự kiện được kích hoạt có từ phần tử "overlay" hay không
      if (e.target === this) {
        // Nếu không phải, ẩn lớp overlay và đặt lại trạng thái "overflow" cho phần tử "body"
        $(this).fadeOut();
        $("body").css("overflow", "auto");
      }
    });
  });

  $(".close__button").on("click", function (e) {
    e.preventDefault();
    const $toggleZalo = $(this).parents(".overlay");
    $toggleZalo.fadeToggle();
    $("body").css("overflow", "auto");
  });
});
