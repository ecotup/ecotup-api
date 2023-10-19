const userSchema = Joi.object({
  user_name: Joi.string().required(),
  user_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  user_email: Joi.string().email().required(),
  user_phone: Joi.string().min(10).max(14).required(),
  user_location: Joi.string().required(),
  user_profile: Joi.string(),
  user_token: Joi.string().min(0).max(16),
});
