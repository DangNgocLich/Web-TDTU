const Department = require("../model/Department")

const addDepartmentController = async function (req, res, next) {
  const { label, value } = req.body
  if (!label || !value) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
  const data = await Department.findOne({ 'value': value })
  var department = new Department({ label: label, value: value })
  if (data) {
      res.status(400).json({ "messenge": "Phòng khoa Đã tồn tại" })
  } else {
      department.save(function (err, department) {
          if (err) return console.error(err);
          console.log(department)
          res.status(200).json({ "messenge": "Thêm phòng khoa thành công" },)
      });
  }
}

module.exports = {
  addDepartmentController
};