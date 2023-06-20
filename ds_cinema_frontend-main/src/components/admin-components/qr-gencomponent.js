import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'

function QrGencomponent() {
  // var movies = JSON.parse(sessionStorage.getItem('cart'));
  // const movies = sessionStorage.getItem('cart');
  const [url, setUrl] = useState('')
  const [qrcode, setQrCode] = useState('')
  const [checkout, setCheckout] = useState([])

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
    }, (err, url) => {
      if (err) return console.error(err)
      setQrCode(url)
    })
  }

  useEffect(() => {
    // console.log('11', JSON.parse(sessionStorage.getItem("loggeduser"))._id)
    setCheckout(JSON.parse(sessionStorage.getItem("loggeduser")));
    setUrl(sessionStorage.getItem("ticketInfo"));
    console.log('Hello', url);
    console.log('1hello', checkout);
    // console.log('2', url);
  }, [])

  // setUrl(checkout);
  console.log('1', checkout);
  console.log('2', url);

  return (
    <div >
      <div className="btnView">
        <button className='btn btn-lg' onClick={GenerateQRCode}> Generate Qr </button>
      </div>
      {qrcode && <>
        <img src={qrcode} />
        <a href={qrcode} className='btn btn-sm ' style={{ borderRadius: '10px', width: '125px' }} download="qrcode.png"> Download</a>
      </>}
    </div>
  )
}

export default QrGencomponent
