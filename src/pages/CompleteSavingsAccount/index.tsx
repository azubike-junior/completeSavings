import React, { useState } from "react";
// import { createStore, StateMachineProvider } from "little-state-machine";
import {
  createStore,
  useStateMachine,
  StateMachineProvider,
  GlobalState,
} from "little-state-machine";
import { useForm } from "react-hook-form";
import CsBvnAuth from "../../components/CsBvnAuth";
import CsHeader from "../../components/CsHeader";
import AccountSpecifications from "../../components/CsAccountSpec";
import UploadDocuments from "./../../components/UploadDocuments";
import ReviewInfo from "../../components/ReviewInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

createStore(
  {
    data: {
      _branchcode: "",
      _lga: "",
      _addressLga: "",
      _title: "",
      _gender: "",
      _city: "",
      _state: "",
      _uploadTypes: "",
      bvn: "",
      branchcode: 0,
      title: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      telNumber1: "",
      telNumber2: "",
      emailAddress: "",
      stateOfResidence: 0,
      addressLga: 0,
      city: 0,
      lga: 0,
      motherMaidenName: "",
      dateofBirth: "",
      documentType: "",
      dateOfIssue: "",
      expireDate: "",
      gender: "",
      state: 0,
      nationality: "",
      religion: 0,
      address1: "",
      maritalStatus: 0,
      idNumber: "",
      uploadDocumentRequest: [],
      detailOfNextKinRequest: {
        surName: "",
        firstName: "",
        phone1: "",
        phone2: "",
        email: "",
        gender: "",
        relationship: "",
        residentialAddress: "",
      },
      accountServicesRequest: {
        transactionAlertPreference: {
          emailAlert: "",
          smsAlert: "",
        },
        electronicBankPreference: {
          internetBanking: "",
          mobileMoney: "",
          debitCard: "",
        },
        chequeConfirmation: false,
      },
    },
  },
  {}
);

export default function CompleteSavingsAccount() {
  const [csState, setCsState] = useState({});
  const page = useSelector((state: RootState) => state.handler.page);

  const {
    formState: { errors },
  } = useForm({ defaultValues: csState });

  const displaySteps = (step: number) => {
    if (step === 1) {
      return <CsBvnAuth />;
    } else if (step === 2) {
      return <AccountSpecifications />;
    } else if (step === 3) {
      return <UploadDocuments />;
    } else if (step === 4) {
      return <ReviewInfo />;
    }
  };

  return (
    <StateMachineProvider>
      <div className="pb-5 overflowhidden">
        <CsHeader currentStep={page} />
        {displaySteps(page)}
      </div>
    </StateMachineProvider>
  );
}
