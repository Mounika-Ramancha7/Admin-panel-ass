// var url = 'https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


const getTable = new Promise((resolve, reject) => {
    $.get('https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
        (apiDATA) => { resolve(apiDATA) })
        .fail(err => { reject() })
});

getTable
    .then(response => {
        console.log('call success')

        const dataRow = response.map(responseData => {
            return (
                `<tr class="data-row" id="${responseData.id}">
                <td class="column1">${responseData.id}</td>
                <td class="column2">${responseData.firstName}</td>
                <td class="column3">${responseData.lastName}</td>
                <td class="column4">${responseData.email}</td>
                <td class="column5">${responseData.phone}</td>
            </tr>`
            );
        })
        // console.log(dataRow)
        $('tbody').append(dataRow)

        $('#search-box').keyup(() => {
            console.log($('#search-box').val())
            const searchDetails = response.filter(searchItem => {
                if (searchItem.firstName.toLowerCase().includes($('#search-box').val().toLowerCase())) {
                    console.log("true")
                    //  dataRow = response.map( responseData => {
                    return (
                        `<tr class="data-row" id="${searchItem.id}">
                        <td class="column1">${searchItem.id}</td>
                        <td class="column2">${searchItem.firstName}</td>
                        <td class="column3">${searchItem.lastName}</td>
                        <td class="column4">${searchItem.email}</td>
                        <td class="column5">${searchItem.phone}</td>
                    </tr>`
                    );
                    // })
                } else {
                    console.log("false")
                    $('#' + searchItem.id).remove();
                }
            });
            // $('tbody').text('')
            $('tbody').append(searchDetails)
            console.log(searchDetails)
        });


        $('tbody .data-row').click((currentData) => {

            let currentRowID = currentData.currentTarget.id

            $('.data-row').removeClass('active')
            $('#' + currentRowID).addClass('active')

            $('#info-content').text('')

            const infoContent = response.map(data => {
                if (data.id == currentRowID) {

                    return (`<div><b>User selected:</b> ${data.firstName} ${data.lastName}</div>
            <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readonly>
                ${data.description}
                </textarea>
            </div>
            <div><b>Address:</b> ${data.address.streetAddress}</div>
            <div><b>City:</b> ${data.address.city}</div>
            <div><b>State:</b> ${data.address.state}</div>
            <div><b>Zip:</b> ${data.address.zip}</div>`)

                }
            })
            $('#info-content').append(infoContent)
        });
    })
    .catch(err => {
        console.log('call failed')
    })
























const renderDetails = (dataID) => {
    const id = dataID
    console.log(id)

    const urlData = $.get('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
        function (apiData) {
            return apiData;
        });

    console.log(urlData)

    const getDetails = Object.values(urlData).filter(clickedItem => {
        clickedItem.id == id ? console.log(clickedItem.id) : console.log("not-here")
    });
}

$('#table-data .column1').click(function () {
    const getTableDetails = new Promise((resolve, reject) => {
        $.get('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
            function () {

            })
    })
    renderDetails(this.innerHTML)
})