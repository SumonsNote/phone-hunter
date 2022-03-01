const phoneFinder = () => {
  document.getElementById("phone-container").innerHTML = "";
  const inputValue = document.getElementById("phone-finder-input").value;
  document.getElementById("phone-finder-input").value = "";
  if (!inputValue) {
    document.getElementById("typeError").style.display = "block";
    document.getElementById("phone-detail-container").innerHTML = "";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}
    `;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showPhone(data.data));
    document.getElementById("typeError").style.display = "none";
    document.getElementById("typeError2").style.display = "none";
  }
};

const showPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  const resultPhone = phones.slice(0,20);
  if(resultPhone.length == 0) {
    document.getElementById("typeError2").style.display = "block";
  }
  for (const phone of resultPhone) {
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("col-md-6");
    div.classList.add("col-12");
    div.innerHTML = `
        <div class="card mt-5 container" style="width: 18rem;">
        <img width="200px" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">${phone.phone_name}</h3>
          <h5>${phone.brand}</h5>
          <a onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Phone Details</a>
        </div>
      </div>
        `;
    phoneContainer.appendChild(div);
  }
};

const phoneDetails = (phone) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data.data));
};

const showPhoneDetails = (phoneDetail) => {
  document.getElementById("phone-container").innerHTML = "";
  const phoneDetailContainer = document.getElementById(
    "phone-detail-container"
  );
  document.getElementById("phone-detail-container").innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("p-5");
  div.innerHTML = `
    <div class="card mt-5 container mx-auto" style="width: 18rem;">
    <img width="200px" src="${phoneDetail.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="card-title">${phoneDetail.name}</h3>
      <h5>${phoneDetail.brand}</h5>
      <p>${phoneDetail.releaseDate}</p><br>
      <p><b>Chipset:</b> ${phoneDetail.mainFeatures.chipSet}<br>,<b>Size:</b> ${phoneDetail.mainFeatures.displaySize}</p><br>
      <p><b>Memoery:</b> ${phoneDetail.mainFeatures.storage}</p><br>
      <p><b>Sensors:</b> ${phoneDetail.mainFeatures.sensors}</p><br>
      <p><b>Bluetooth:</b> ${phoneDetail.others.Bluetooth}<br><b>GPS:</b> ${phoneDetail.others.GPS}<br><b>NFC:</b> ${phoneDetail.others.NFC}<br><b>Radio:</b> ${phoneDetail.others.Radio}<br><b>USB:</b> ${phoneDetail.others.USB}<br><b>WLAN:</b> ${phoneDetail.others.WLAN}</p>
    </div>
  </div>
    `;
  phoneDetailContainer.appendChild(div);
};
