import { CONFIG_ID } from "./constants"

export const acceptReservedVouchers = (participationIds) => {
  console.log(participationIds);
  const payload = {
    "configurationId": CONFIG_ID,
    "flowLabel": "acceptReservedVoucher",
    "participationIds": participationIds
  }
  return sendApi('callNgpsArbiterGateway', payload)
}

export const rejectReservedVoucher = (participationId) => {
  console.log(participationId);
  const payload = {
    "configurationId": CONFIG_ID,
    "flowLabel": "rejectReservedVoucher",
    "participationId": participationId
  }
  return sendApi('callNgpsArbiterGateway', payload)
}