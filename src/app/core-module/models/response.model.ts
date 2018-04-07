
export interface ResponseModel {
  body: {
    message?: String,
    data?: Object,
    rootcause?: String
  };
  success: boolean;
}
