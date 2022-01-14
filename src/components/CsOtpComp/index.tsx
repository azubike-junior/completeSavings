import React, { useState } from "react";
import { HookInputField } from "./../InputField/index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { generateOtp } from "../../utils/utilities";
import { useHistory } from "react-router-dom";
import { useValidateOtpMutation } from "../../services/Mutations/apis";
import Loader from "../Loader";
import { handleNext } from "../../services/Mutations/apis";
import { RootState } from "../../store/store";

export default function OtpLayer({ data }: any) {
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState({});
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const history = useHistory();
  const [validateOtp, { data: otpResponse, isLoading, error, isSuccess }] =
    useValidateOtpMutation();

  const compareOtp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const now = new Date();
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      return;
    }
    const details = JSON.parse(userDetails);
    if (now.getTime() > details.expiry) {
      localStorage.removeItem("userDetails");
      setLoading(false);
      setOtpError("This OTP has expired, click on the resend OTP button below");
      return;
    }
    if (details.token !== otp) {
      setLoading(false);
      setOtpError("Invalid OTP, please enter valid OTP to continue");
      return;
    }
    setOtpError("");
    setLoading(false);
    localStorage.clear();
    localStorage.setItem("userBvn", JSON.stringify(data?.bvn));
    dispatch(handleNext());
  };

  const smsService = (ttl: number) => {
    const now = new Date();
    const generatedOtp: string = generateOtp(6);
    const userDetails = {
      phoneNumber: data?.phoneNumber1,
      bvn: data?.bvn,
      token: generatedOtp,
      messageBody: `
       ${generatedOtp}. Kindly use the provided OTP to complete Account Opening Request. OTP Expires in 5 Minutes`,
      expiry: now.getTime() + ttl,
    };
    const { expiry, token, ...rest } = userDetails;
    const tokenInfo = {
      phoneNumber: data?.phoneNumber1,
      token: generatedOtp,
      expiry,
    };
    localStorage.setItem("userDetails", JSON.stringify(tokenInfo));
    validateOtp(rest);
  };

  useEffect(() => {
    smsService(300000);
  }, []);

  return (
    <form
      onSubmit={compareOtp}
      className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20"
    >
      <span style={{ color: "green", fontSize: "12px", paddingBottom: "4px" }}>
        Enter the OTP sent to your registered BVN phone number
      </span>{" "}
      <br />
      {otpError && (
        <span style={{ fontSize: "12px" }} className="text-danger pl-2">
          {otpError}
        </span>
      )}
      <input
        type="number"
        placeholder="Enter OTP"
        className="form-control"
        name="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          (e.target.value = e.target.value.slice(0, 6))
        }
      />
      <div
        style={{
          border: "none",
          cursor: "pointer",
          outline: "none",
          fontSize: "12px",
        }}
        className="bvn mt-2 text-success"
        onClick={() => smsService(300000)}
      >
        Resend OTP
      </div>
      <div className="d-flex align-items-center justify-content-center m-t-20">
        <button
          className="btn bvn-gray col-lg-6 col-md-3 col-sm-12 shadow-sm bg-body rounded"
          type="submit"
        >
          {loading ? <Loader /> : "Verify"}
        </button>
      </div>
    </form>
  );
}
