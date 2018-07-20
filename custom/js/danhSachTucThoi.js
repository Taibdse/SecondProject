$(() => {
  $('#btnShowOnsiteTbl').click(showOnSiteList);
})

function resetTblChamCong() {
  $('#totalOnsite').html('');
  $('#pagingOnsiteControl').html('');
  $('#tblOnsite').find('tbody').html('');
}

function renderTblOnsiteList(data) {
  let $table = $(`<table class="table table-hover table-striped table-condensed text-center custom-table" id="tblOnsite"></table>`)
  let $thead = $('<thead></thead>');
  let $tbody = $('<tbody></tbody>');
  $thead.html(
    `
      <tr>
        <th class="trn">DateTimeInOut</th>
        <th class="trn">RefLecteur</th>
        <th class="trn">RefNomUsager</th>
        <th class="trn">RefUsager</th>
        <th class="trn">SMI</th>
        <th class="trn">TypAcces</th>
        <th class="trn">TypMess</th>
        <th class="trn">evt</th>
      </tr>
    `
  )
  if (data) {
    data.forEach((item) => {
      const { DateTimeInOut, RefLecteur, RefNomUsager, RefUsager, SMI, TypAcces, TypMess, evt } = item;
      
      $tbody.append(`
        <tr>
          <td>${DateTimeInOut}</td>
          <td>${RefLecteur}</td>
          <td>${RefNomUsager}</td>
          <td>${RefUsager}</td>
          <td>${SMI}</td>
          <td>${TypAcces}</td>
          <td>${TypMess}</td>
          <td>${evt}</td>
        </tr>
      `)
    })
  }

  $table.append($thead).append($tbody);
  return $table;
}

async function showOnSiteList() {
  let date = $('#onSiteDate').val();
  if(!Validation.checkEmpty(date)) return showAlertError("Invalid data!!", "You must choose date");
  let Date = changeFormatDateTime(date);
  let sentData = { Date };
  
  let data = await Service.getOnSiteList(sentData);
  console.log(data);

  if (data) {
    $('#totalOnsite').html(`<strong>Total Rows:</strong> ${data.length}`)
    $('#pagingOnsiteControl').pagination({
      dataSource: data,
      pageSize: 10,
      showGoInput: true,
      showGoButton: true,
      callback: function (data, pagination) {
        // template method of yourself
        let $table = renderTblOnsiteList(data);
        $('.card-onsite .table-responsive').html($table);
      }
    })
  } else {
    resetTblChamCong();
    showAlertError("No data available", "", 3000);
  }
  
}