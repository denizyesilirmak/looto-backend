import express from 'express';

const validationApp = express();

validationApp.get(
  '/.well-known/pki-validation/984FB94C7591B0795604EBB3C3AFAEE7.txt',
  (req, res) => {
    res.send(
      `
1A74C8929991EE39730FA7900D52AF6DF636DE552C67CC5BBF5DF869EB3A8BD9
comodoca.com
939ae1622992520
`
    );
  }
);

export default validationApp;
