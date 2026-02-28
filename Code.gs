// 1. ฟังก์ชันแสดงหน้าเว็บ
function doGet(e) {
  var page = e.parameter.page || 'Index';
  return HtmlService.createTemplateFromFile(page)
      .evaluate()
      .setTitle('ระบบสแกนใบหน้า')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      // *** บรรทัดนี้สำคัญมาก ห้ามลืม! ***
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 
}
// 2. ฟังก์ชันดึงข้อมูลใบหน้าที่มีอยู่แล้วใน Sheet มาเทียบ
function getRegisteredFaces() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('User_Data');
  const data = sheet.getDataRange().getValues();
  data.shift(); // เอาหัวตารางออก
  return data; 
}

// 3. ฟังก์ชันบันทึกเวลาเข้างาน
function recordAttendance(id, name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Attendance_Logs');
  sheet.appendRow([new Date(), id, name, 'Success']);
  return "บันทึกสำเร็จ: " + name;
}
// ฟังก์ชันสำหรับบันทึกพนักงานใหม่
function registerNewUser(id, name, descriptor) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('User_Data');
  
  // ตรวจสอบว่า ID ซ้ำหรือไม่ (เลือกทำหรือไม่ก็ได้)
  
  // บันทึกข้อมูล: [ID, Name, Descriptor_String]
  sheet.appendRow([id, name, JSON.stringify(descriptor)]);
  
  return "ลงทะเบียนคุณ " + name + " เรียบร้อยแล้ว!";
}

// ปรับปรุง doGet เพื่อให้เรียกหน้า Register ได้ (เช่น ?page=register)
function doGet(e) {
  var page = e.parameter.page || 'Index'; // ถ้าไม่มีพารามิเตอร์ให้ไปหน้าสแกน (Index)
  return HtmlService.createTemplateFromFile(page)
      .evaluate()
      .setTitle('ระบบใบหน้า - ' + page)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
