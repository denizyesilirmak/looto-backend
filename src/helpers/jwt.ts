import jsonwebtoken from "jsonwebtoken";

export const generateToken = (email: string) => {
  return jsonwebtoken.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "180d",
  });
};
