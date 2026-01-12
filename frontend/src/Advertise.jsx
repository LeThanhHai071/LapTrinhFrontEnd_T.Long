import React from 'react';
import './Advertise_style.css';

const Advertise = () => {
    return (
        <div className="advertise-page-wrapper">
            <hr className="top-banner-line"/>
            <h1 className="text-center header-advertise">Bảng giá Quảng cáo</h1>

            <div className="container">
                <div className="content-box">
                    <div className="type-item">
                        <img src="src/img/type-baoin.png" alt="Báo in"/>
                        <h2 className="div-title-text">Báo in</h2>
                        <a   className="btn-type margin-top-90" style={{backgroundColor: "#0FBBE1"}}>Media Báo in</a>
                    </div>

                    <div className="type-item">
                        <img src="src/img/type-baoonline.png" alt="Báo online"/>
                        <h2 className="div-title-text">Báo Online</h2>
                        <a   className="btn-type" style={{backgroundColor: "#FF6464"}}>Media Kit Báo Online</a>
                    </div>

                    <div className="type-item">
                        <img src="src/img/type-sukien.png" alt="Sự kiện"/>
                        <h2 className="div-title-text">Sự kiện</h2>
                        <a   className="btn-type margin-top-90" style={{backgroundColor: "#FFC83B"}}>Media Kit Sự Kiện</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertise;