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
      label: "Danh mục",
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

  // Pages that should mark "Danh mục" as active
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
})();
