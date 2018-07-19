
class Service {
  static async getUsersData() {
    let data = await $.ajax({
      url: `${APP_DOMAIN}SMIAPi/GetUser.php`,
      method: 'post'
    });
    let parsedData = JSON.parse(data);
    if(!Array.isArray(parsedData)) return null;
    if(parsedData.length == 0) return null;
    return parsedData;
  }
  // http://115.79.27.219/SMIAPi/GetUser.php

  static async updateGuard(sentData) {
    let data = await $.ajax({
      url: `${APP_DOMAIN}api/UpdateGuard.php`,
      method: 'post',
      data: JSON.stringify(sentData)
    });
    return data;
  }

  static async insertGuard(sentData) {
    let data = await $.ajax({
      url: `${APP_DOMAIN}api/UpdateGuard.php`,
      method: 'post',
      data: JSON.stringify(sentData)
    });
    return data;
  }

  static async getPersonalGuardsInfo() {
    let data = await $.ajax({
      url: `${APP_DOMAIN}api/GetGuardInformation.php`,
      method: 'post',
    });
    let parsedData = JSON.parse(data)
    if (Array.isArray(parsedData) && parsedData.length > 0)
      return parsedData;
    return null;
  }

  static async sendMessageGuard(sentData) {
    let data = await $.ajax({
      url: `${APP_DOMAIN}api/InsertMessage.php`,
      method: 'post',
      data: JSON.stringify(sentData)
    });
    return data;
  }

  static async sendSMSToGuards(sentData) {
    let data = await $.ajax({
      url: `${APP_DOMAIN}api/InsertMessage.php`,
      method: 'post',
      data: JSON.stringify(sentData)
    });
    return data;
  }

  static async inActiveGuard(sentData) {
    let data = await $.ajax({
      url: `${APP_DOMAIN}api/UpdateGuard.php`,
      method: 'post',
      data: JSON.stringify(sentData)
    });
    return data;
  }

}