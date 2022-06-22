import { FincraCore } from '../../api';
import { BaseError } from '../../utils';
import {
  CreateBeneficiaryDto,
  FetchDeleteBeneficiaryDto,
  UpdateBeneficiaryDto,
  ListBeneficiaryDto,
} from './dto';
import { excludeFields } from '../../utils';

/**
 * The Beneficiary module for handling the beneficary related operations.
 * @class Beneficiary
 * @extends FincraCore
 */
export class Beneficiary extends FincraCore {
  constructor(publicKey: string, secretKey: string) {
    super(publicKey, secretKey);
  }

  /**
   * allows a business/merchant to create a beneficiary
   * @param {CreateBeneficiaryDto} data - CreateBeneficiaryDto - This is the data that will be sent to the API.
   * @returns The response from the API
   */
  public async createBeneficiary(data: CreateBeneficiaryDto) {
    try {
      const request = this.getBaseUrl();
      const dataBody = excludeFields(['businessId'], data);
      const response = await request.post(
        `/profile/beneficiaries/business/${data.businessId}`,
        dataBody
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new BaseError({ message: error.response.data });
    }
  }

  /**
   * returns all the beneficiaries linked to business/merchant
   * @param {ListBeneficiaryDto} data - ListBeneficiaryDto - This is the data that will be sent to the API.
   * @returns The response is an array of beneficiaries
   */
  public async listBeneficiaries(data: ListBeneficiaryDto) {
    try {
      const request = this.getBaseUrl();
      // const dataBody = excludeFields(['businessId'], data)
      const response = await request.get(
        `/profile/beneficiaries/business/${data.businessId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new BaseError({ message: error.response.data });
    }
  }

  /**
   * It fetches and returns the detail of a single beneficiary
   * @param {FetchDeleteBeneficiaryDto} data - FetchDeleteBeneficiaryDto - the data to be sent to the API
   * @returns The response is a beneficiary object.
   */
  public async fetchBeneficiary(data: FetchDeleteBeneficiaryDto) {
    try {
      const request = this.getBaseUrl();
      const response = await request.get(
        `/profile/beneficiaries/business/${data.businessId}/${data.beneficiaryId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new BaseError({ message: error.response.data });
    }
  }

  /**
   * allows a merchant to update any of this beneficiary details
   * @param {UpdateBeneficiaryDto} data - UpdateBeneficiaryDto - The data object that will be sent to the API.
   * @returns The response from the API
   */
  public async updateBeneficiary(data: UpdateBeneficiaryDto) {
    try {
      const request = this.getBaseUrl();
      const dataBody = excludeFields(['businessId', 'beneficiaryId'], data);
      const response = await request.patch(
        `/profile/beneficiaries/business/${data.businessId}/${data.beneficiaryId}`,
        dataBody
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new BaseError({ message: error.response.data });
    }
  }

  /**
   * It allows a merchant to remove any of his beneficiary
   * @param {FetchDeleteBeneficiaryDto} data - FetchDeleteBeneficiaryDto - The data object that will be sent to the API.
   * @returns The response from the API
   */
  public async deleteBeneficiary(data: FetchDeleteBeneficiaryDto) {
    try {
      const request = this.getBaseUrl();
      const response = await request.delete(
        `/profile/beneficiaries/business/${data.businessId}/${data.beneficiaryId}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new BaseError({ message: error.response.data });
    }
  }
}