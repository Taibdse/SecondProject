
// FirstName, IDNumber, LogicalCode, Name, idUser, type, ValidityDate; {date, timezone, timezone_type}

$(() => {
  showUsersData();
})

function resetTblUsersList() {
  $('#totalUsers').html('');
  $('#pagingUsersControl').html('');
  $('#tblUsers').find('tbody').html('');
}

function renderTblUsersList(users) {
  let $table = $(`<table class="table table-hover table-striped table-condensed text-center custom-table" id="tblUsers"></table>`)
  let $thead = $('<thead></thead>');
  let $tbody = $('<tbody></tbody>');
  $thead.html(
    `
      <tr>
        <th class="trn">FirstName</th>
        <th class="trn">IDNumber</th>
        <th class="trn">LogicalCode</th>
        <th class="trn">Name</th>
        <th class="trn">idUser</th>
        <th class="trn">type</th>
        <th class="trn">date</th>
        <th class="trn">timezone</th>
        <th class="trn">timezone_type</th>
      </tr>
    `
  )
  if (users) {
    users.forEach((user) => {
      const { FirstName, IDNumber, LogicalCode, Name, idUser, type, ValidityDate } = user;
      const { date, timezone, timezone_type } = ValidityDate;
      $tbody.append(`
        <tr>
          <td>${FirstName}</td>
          <td>${IDNumber}</td>
          <td>${LogicalCode}</td>
          <td>${Name}</td>
          <td>${idUser}</td>
          <td>${type}</td>
          <td>${date}</td>
          <td>${timezone}</td>
          <td>${timezone_type}</td>
        </tr>
      `)
    })
  }

  $table.append($thead).append($tbody);
  return $table;
}

async function showUsersData() {
  let users = await Service.getUsersData();
  console.log(users);

  if (users) {
    $('#totalUsers').html(`<strong>Total Users:</strong> ${users.length}`)
    $('#pagingUsersControl').pagination({
      dataSource: users,
      pageSize: 10,
      showGoInput: true,
      showGoButton: true,
      callback: function (data, pagination) {
        // template method of yourself
        let $table = renderTblUsersList(data);
        $('.card-users .table-responsive').html($table);
      }
    })
  } else {
    resetTblUsersList();
    showAlertError("No data available", "", 3000);
  }
}
