console.log('client side javascript is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('#txt-address');
const loading = document.querySelector('#loading');

weatherForm.addEventListener('submit', (e) => {
    loading.innerHTML = '<b>Loading.....</b>';
    // prevent submit refresh
    e.preventDefault();
    weatherForecast(search.value);
})

function submitRequest() {
    var address = document.getElementById('txtAddress').value;
    console.log(address);
    weatherForecast(address);
}

function weatherForecast(address) {
    fetch('/weather/submit?address=' + address).then(
        (res) => {
            res.json().then((data) => {
                loading.innerHTML = '';
                console.log(data);
                var pr = document.getElementById('pResponse');
                var msg = '';
                if (data.error) {
                    pr.parentElement.setAttribute('class', 'bad report');
                    msg = data.error;
                } else {
                    pr.parentElement.setAttribute('class', 'good report');
                    msg = `This is the weather summary for: ${data.place}.<br>It is currently "${data.description}" and ${data.temperature} degrees F outside, but feels like ${data.feelslike} degrees F.`;
                }
                pr.innerHTML = msg;
            });
        }
    )
}