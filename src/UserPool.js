import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_3CGFIN80R",
    ClientId: "3vd4s7phfa4m8hbhtlsm04g7af"
}

export default new CognitoUserPool(poolData);