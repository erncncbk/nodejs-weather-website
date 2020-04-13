const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorMessage = document.querySelector("#message-error");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch("/weather?address=" + location).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = `${data.error}`;
      } else {
        // console.log(data.location);
        // console.log(data.forecast);
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = ` It is currently ${data.temperature} degress out. `;
        messageThree.textContent = `Humidity : ${data.humidity}`;
        messageFour.textContent = `Weather is ${data.forecast}`;
      }
    })
  );
});
