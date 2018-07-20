$(() => {
  $('#btnShowChamCongTbl').click(showChamCong);
})

function resetTblChamCong() {
  $('#totalChamCong').html('');
  $('#pagingChamCongControl').html('');
  $('#tblChamCong').find('tbody').html('');
}

function renderTblChamCong(data) {
  let $table = $(`<table class="table table-hover table-striped table-condensed text-center custom-table" id="tblChamCong"></table>`)
  let $thead = $('<thead></thead>');
  let $tbody = $('<tbody></tbody>');
  $thead.html(
    `
      <tr>
        <th class="trn">Department</th>
        <th class="trn">Full Name</th>
        <th class="trn">Time Attendance</th>
        <th class="trn">dDate</th>
        <th class="trn">dDateTimeIN1</th>
        <th class="trn">dDateTimeIN2</th>
        <th class="trn">dDateTimeIN3</th>
        <th class="trn">dDateTimeIN4</th>
        <th class="trn">dDateTimeOUT1</th>
        <th class="trn">dDateTimeOUT2</th>
        <th class="trn">dDateTimeOUT3</th>
        <th class="trn">dDateTimeOUT4</th>
      </tr>
    `
  )
  if (data) {
    data.forEach((item) => {
      const { dDate, dDateTimeIN1, dDateTimeIN2, dDateTimeIN3, dDateTimeIN4, dDateTimeOUT1, dDateTimeOUT2, dDateTimeOUT3, dDateTimeOUT4, iTimeAttendance, sDepartment, sFullName } = item;
      
      $tbody.append(`
        <tr>
          <td>${sDepartment}</td>
          <td>${sFullName}</td>
          <td>${iTimeAttendance}</td>
          <td>${dDate.date}</td>
          <td>${dDateTimeIN1.date}</td>
          <td>${dDateTimeIN2.date}</td>
          <td>${dDateTimeIN3.date}</td>
          <td>${dDateTimeIN4.date}</td>
          <td>${dDateTimeOUT1.date}</td>
          <td>${dDateTimeOUT2.date}</td>
          <td>${dDateTimeOUT3.date}</td>
          <td>${dDateTimeOUT4.date}</td>
          
        </tr>
      `)
    })
  }

  $table.append($thead).append($tbody);
  return $table;
}

async function showChamCong() {
  let from = $('#fromDateTime').val();
  let to = $('#toDateTime').val();
  if(checkDate(from, to)){
    if(!checkTimeStartVsTimeEnd(from, to)) return showAlertError("Invalid data!!", "Start Date must sooner than End Date");
    let fromDate = changeFormatDateTime(from);
    let toDate = changeFormatDateTime(to);
    let sentData = {fromDate, toDate};
    
    let data = await Service.chamCong(sentData);
    console.log(data);

    if (data) {
      $('#totalChamCong').html(`<strong>Total Rows:</strong> ${data.length}`)
      $('#pagingChamCongControl').pagination({
        dataSource: data,
        pageSize: 10,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
          // template method of yourself
          let $table = renderTblChamCong(data);
          $('.card-chamCong .table-responsive').html($table);
        }
      })
    } else {
      resetTblChamCong();
      showAlertError("No data available", "", 3000);
    }
  }
}