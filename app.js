console.log("Let's get this party started!");
// grabbing the the search input and empty Div through the dom
const $searchInput = $("#search");
const $gifArea = $("#gif");

//using the result frrom the search term to show up on the dom
async function getGif(res) {
  console.log(res);
  let numberOfData = res.data.length;
  if (numberOfData) {
    let randomIndex = Math.floor(Math.random() * numberOfData);
    let $newDiv = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIndex].images.original.url,
      class: "w-100",
    });
    $newDiv.append($newGif);
    $gifArea.append($newDiv);
  }
}
// using the val from the input to get data from the api
$("form").on("submit", async function (evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const payload = {
    params: {
      q: searchTerm,
      api_key: "W8O3i3qVfvV0ozr29OZRkbdYK23xAfnc",
    },
  };
  const response = await axios.get(
    "http://api.giphy.com/v1/gifs/search?",
    payload
  );
  getGif(response.data);
});

//deltes all gifs from the dom
$("#remove").on("click", function () {
  $gifArea.empty();
});
