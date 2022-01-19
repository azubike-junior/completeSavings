import "little-state-machine";
import { string } from "yup";
import {
  AccountService,
  AccountSpecifications,
  AddressDetails,
  ElectronicService,
  EmploymentDetails,
  MeansOfIdentification,
  NextOfKin,
  TransactionService,
  UploadDetails,
} from "./interfaces";

declare module "little-state-machine" {
  interface GlobalState {
    data: {
      _uploadTypes?: string;
      _addressLga?: string;
      _branchcode?: string;
      _lga?: string;
      _title?: string;
      _gender?: string;
      _city?: string;
      _state?: string;
      bvn?: string;
      branchcode?: number;
      title?: number;
      firstName?: string;
      lastName?: string;
      addressLga?: number;
      middleName?: string;
      telNumber1?: string;
      telNumber2?: string;
      emailAddress?: string;
      motherMaidenName?: string;
      dateofBirth?: string;
      gender?: string;
      city?: number;
      state?: number;
      idNumber?: string;
      stateOfResidence?: number;
      lga?: number;
      dateOfIssue?: string;
      expireDate?: string;
      nationality?: string;
      religion?: number;
      maritalStatus?: number;
      address1?: string;
      documentType?: string;
      detailOfNextKinRequest?: NextOfKin;
      employmentDetialRequest?: EmploymentDetails;
      uploadDocumentRequest: UploadDetails[];
      accountServicesRequest: AccountService;
    };
  }
}
