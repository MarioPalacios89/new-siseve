window.addEventListener("DOMContentLoaded", function () {
  new Splide('#main-slider', {
    type: 'loop',
    autoplay: true,
    interval: 3500,
    pauseOnHover: true,
    arrows: true,
    pagination: true,
    heightRatio: 0.4,
  }).mount();

        let toggle = document.getElementById('mobile-menu-toggle');
                  let menu = document.getElementById('mobile-dropdown-menu');
                  toggle.addEventListener('click', function(e) {
                  e.stopPropagation();
                  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                  });
                  document.addEventListener('click', function(e) {
                  if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                  }
                  });
                  menu.addEventListener('click', function(e) {
                  e.stopPropagation();
                  });

  const stickyElement = document.getElementById("sticky-blocks");
  const menus = document.getElementById("menus");
  const spacer = document.getElementById("spacer");
  const footer = document.querySelector(".footer");
  const sliderImg = document.querySelector(".placeholder-image img");
  const videoListEl = document.getElementById("video-list");
  const videoTitleDisplay = document.getElementById("video-title-display");
  const maskImageVideo = document.getElementById("mask-image-video");
  const btnSubir = document.getElementById("btn-subir");

  let stickyOffset = stickyElement ? stickyElement.offsetTop : 0;
  let sliderHalf = 0;

  function updateStickyOffset() {
    stickyOffset = stickyElement ? stickyElement.offsetTop : 0;
    if (sliderImg) {
      sliderHalf = sliderImg.offsetTop + sliderImg.offsetHeight / 2;
    }
    if (stickyElement && spacer) {
      spacer.style.height = stickyElement.offsetHeight + "px";
    }
  }

  function handleStickyBlocks(scrollY) {
    const stickyHeight = stickyElement.offsetHeight;
    const footerTop = footer.getBoundingClientRect().top + scrollY;
    const shouldStick = scrollY >= stickyOffset - 50;
    const willOverlap = scrollY + stickyHeight + 50 >= footerTop;
    const isDesktop = window.innerWidth >= 1200;

    if (shouldStick && !willOverlap && isDesktop) {
      stickyElement.classList.add("sticky");
      spacer.style.display = "block";
    } else {
      stickyElement.classList.remove("sticky");
      spacer.style.display = "none";
    }
  }

  function handleMenusColor(scrollY) {
    if (scrollY >= sliderHalf) {
      menus.classList.add("scrolled-half");
    } else {
      menus.classList.remove("scrolled-half");
    }
  }

  function handleBtnSubir() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      if (btnSubir) btnSubir.style.display = "block";
    } else {
      if (btnSubir) btnSubir.style.display = "none";
    }
  }

  window.addEventListener("resize", updateStickyOffset);
  if (sliderImg) sliderImg.addEventListener("load", updateStickyOffset);
  updateStickyOffset();

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    handleStickyBlocks(scrollY);
    handleMenusColor(scrollY);
    handleBtnSubir();
  });

  const videoFiles = [
    { thumb: "assets/images/videos/thumb/V_Lima-thumb.png", mask: 'assets/images/videos/V_LIMA.png', title: "Video Aleatorio 1", subtitle: "Subtítulo 1" },
    { thumb: "assets/images/videos/thumb/V_AQP-thumb.png", mask: 'assets/images/videos/V_AQP.png', title: "Video Aleatorio 2", subtitle: "Subtítulo 2" },
    { thumb: "assets/images/videos/thumb/V_callao-thumb.png", mask: 'assets/images/videos/V_CALLAO.png', title: "Video Aleatorio 3", subtitle: "Subtítulo 3" },
    { thumb: "assets/images/videos/thumb/V_LaLibertad-thumb.png", mask: 'assets/images/videos/V_LALIBERTAD.png', title: "Video Aleatorio 4", subtitle: "Subtítulo 4" },
    { thumb: "assets/images/videos/thumb/V_Loreto-thumb.png", mask: 'assets/images/videos/V_LORETO.png', title: "Video Aleatorio 5", subtitle: "Subtítulo 5" },
  ];

  function renderVideoList() {
    videoFiles.forEach((video, index) => {
      const item = document.createElement("div");
      item.className = "video-list-item" + (index === 0 ? " active" : "");
      item.dataset.index = index;
      item.innerHTML = `
        <div class="video-thumb" style="background-image: url('${video.thumb}')"></div>
        <div class="video-info">
          <p class="video-title">${video.title}</p>
          <p class="video-subtitle">${video.subtitle}</p>
        </div>
      `;
      item.addEventListener("click", () => selectVideo(index));
      videoListEl.appendChild(item);
    });
  }

  function selectVideo(index) {
    maskImageVideo.src = videoFiles[index].mask;
    document.querySelectorAll(".video-list-item").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(`.video-list-item[data-index="${index}"]`).classList.add("active");
  }

  renderVideoList();

  // setInterval(() => {
  //   document.querySelectorAll(".btn-reporta").forEach(btnReporta => {
  //     const bellIcon = btnReporta.querySelector("svg");
  //     if (bellIcon) {
  //       bellIcon.classList.remove("bell-animate");
  //       // Forzar reflow para reiniciar la animación
  //       void bellIcon.offsetWidth;
  //       bellIcon.classList.add("bell-animate");
  //     }
  //   });
  // }, 1000);

  if (btnSubir) {
    btnSubir.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (maskImageVideo) {
    maskImageVideo.addEventListener("click", function () {
      $('#testModal').modal('show');
    });
  }

  $('#testModal').on('show.bs.modal', function () {
    const video = document.getElementById('main-video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  const cardsData = [
    {
      img: "assets/images/protocolos/protocolo1.png",
      title: "PROTOCOLOS DE ATENCIÓN",
      text: "PARA LOS CASOS DE VIOLENCIA ESCOLAR",
      btn: "Mas información",
      btnLink: "#",
    },
    {
      img: "assets/images/protocolos/protocolo2.png",
      title: "CAJA DE HERRAMIENTAS",
      text: "PARA LA GESTIÓN DE LA CONVIVENCIA ESCOLAR",
      btn: "Mas información",
      btnLink: "#",
    },
    {
      img: "assets/images/protocolos/protocolo3.png",
      title: "CONOCE EL PREVI",
      text: "PROGRAMA INTEGRAL PARA LA PREVENCION DE LA VIOLENCIA EN LOS ENTORNOS ESCOLARES",
      btn: "Mas información",
      btnLink: "#",
    }
  ];

  const cardsContainer = document.getElementById("cards-container");
  if (cardsContainer) {
    cardsContainer.innerHTML = cardsData
      .map(
        (card) => `
        <div class="col-md-4 col-sm-6 col-gap-6">
          <div class="card">
            <div class="card__header">
              <img src="${card.img}" alt="card__image" class="card__image" />
            </div>
            <div class="card__body">
              <h4>${card.title}</h4>
              <p>${card.text}</p>
              <a href="${card.btnLink}" class="btn btn-protocolo">${card.btn}</a>
            </div>
            <div class="card__footer">
              <a href="${card.btnLink}" class="btn btn-protocolo">${card.btn}</a>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }
});
