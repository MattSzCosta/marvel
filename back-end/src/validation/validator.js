export const validate = (schema, data, res, next) => {
  return schema
    .validate(data, { abortEarly: false })
    .then((_) => {
      next();
    })
    .catch((err) => {
      var erro = err.inner.map((item) => {
        return {
          path: item.path,
          message: item.message,
          label: item.params.label,
        };
      });
      res.send(400, erro);
    });
};
