import AWS from "aws-sdk";
declare let sendEmail: (recipientEmail: string, schoolCode: string) => Promise<import("aws-sdk/lib/request").PromiseResult<AWS.SES.SendEmailResponse, AWS.AWSError>>;
export declare const sendResetPasswordEmail: (recipientEmail: string, link: string) => Promise<import("aws-sdk/lib/request").PromiseResult<AWS.SES.SendEmailResponse, AWS.AWSError>>;
export default sendEmail;
