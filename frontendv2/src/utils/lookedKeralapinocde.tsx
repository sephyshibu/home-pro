import Keralapinocde from '../data/Keralapinocde.json'

export const lookupKeralaPincode = (pincode: string) => {
    return Keralapinocde.filter((entry:any) => entry.pincode === pincode);
  };
