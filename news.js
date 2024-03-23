const News_apiUrl =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=d23b7624ddb641bf9a51ed226d7b7d2d";

fetch(News_apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Do something with the data, like display it on your webpage
    const currentNews = document.getElementById("current_News");
    currentNews.innerText = data.articles[1].content;
    // console.log(data.articles[1].content);
  })
  .catch((error) => {
    // console.log('There was a problem with the fetch operation:', error);
    const currentNews = document.getElementById("current_News");
    currentNews.innerText = "There was a problem with the fetch operation: " + error;
  });
