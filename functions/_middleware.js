export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "www.shiftpro.uk") {
    url.hostname = "shiftpro.uk";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
