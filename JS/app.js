const phoneFinder = () => {
    document.getElementById("phone-container").innerHTML = '';
  const inputValue = document.getElementById("phone-finder-input").value;
  document.getElementById("phone-finder-input").value = "";
  if(!inputValue) {
      document.getElementById('typeError').style.display = 'block'
      document.getElementById('phone-detail-container').innerHTML = ''
  }
  else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}
    `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhone(data.data));
    document.getElementById('typeError').style.display = 'none'
  }
};


const showPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  for (const phone of phones) {
    const div = document.createElement("div");
    div.classList.add('col-md-4')
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
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
}

const showPhoneDetails = (phoneDetail) => {
    document.getElementById("phone-container").innerHTML = '';
    const phoneDetailContainer = document.getElementById('phone-detail-container')
    const div = document.createElement('div')
    div.classList.add('p-5')
    div.innerHTML = `
    <div class="card mt-5 container mx-auto" style="width: 18rem;">
    <img width="200px" src="${phoneDetail.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="card-title">${phoneDetail.name}</h3>
      <h5>${phoneDetail.brand}</h5>
      <p>${phoneDetail.releaseDate}</p>
      <p>${phoneDetail.mainFeatures.chipSet},${phoneDetail.mainFeatures.displaySize}</p>
      <p>${phoneDetail.mainFeatures.storage}</p>
      <p>${phoneDetail.mainFeatures.sensors}</p>
      <p>${phoneDetail.others.Bluetooth},${phoneDetail.others.GPS},${phoneDetail.others.NFC},${phoneDetail.others.Radio},${phoneDetail.others.USB},${phoneDetail.others.WLAN}</p>
    </div>
  </div>
    `;
    phoneDetailContainer.appendChild(div)
}