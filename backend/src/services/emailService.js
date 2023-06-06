const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmailPaymentComplete = async (pack,to,id,time,amount) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "lnkhoa1205@gmail.com", // sender address
    to: `${to}`, // list of receivers
    subject: `Bạn đã thanh toán thành công gói ${pack}$ !`, // Subject line
    text: "Cảm ơn bạn đã ủng hộ chúng tôi!", // plain text body
    html: `<strong>Thanh toán thành công!&nbsp;
        <br>
      </strong>
      <br>
      <ul>
        <li>Mã gioa dịch: ${id}&nbsp;</li>
        <li>Giá tiền: ${pack}$</li>
        <li>Vật phẩm nhận được: ${amount} kẹo &nbsp;</li>
        <li>Thanh toán qua: Paypal</li>
        <li>Ngày thanh toán: ${time}&nbsp;</li>
      </ul>
      <div style="text-align: center;">
        <strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Cảm ơn bạn đã ủng hộ chúng tôi!</strong>
      </div>`, // html body
  });
};

module.exports = {
  sendEmailPaymentComplete,
};
