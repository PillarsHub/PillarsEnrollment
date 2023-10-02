import { SendRequest } from "../hooks/usePost";

export const ValidateApplication = (application, sponsor) => {
  var errors = [];

  if (!application.firstName) errors.push('firstName is required');
  if (!application.lastName) errors.push('lastName is required');
  if (!sponsor.id) errors.push('sponsorId is required');
  if (!application.customerType) errors.push('customerType is required');
  if (!application.status) errors.push('status is required');
  if (!application.billing_line1) errors.push('address is required');
  if (!application.primaryPhone) errors.push('primaryPhone is required');
  if (!application.emailAddress) errors.push('emailAddress is required');
  if (!application.language) errors.push('language is required');
  if (!application.webAlias) errors.push('webAlias is required');
  if (!application.birthDate) errors.push('birthDate is required');

  return errors;
}

export const WriteApplication = (application, sponsor, onError) => {
  var validationResult = ValidateApplication(application, sponsor);
  if (validationResult) {
    onError(validationResult);
    return;
  };


  var item = {
    firstName: application.firstName,
    lastName: application.lastName,
    companyName: application.companyName,
    sponsorId: sponsor.id,
    customerType: application.customerType,
    status: application.status,
    addresses: [
      {
        type: "Billing",
        line1: application.billing_line1,
        city: application.billing_city,
        stateCode: application.billing_state,
        zip: application.billing_zip,
        countryCode: application.billing_country ?? 'us'
      },
      {
        type: "Shipping",
        line1: application.shipping_line1,
        city: application.shipping_city,
        stateCode: application.shipping_state,
        zip: application.shipping_zip,
        countryCode: application.shipping_country ?? 'us'
      }
    ],
    phoneNumbers: [
      {
        number: application.primaryPhone,
        type: "primary"
      },
      {
        number: application.secondaryPhone,
        type: "secondary"
      }
    ],
    emailAddress: application.emailAddress,
    language: application.language,
    birthDate: application.birthDate,
    profileImage: application.profileImage,
    webAlias: application.webAlias
  };


  alert(JSON.stringify(item));

  SendRequest("POST", "/api/v1/customers", item, (r) => {
    const now = new Date();
    let postDate = now.toISOString();
    SendRequest("POST", "/api/v1/Sources", {
      nodeId: r.id,
      sourceGroupId: "EnrollDate",
      date: postDate,
      value: postDate,
      externalId: r.id
    });

    SendRequest("POST", "/api/v1/Sources", {
      nodeId: r.id,
      sourceGroupId: "CustType",
      date: postDate,
      value: item.customerType,
      externalId: r.id
    });

    SendRequest("POST", "/api/v1/Sources", {
      nodeId: r.id,
      sourceGroupId: "Status",
      date: postDate,
      value: item.status,
      externalId: r.id
    });

    var placement = { nodeId: r.id, uplineId: item.sponsorId };
    SendRequest("POST", "/api/v1/placements", placement, () => {
      window.location = `/customers/${r.id}/summary`;
    }, (error) => {
      onError(error);
    });
  }, (error) => {
    onError(error);
  });

  return true;
};