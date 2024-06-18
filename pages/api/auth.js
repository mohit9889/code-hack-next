export default function handler(req, res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  res.statusCode = 401;
  res.end("Unauthorized");
}
