export class User {
    constructor(
      private email: string,
      private token: string,
      private localId: string,
      private expirationDate: Date
    ) {}

    // we must define a getter if we want the value of this property, given that is a private property
    get expireDate() {
      return this.expirationDate;
    }
  }