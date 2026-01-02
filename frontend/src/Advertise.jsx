import React from 'react';
import './Advertise_style.css';

const Advertise = () => {
    return (
        <div >
            <hr className="top-banner-line"/>
            <h1 className="text-center" style={{
                color: "#0098D1",
                fontWeight: "bold",
                margin: "30px 0",
                fontSize: "50px",
                textAlign: "center"
            }}>Bảng giá Quảng cáo</h1>
            <div className="content-box">

                <div className="type-item">
                    <img src={"src/img/type-baoin.png"} alt="Báo in"/>
                    <h2 className="text_center div-title-text">Báo in</h2>
                    <a className="btn-type" style={{backgroundColor: "#0FBBE1"}}>Media Báo in</a>
                </div>

                <div className="type-item">
                    <img src={"src/img/type-baoonline.png"} alt="Báo online"/>
                    <h2 className="text_center div-title-text">Báo Online</h2>
                    <a className="btn-type" style={{backgroundColor: "#FF6464"}}>Media Kit Báo Online</a>
                </div>

                <div className="type-item">
                    <img src={"src/img/type-sukien.png"} alt="Sự kiện"/>
                    <h2 className="text_center div-title-text">Sự kiện</h2>
                    <a className="btn-type " style={{backgroundColor: "#FFC83B"}}>Media Kit Sự Kiện</a>
                </div>
            </div>
        </div>
    );
};

export default Advertise;