import React, {useState} from 'react';
import './Subscription_style.css';

const Subscription = () => {
    const unitPrice = 55000;
    const kyHan = 30;

    const [quantity, setQuantity] = useState(1);
    const [discount] = useState(10);

    const subTotal = unitPrice * kyHan * quantity;
    const discountAmount = (subTotal * discount) / 100;
    const finalTotal = subTotal - discountAmount;

    const changeQuantity = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 0) {
            setQuantity(0);
        } else {
            setQuantity(value);
        }
    };

    const [selectedProvince, setSelectedProvince] = useState("");
    return (
        <div className="subscription-page-wrapper">
            <div className="container mt-4">
                <main className="row" style={{alignItems: 'flex-start'}}>

                    <div className="col-xl-9 col-12 main-content-wrapper">
                        <div className="Subscription_container">
                            <div className="preorder-block-wrap">
                                <h3 className="title_top font_merriweather ">Nhật Báo Thanh Niên</h3>
                                <hr className="blue-line"/>
                                <div className="d-flex align-items-center mt-3 p-3">
                                    <span className="me-3">Thời gian</span>
                                    <input type="date" className="form-control date-input"/>
                                    <span className="mx-3">đến</span>
                                    <input type="date" className="form-control date-input"/>
                                </div>
                                <div className={"table-responsive"}>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className=" text-bold title_table text-center" scope="col">Loại báo</th>
                                            <th className="text-bold title_table text-center" scope="col">Giá</th>
                                            <th className="text-bold title_table text-center" scope="col">Số kì</th>
                                            <th className="text-bold title_table text-center" scope="col">Số lượng/kỳ
                                            </th>
                                            <th className="text-bold title_table text-center" scope="col">Khuyến mãi
                                            </th>
                                            <th className="text-bold title_table text-right" scope="col">Thành tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="table-striped">
                                            <td className="text-center">Nhật báo Thanh Niên</td>
                                            <td>{unitPrice.toLocaleString('vi-VN')}đ</td>
                                            <td>{kyHan}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="form-control form-control-sm mx-auto text-right"
                                                    value={quantity}
                                                    onChange={changeQuantity}
                                                    style={{width: '80px', textAlign: 'center'}}
                                                />
                                            </td>
                                            <td className="text-center">{discount}%</td>
                                            <td className="text-right">
                                                {finalTotal.toLocaleString('vi-VN')}đ
                                            </td>

                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={"padding10"}></div>
                                <p className="title_top font_merriweather">Thông tin khuyến mãi</p>
                                <div className={"padding10"}></div>
                                <div className={"table-responsive"}>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="title_table thoi_gian text-center" scope="col">Thời gian</th>
                                            <th className="title_table text-center" scope="col">Giá</th>
                                            <th className="title_table text-center" scope="col">Số lượng</th>
                                            <th className="title_table text-center" scope="col">Khuyến mãi</th>
                                            <th className="title_table text-right" scope="col">Tổng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className={"color-theme font-weight-bold"}><span>3 Tháng</span></td>
                                            <td >{unitPrice.toLocaleString('vi-VN')}đ</td>
                                            <td>92</td>
                                            <td>5%</td>
                                            <td className={"text-right"}>480.700đ</td>
                                        </tr>
                                        <tr>
                                            <td className={"color-theme font-weight-bold"}><span>6 Tháng</span></td>
                                            <td>{unitPrice.toLocaleString('vi-VN')}đ</td>
                                            <td>180</td>
                                            <td>10%</td>
                                            <td className={"text-right"}>891.000đ</td>
                                        </tr>
                                        <tr>
                                            <td className={"color-theme font-weight-bold"}><span>12 Tháng</span></td>
                                            <td>{unitPrice.toLocaleString('vi-VN')}đ</td>
                                            <td>345</td>
                                            <td>5%</td>
                                            <td className={"text-right"}>1.612.875 đ</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="infor_container mt-4">
                            <div className="preorder-block-wrap">
                                <h3 className="title_top font_merriweather">THÔNG TIN KHÁCH HÀNG</h3>
                                <hr className="blue-line"/>

                                <div className="row mt-3">
                                    <div>
                                        <input type="text" className="form-control" placeholder="Nhập họ và tên"/>
                                    </div>
                                </div>
                                <div className={"padding10"}></div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Địa chỉ Email"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Số nhà, tên đường, phường/xã"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Số điện thoại liên hệ"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3" style={{position: 'relative'}}>
                                        <select className="form-select"
                                                onFocus={(e) => e.target.size = 6}
                                                onChange={(e) => {
                                                    setSelectedProvince(e.target.value);
                                                    e.target.size = 1;
                                                    e.target.blur();
                                                }}
                                            /* Khi nhấn ra ngoài mà không chọn cũng thu lại */
                                                onBlur={(e) => e.target.size = 1}
                                                value={selectedProvince}>
                                            <option defaultValue>Chọn tỉnh thành</option>
                                            <option value="1">Thành Phố Cần Thơ</option>
                                            <option value="2">Thành Phố Lâm Đồng</option>
                                            <option value="3">Thành Phố Đà Nẵng</option>
                                            <option value="4">Thành Phố Hà Nội</option>
                                            <option value="5">Thành Phố Hải Phòng</option>
                                            <option value="6">Thành Phố Hồ Chí Minh</option>
                                            <option value="7">Thành Phố Khánh Hòa</option>
                                            <option value="8">Thành Phố An Giang</option>
                                            <option value="9">Thành Phố Bắc Ninh</option>
                                            <option value="10">Thành Phố Thái Nguyên</option>
                                            <option value="11">Thành Phố Cà Mau</option>
                                            <option value="12">Thành Phố Vĩnh Long</option>
                                            <option value="13">Thành Phố Gia Lai</option>
                                            <option value="14">Thành Phố Đồng Nai</option>
                                            <option value="15">Thành Phố Cao Bằng</option>
                                            <option value="16">Thành Phố Đăk Lăk</option>
                                            <option value="17">Thành Phố Điện Biên</option>
                                            <option value="18">Thành Phố Đồng Tháp</option>
                                            <option value="19">Thành Phố Tuyên Quang</option>
                                            <option value="20">Thành Phố Ninh Bình</option>
                                            <option value="21">Thành Phố Hà Tĩnh</option>
                                            <option value="22">Thành Phố Phú Thọ</option>
                                            <option value="23">Thành Phố Hưng Yên</option>
                                            <option value="24">Thành Phố Quảng Ngãi</option>
                                            <option value="25">Thành Phố Lai Châu</option>
                                            <option value="26">Thành Phố Lạng Sơn</option>
                                            <option value="27">Thành Phố Lào Cai</option>
                                            <option value="28">Thành Phố Tây Ninh</option>
                                            <option value="29">Thành Phố Nghệ An</option>
                                            <option value="30">Thành Phố Quảng Trị</option>
                                            <option value="31">Thành Phố Sơn La</option>
                                            <option value="32">Thành Phố Huế</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="payment_block mt-4">
                            {/* Khối Thanh toán */}
                            <div className="custom_block">
                                <h4 className="block_title font_merriweather">Thanh toán</h4>
                                <div className="grid_2_columns">
                                    <label className="radio_item">
                                        <input type="radio" name="payment" id="phong_phat_hanh"/>
                                        <span>Tại Phòng phát hành</span>
                                    </label>
                                    <label className="radio_item">
                                        <input type="radio" name="payment" id="tai_nha"/>
                                        <span>Tại nhà</span>
                                    </label>
                                    <label className="radio_item">
                                        <input type="radio" name="payment" id="ngan_hang"/>
                                        <span>Chuyển khoản qua Ngân hàng</span>
                                    </label>
                                    <label className="radio_item">
                                        <input type="radio" name="payment" id="payoo"/>
                                        <span>Cổng thanh toán Payoo</span>
                                    </label>
                                    <label className="radio_item">
                                        <input type="radio" name="payment" id="momo"/>
                                        <span>Ví Momo</span>
                                    </label>
                                </div>
                            </div>

                            {/* Khối Thông tin hoá đơn */}
                            <div className="custom_block">
                                <h4 className="block_title font_merriweather">Thông tin hoá đơn</h4>
                                <div className="flex_row">
                                    <label className="radio_item">
                                        <input type="radio" name="invoice" id="co_hoa_don"/>
                                        <span>Có hóa đơn</span>
                                    </label>
                                    <label className="radio_item">
                                        <input type="radio" name="invoice" id="khong_hoa_don" defaultChecked/>
                                        <span>Không xuất hóa đơn</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Khối Tổng kết cuối trang */}
                        <div className="summary_section mt_4">
                            {/* Dòng tiêu đề: Ấn phẩm báo - Thành tiền */}
                            <div className="summary_row summary_header">
                                <span className="header_text">Ấn phẩm báo</span>
                                <span className="header_text">Thành tiền</span>
                            </div>

                            {/* Dòng nội dung: Tổng thanh toán - Số tiền */}
                            <div className="summary_row summary_content">
                                <span className="total_label">Tổng thanh toán</span>
                                <span className="total_value">
                            {finalTotal > 0 ? `${finalTotal.toLocaleString('vi-VN')}đ` : "0đ"}
                            </span>
                            </div>

                            {/* Khối chứa nút bấm căn giữa */}
                            <div className="button_container">
                                <button className="btn btn-submit btn-submit-lg">
                                    ĐẶT BÁO <img src="https://datbao.thanhnien.vn/template/images/ic-arrow-foward.svg"
                                                 alt="" width="18" height="18" className="img-fluid"/>
                                </button>
                            </div>
                        </div>


                        <div className="company_info">
                            {/* Khối TP.HCM nổi bật */}
                            <div className="addr_item">
                                <p className="font_merriweather color-theme font-weight-extrabold fz-normal mb-3">
                                    Tại TP.HCM nhận giao tại các phường, xã:
                                </p>
                                <div id="phat-hanh-title">
                                    Bộ phận Phát hành - Trung tâm dịch vụ truyền thông Báo Thanh Niên
                                </div>
                                <div className="item">
                                    <img src="https://datbao.thanhnien.vn/template/images/ic-marker.png" alt="icon"
                                         width="20"/>
                                    <p>268-270 Nguyễn Đình Chiểu, phường Xuân Hòa, TP.HCM</p>
                                </div>
                                <div className="item">
                                    <img src="https://datbao.thanhnien.vn/template/images/ic-phone.png" alt="icon"
                                         width="20"/>
                                    <p>(028) 39309243 – (028) 39302302 - Ext: 101 – 0903.035.758</p>
                                </div>
                                <div className="item">
                                    <img src="https://datbao.thanhnien.vn/template/images/ic-envelope.png" alt="icon"
                                         width="20"/>
                                    <p><a href="mailto:phathanh@thanhnien.vn"
                                          className="color_theme">phathanh@thanhnien.vn</a></p>
                                </div>
                            </div>

                            {/* Danh sách các chi nhánh tỉnh thành */}
                            <div className="list_branch">
                                {[
                                    {
                                        title: "Thành phố Hà Nội",
                                        addr: "218 Tây Sơn, phường Đống Đa, TP.Hà Nội",
                                        phone: "(024) 38570981 – 0904.266.866"
                                    },
                                    {title: "Thành phố Hải Phòng", phone: "0988.819.968"},
                                    {
                                        title: "VP liên lạc tại Thanh Hóa",
                                        addr: "1 Nhà Thờ, phường Hạc Thành, tỉnh Thanh Hóa",
                                        phone: "(0237) 3855748 – 0913.310.398"
                                    },
                                    {
                                        title: "VPĐD khu vực Duyên hải miền Trung",
                                        addr: "144 Bạch Đằng, phường Hải Châu, TP.Đà Nẵng",
                                        phone: "0905.541.164"
                                    },
                                    {
                                        title: "VP liên lạc tại Gia Lai",
                                        addr: "133 Lê Lợi, phường Quy Nhơn, tỉnh Gia Lai",
                                        phone: "(0256) 3824142 – 0905.459.589"
                                    },
                                    {
                                        title: "VPĐD khu vực Nam Trung bộ",
                                        addr: "120 Thống Nhất, phường Nha Trang, tỉnh Khánh Hòa",
                                        phone: "(0258) 3819306 – 0909.723.444"
                                    },
                                    {title: "Tỉnh Lâm Đồng", phone: "0909.723.444"},
                                    {
                                        title: "Tỉnh Đồng Nai",
                                        addr: "12/2 Lê Quý Đôn, Phường Tam Hiệp, Tỉnh Đồng Nai",
                                        phone: "0918.710.737"
                                    },
                                    {
                                        title: "VPĐD khu vực Tây Nam Bộ",
                                        addr: "99 Trần Văn Hoài, phường Ninh Kiều, TP.Cần Thơ",
                                        phone: "(0292) 3825244 – 0901.169.894"
                                    }
                                ].map((branch, index) => (
                                    <div className="item" key={index}>
                                        <p className="title">{branch.title}</p>
                                        <div className="infos">
                                            {branch.addr && (
                                                <p><span className="name">Địa chỉ: </span><span
                                                    className="value">{branch.addr}</span></p>
                                            )}
                                            <p><span className="name">Điện thoại: </span><span
                                                className="value">{branch.phone}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                    {/* CỘT PHẢI (Sidebar Sticky) */}
                    <div className="col-xl-3 col-12 d-none d-xl-block">
                        <div className="sticky_sidebar">
                            <div className="sidebar_container p-3">
                                <div className="summary_row summary_header"
                                     style={{margin: '-1rem -1rem 1rem -1rem', borderRadius: '8px 8px 0 0'}}>
                                    <span className="header_text">Loại báo</span>
                                    <span className="header_text">Thành tiền</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 mt-3">
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: '#4396CC'
                                }}>Tổng thanh toán</span>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#4396CC'
                                    }}>{finalTotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="static-right-actions">
                                    <div className="button_container">
                                        <button className="btn-submit btn-submit-lg">
                                            ĐẶT BÁO <img
                                            src="https://datbao.thanhnien.vn/template/images/ic-arrow-foward.svg"
                                            alt="" width="18" height="18"/>
                                        </button>
                                    </div>

                                    <div className="static-note">
                                        <p className="text-center mb-0">
                                            <span className="note-text">Mọi thắc mắc xin liên hệ đường dây nóng:</span>
                                            <a href="tel:0903035758" className="hotline-black">0903 035 758</a>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    );
}

export default Subscription;