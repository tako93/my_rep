const { StorageService, ApiService } = window;
const { CURRENT_USER_KEY } = window;

protectedRoute();

(async () => {
  const paginationRoot = document.getElementById("pagination");

  const userId = StorageService.read(CURRENT_USER_KEY);
  ApiService.setUserId(userId);

  const paginationData = await loadData();

  await setUser();

  // pagination
  const colorsPagination = new Pagination(paginationData);

  colorsPagination.appendTo(paginationRoot).render();

  colorsPagination.listen(async (paginationQuery) => {
    const { data: colorList } = await ApiService.listResources(paginationQuery);
    console.log(paginationQuery);
    renderColors(colorList);
  });
})();

async function setUser() {
  const userName = document.getElementById("userName");
  const avatar = document.getElementById("avatar");
  const email = document.getElementById("email");

  const { data: user } = await ApiService.getUser();

  avatar.setAttribute("src", user.avatar);
  userName.textContent = `${user.first_name} ${user.last_name}`;
  email.textContent = user.email;
}

function renderColors(colorList) {
  const colorListView = document.getElementById("colorListView");

  // colorList
  colorListView.innerHTML = null;
  colorList.forEach((color) => {
    colorListView.innerHTML += cardTemplate(color);
  });
}

async function loadData() {
  const {
    data: colorList,
    ...paginationData
  } = await ApiService.listResources();
  renderColors(colorList);
  return paginationData;
}

function cardTemplate(item) {
  return `
    <div
          class="card text-white  mb-3 col-4"
          style="max-width: 18rem; background-color:${item.color}"
        >
          <div class="card-header">${item.name}</div>
          <div class="card-body">
            <h5 class="card-title">Year - ${item.year}</h5>
            <p class="card-text">
              Pantone value - ${item.pantone_value}
            </p>
          </div>
        </div>
    `;
}