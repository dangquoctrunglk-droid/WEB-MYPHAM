/**
 * SunSea - Header Component Loader
 * Tự động load header (top bar + main header + nav) vào trang
 * Tự detect trang hiện tại để highlight nav active
 * Hoạt động với file:// protocol, không cần server
 */
(function () {
  // Detect current page from URL
  var path = window.location.pathname.split("/").pop() || "index.html";

  // Map page -> nav link href
  var navItems = [
    { href: "index.html", label: "Trang chủ" },
    {
      href: "danh-muc.html",
      label: "Danh mục sản phẩm",
      dropdown: [
        { href: "san-pham.html", label: "Chăm sóc da" },
        { href: "trang-diem.html", label: "Trang điểm" },
        { href: "nuoc-hoa.html", label: "Nước hoa" },
        { href: "cham-soc-toc.html", label: "Chăm sóc tóc" },
        { href: "cham-soc-co-the.html", label: "Chăm sóc cơ thể" },
        { href: "my-pham-organic.html", label: "Mỹ phẩm Organic" },
      ],
    },
    { href: "san-pham-moi.html", label: "Sản phẩm mới" },
    { href: "khuyen-mai.html", label: "Khuyến mãi" },
    { href: "gioi-thieu.html", label: "Giới thiệu" },
    { href: "tuyen-dung.html", label: "Tuyển dụng" },
  ];

  // Pages that should mark "Danh mục sản phẩm" as active
  var danhMucPages = [
    "danh-muc.html",
    "san-pham.html",
    "trang-diem.html",
    "nuoc-hoa.html",
    "cham-soc-toc.html",
    "cham-soc-co-the.html",
    "my-pham-organic.html",
    "chi-tiet-san-pham.html",
  ];
  // Pages that should mark "Tuyển dụng" as active
  var tuyenDungPages = ["tuyen-dung.html", "form-tuyen-dung.html"];

  function getActiveHref() {
    if (danhMucPages.indexOf(path) !== -1) return "danh-muc.html";
    if (tuyenDungPages.indexOf(path) !== -1) return "tuyen-dung.html";
    return path;
  }

  var activeHref = getActiveHref();

  // Build nav HTML
  var navHTML = "";
  navItems.forEach(function (item) {
    var isActive = item.href === activeHref ? ' class="active"' : "";
    if (item.dropdown) {
      var dropdownHTML = '<div class="dropdown">';
      item.dropdown.forEach(function (sub) {
        dropdownHTML += '<a href="' + sub.href + '">' + sub.label + "</a>";
      });
      dropdownHTML += "</div>";
      navHTML +=
        '<li><a href="' +
        item.href +
        '"' +
        isActive +
        ">" +
        item.label +
        "</a>" +
        dropdownHTML +
        "</li>";
    } else {
      navHTML +=
        '<li><a href="' +
        item.href +
        '"' +
        isActive +
        ">" +
        item.label +
        "</a></li>";
    }
  });

  var headerHTML =
    "<!-- Header Top -->\n" +
    '<div class="header-top">\n' +
    '    <div class="container">\n' +
    "        🎉 Miễn phí vận chuyển cho đơn hàng từ 500.000đ | Hotline: <strong>1900 8888</strong>\n" +
    "    </div>\n" +
    "</div>\n\n" +
    "<!-- Header -->\n" +
    '<header class="header">\n' +
    '    <div class="header-main">\n' +
    '        <a href="index.html" class="logo">\n' +
    '            <img src="images/logo-sunsea.svg" alt="SunSea - Makeup Store" class="logo-img" />\n' +
    "        </a>\n" +
    '        <div class="search-bar">\n' +
    '            <input type="text" placeholder="Tìm kiếm sản phẩm, thương hiệu...">\n' +
    '            <button><i class="fas fa-search"></i></button>\n' +
    "        </div>\n" +
    '        <div class="header-actions">\n' +
    '            <a href="dang-nhap.html" class="header-action">\n' +
    '                <i class="far fa-user"></i>\n' +
    "                <span>Tài khoản</span>\n" +
    "            </a>\n" +
    '            <a href="yeu-thich.html" class="header-action">\n' +
    '                <i class="far fa-heart"></i>\n' +
    "                <span>Yêu thích</span>\n" +
    '                <div class="badge">3</div>\n' +
    "            </a>\n" +
    '            <a href="thanh-toan.html" class="header-action">\n' +
    '                <i class="fas fa-shopping-bag"></i>\n' +
    "                <span>Giỏ hàng</span>\n" +
    '                <div class="badge">2</div>\n' +
    "            </a>\n" +
    '            <a href="sitemap.html" class="header-action" title="Xem sơ đồ trang">\n' +
    '                <i class="fas fa-sitemap"></i>\n' +
    "                <span>Sitemap</span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    '    <nav class="nav">\n' +
    '        <ul class="nav-list">\n' +
    "            " +
    navHTML +
    "\n" +
    "        </ul>\n" +
    "    </nav>\n" +
    "</header>";

  var placeholder = document.getElementById("header-placeholder");
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  function normalizeImagePath(src) {
    if (!src) return "";

    try {
      var imgUrl = new URL(src, window.location.href);
      var fileName = imgUrl.pathname.split("/").pop();
      return fileName ? "images/" + fileName : "";
    } catch (error) {
      return src;
    }
  }

  function buildProductDetailUrl(card, fallbackHref) {
    if (!card) return fallbackHref || "chi-tiet-san-pham.html";

    var nameEl = card.querySelector(".product-name a, .product-name");
    var brandEl = card.querySelector(".product-brand");
    var imageEl = card.querySelector(".product-image img");
    var priceCurrentEl = card.querySelector(".price-current");
    var priceOldEl = card.querySelector(".price-old");
    var ratingEl = card.querySelector(".product-rating");
    var ratingCountEl = ratingEl ? ratingEl.querySelector("span") : null;
    var badgeEl = card.querySelector(".product-badge");

    var name = nameEl ? nameEl.textContent.trim() : "Sản phẩm";
    var brand = brandEl ? brandEl.textContent.trim() : "SunSea";
    var image = imageEl ? normalizeImagePath(imageEl.getAttribute("src")) : "";
    var priceCurrent = priceCurrentEl ? priceCurrentEl.textContent.trim() : "";
    var priceOld = priceOldEl ? priceOldEl.textContent.trim() : "";
    var ratingText = ratingEl ? ratingEl.textContent : "";
    var ratingStarsMatch = ratingText.match(/[★☆]+/);
    var ratingStars = ratingStarsMatch ? ratingStarsMatch[0] : "★★★★★";
    var reviewCount = ratingCountEl ? ratingCountEl.textContent.trim() : "";
    var badge = badgeEl ? badgeEl.textContent.trim() : "";

    var params = new URLSearchParams();
    params.set("name", name);
    params.set("brand", brand);
    if (image) params.set("image", image);
    if (priceCurrent) params.set("price", priceCurrent);
    if (priceOld) params.set("oldPrice", priceOld);
    if (ratingStars) params.set("stars", ratingStars);
    if (reviewCount) params.set("reviews", reviewCount);
    if (badge) params.set("badge", badge);

    return "chi-tiet-san-pham.html?" + params.toString();
  }

  function enhanceProductDetailLinks() {
    var detailLinks = document.querySelectorAll(
      '.product-name a[href*="chi-tiet-san-pham.html"]',
    );

    detailLinks.forEach(function (link) {
      var card = link.closest(".product-card");
      var detailUrl = buildProductDetailUrl(card, link.getAttribute("href"));

      link.setAttribute("href", detailUrl);

      var imageWrap = card ? card.querySelector(".product-image") : null;
      if (!imageWrap || imageWrap.dataset.detailBound === "1") return;

      imageWrap.style.cursor = "pointer";
      imageWrap.addEventListener("click", function (event) {
        if (event.target.closest(".product-actions")) return;
        window.location.href = detailUrl;
      });
      imageWrap.dataset.detailBound = "1";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceProductDetailLinks);
  } else {
    enhanceProductDetailLinks();
  }
})();
