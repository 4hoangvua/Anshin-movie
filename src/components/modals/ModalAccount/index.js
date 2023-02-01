import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import dayjs from "dayjs";
import {
  CModalAccount,
  ReactAccount,
  ContenAccount,
  ContentHistory,
  LogoAccount,
  Name,
  Row,
  Col,
  Button,
  LogoPassword,
  LogoName,
  LogoEmail,
  LogoPhone,
  ErrorSpan,
  LogoUser,
  CloseModalButton,
  Background,
  CColHis,
} from "./ModalAccountElement";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getInfoUser,
  resetToken,
  updateInfoUser,
} from "../../../reducers/singin";
const ModalAccount = () => {
  const { taiKhoan } = useParams();
  const { infoUser, userLogin } = useSelector((state) => state.sig);
  const [isPassword, setIsPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isRef = useRef(false);
  const numberChair = useRef([]);
  useEffect(() => {
    dispatch(getInfoUser(taiKhoan));
  }, [userLogin]);
  useEffect(() => {
    if (!isRef.current) {
      isRef.current = true;
      return;
    }

    setValue("taiKhoan", infoUser.taiKhoan);
    setValue("email", infoUser.email);
    setValue("matKhau", infoUser.matKhau);
    setValue("hoTen", infoUser.hoTen);
    setValue("soDt", infoUser.soDT);
    setValue("maLoaiNguoiDung", infoUser.maLoaiNguoiDung);
  }, [infoUser]);

  const schema = object({
    taiKhoan: string()
      .required("Tài khoản không được để trống")
      .matches(
        /^[a-zA-Z0-9]{5,}$/,
        "Tài khoản chỉ gồm chữ hoa, thường, số và ít nhất 5 kí tự"
      ),
    matKhau: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự"
      ),
    email: string()
      .required("Email không được để trống")
      .email("Email không đúng định dạng"),
    soDt: string()
      .required("Phải là số")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(11, "Không quá 11 số"),
    hoTen: string().required("Tên không được để trống"),
    maLoaiNguoiDung: string().required("Tên không được để trống"),
    maNhom: string().default("GP01"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    dispatch(updateInfoUser({ values, setLoading }));
  };

  if (Object.keys(infoUser).length === 0) return;
  return (
    <>
      <Background>
        <CModalAccount>
          <NavLink to="/">
            <CloseModalButton className="fixed-bottom" />
          </NavLink>
          <ReactAccount>
            <ContenAccount>
              <h3 className="text-center mt-2">Cài đặt tài khoản chung</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <LogoAccount />
                    <Name
                      readOnly={true}
                      type="text"
                      placeholder="Account"
                      {...register("taiKhoan")}
                    />
                    {errors.taiKhoan && (
                      <ErrorSpan>{errors.taiKhoan?.message}</ErrorSpan>
                    )}
                  </Col>
                  <Col>
                    <LogoPassword />
                    <Name
                      type={isPassword ? "password" : "text"}
                      placeholder="Password"
                      {...register("matKhau")}
                      style={{ marginBottom: 5 }}
                    />
                    <div className="d-flex  align-items-center mb-2">
                      <input
                        type="checkbox"
                        onClick={() => setIsPassword(!isPassword)}
                      />
                      <span
                        style={{ fontSize: 10, width: "100%", marginLeft: 5 }}
                      >
                        {" "}
                        Show password
                      </span>
                    </div>
                    {errors.matKhau && (
                      <ErrorSpan>{errors.matKhau?.message}</ErrorSpan>
                    )}
                  </Col>
                  <Col>
                    <LogoName />
                    <Name
                      type="text"
                      placeholder="First name"
                      {...register("hoTen")}
                    />
                    {errors.hoTen && (
                      <ErrorSpan>{errors.hoTen?.message}</ErrorSpan>
                    )}
                  </Col>
                  <Col>
                    <LogoEmail />
                    <Name
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <ErrorSpan>{errors.email?.message}</ErrorSpan>
                    )}
                  </Col>
                  <Col>
                    <LogoPhone />
                    <Name
                      type="text"
                      placeholder="Number phone"
                      {...register("soDt")}
                    />
                    {errors.soDt && (
                      <ErrorSpan>{errors.soDt?.message}</ErrorSpan>
                    )}
                  </Col>
                  <Col>
                    <LogoUser />
                    <Name
                      type="text"
                      placeholder="Loại người dùng"
                      value="Custom"
                      disabled
                    />
                  </Col>
                  <Col className="d-flex justify-content-end">
                    {loading ? (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Update
                      </button>
                    ) : (
                      <button className="btn btn-primary">Update</button>
                    )}
                  </Col>
                </Row>
              </form>
            </ContenAccount>
            <ContentHistory className="text-center">
              <h3 className=" w-100">Lịch sử đặt vé</h3>
              <CColHis>
                <table
                  id="dtVerticalScrollExample"
                  className="table table-dark w-100 table-hover"
                  style={{ verticalAlign: "unset" }}
                >
                  <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Minh Họa
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Tên phim
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Ngày đặt
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Thời lượng
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Giá vé
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Tên hệ thống rạp
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Tên rạp
                      </th>
                      <th style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        Ghế
                      </th>
                    </tr>
                  </thead>
                  {infoUser.thongTinDatVe.length > 0 ? (
                    <tbody>
                      {infoUser?.thongTinDatVe.map((user, index) => {
                        numberChair.current = [];
                        return (
                          <tr key={user.maVe}>
                            <td>
                              <img
                                src={user.hinhAnh}
                                alt={user.name}
                                style={{
                                  width: "5rem",
                                  height: "7rem",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td className="text-danger">{user.tenPhim}</td>
                            <td className="text-white">
                              {dayjs(user.ngayDat).format(
                                "DD/MM/YYYY ~ h:mm A"
                              )}
                            </td>
                            <td className="text-success">
                              {user.thoiLuongPhim}'
                            </td>
                            <td>{user.giaVe}</td>
                            {user.danhSachGhe.map((lt, index) => {
                              if (user.danhSachGhe?.length === 1) {
                                return (
                                  <React.Fragment key={index}>
                                    <td className="text-warning">
                                      {lt.tenHeThongRap}
                                    </td>
                                    <td>{lt.tenRap}</td>
                                    <td className="text-primary">
                                      {lt.tenGhe}
                                    </td>
                                  </React.Fragment>
                                );
                              } else {
                                numberChair.current.push(lt.tenGhe);
                                return (
                                  <>
                                    {index === 0 ? (
                                      <React.Fragment key={index}>
                                        <td className="text-warning">
                                          {lt.tenHeThongRap}
                                        </td>
                                        <td>{lt.tenRap}</td>
                                      </React.Fragment>
                                    ) : index ===
                                      user.danhSachGhe?.length - 1 ? (
                                      <td className="text-primary">
                                        {numberChair.current.join(", ")}
                                      </td>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              }
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    ""
                  )}
                </table>
                {infoUser.thongTinDatVe.length > 0 ? (
                  ""
                ) : (
                  <div>Không có thông tin đặt vé</div>
                )}
              </CColHis>
            </ContentHistory>
          </ReactAccount>
        </CModalAccount>
      </Background>
    </>
  );
};

export default ModalAccount;
