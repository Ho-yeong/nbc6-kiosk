export class BadRequestError extends Error {
  constructor(props) {
    super(props);
    this.code = 400;
    this.message = props.message;
  }
}
