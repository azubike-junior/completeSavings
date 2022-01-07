import React, { useState } from "react";
import Loader from "../Loader";
import OtpLayer from "./../CsOtpComp/index";
import { useDispatch, useSelector } from "react-redux";
import { addBvn } from "./../../services/Mutations/apis";
import { RootState } from "../../store/store";

export default function CsBvnAuth() {
  const [bvnError, setBvnError] = useState("");
  const [bvn, setBvn] = useState("");
  const dispatch = useDispatch();

  const {
    error: _error,
    bvnData,
    loading,
    isSuccessful,
  } = useSelector((state: RootState) => state.handler);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!bvn) {
      setBvnError("BVN field is required");
      return;
    }
    if (bvn.length < 11) {
      setBvnError("BVN should not be lesser than 11 digits");
      return;
    }
    setBvnError("");
    dispatch(addBvn(bvn));
  };

  return (
    <div className="tab-content p-30" id="myTabContent">
      <div
        className="tab-pane fade show active nib_instant_tab"
        id="bvn_verify"
        role="tabpanel"
        aria-labelledby="bvn_verify-tab"
      >
        <div className="col-lg-12 m-t-20">
          <div className="row">
            <div className="body col-lg-12 border border-radius p-30 shadow bg-body rounded">
              <form
                onSubmit={submitHandler}
                className="form-group pt-3 col-lg-12 col-md-12 col-sm-12 m-b-20"
              >
                <div className="form-group form-group-default">
                  <label htmlFor="">BVN VALIDATION</label>
                  {bvnError && (
                    <span
                      className="d-flex justify-content-center pb-2 text-danger"
                      style={{ fontSize: "12px" }}
                    >
                      {bvnError}
                    </span>
                  )}
                  {_error?.name ? (
                    <span
                      className="d-flex justify-content-center pb-2 text-danger"
                      style={{ fontSize: "12px" }}
                    >
                      {" "}
                      Sorry, something went wrong{" "}
                    </span>
                  ) : _error ? (
                    <span
                      className="d-flex justify-content-center pb-2 text-danger"
                      style={{ fontSize: "12px" }}
                    >
                      Invalid BVN
                    </span>
                  ) : (
                    ""
                  )}
                  <input
                    type="number"
                    placeholder="Enter BVN"
                    className="form-control"
                    name="bvn"
                    disabled={isSuccessful}
                    value={bvn}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      (e.target.value = e.target.value.slice(0, 11))
                    }
                    onChange={(e) => setBvn(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center m-t-20">
                  <button
                    className="btn bvn-gray col-lg-6 col-md-3 col-sm-12 shadow-sm bg-body rounded"
                    type="submit"
                    disabled={isSuccessful}
                  >
                    {loading ? <Loader /> : "Search"}
                  </button>
                </div>
              </form>

              {bvnData.responseCode === "00" && <OtpLayer data={bvnData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
