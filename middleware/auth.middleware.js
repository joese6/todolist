export function authMiddleware(req, res, next) {
  const user = req.session.user;

  if (!user) {
    return res.render("pages/unauthorized");
  }
  next();
}
